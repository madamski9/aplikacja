package com.example

import akka.actor.{Actor, ActorLogging, ActorSystem, Props, ActorRef}
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import scala.concurrent.ExecutionContextExecutor
import akka.pattern.ask
import akka.util.Timeout
import scala.concurrent.duration._
import akka.actor.ActorSystem
import akka.stream.Materializer
import java.security.MessageDigest

case class UserLogin(login: String)
case class HashString(string: String)
case class Hash(hash: String)

class HashActor extends Actor with ActorLogging {
	def receive: Receive = {
		case UserLogin(login) =>
			log.info(s"${self.path.name} received a message")
			val hashed = context.actorOf(Props[HashingAlghoritm](), "hashed")
			hashed ! HashString(login)
			context.become(receiveHash(sender()))
	}
	def receiveHash(mainProg: ActorRef): Receive = {
		case Hash(hash) => 
			mainProg ! hash
	}
}

class HashingAlghoritm extends Actor with ActorLogging {
	def receive: Receive = {
		case HashString(string) => 
			val sha256 = MessageDigest.getInstance("SHA-256")
			val digest = sha256.digest(string.getBytes)
			val digestHex = digest.map("%02x".format(_)).mkString
			sender() ! Hash(digestHex)
	}
}

@main
def mainProg: Unit = {
	implicit val system: ActorSystem = ActorSystem("my-scala-microservice")
	implicit val executionContext: ExecutionContextExecutor = system.dispatcher
	implicit val materializer: Materializer = Materializer(system)
	implicit val timeout: Timeout = Timeout(2.seconds)

	val hashActor = system.actorOf(Props[HashActor](), "hashActor")

	val route =
		path("login") {
			get {
				parameters("login") { login =>
					val responseFuture = ask(hashActor, UserLogin(login))(timeout).mapTo[String]
					complete(responseFuture)
				}
			}
		}
	
	Http().newServerAt("localhost", 8080).bindFlow(route)
	println(s"Server online at http://localhost:8080/")
}
