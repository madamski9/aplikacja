error id: file://<WORKSPACE>/src/main/scala/com/example/Main.scala:[905..906) in Input.VirtualFile("file://<WORKSPACE>/src/main/scala/com/example/Main.scala", "package com.example

import akka.actor.{Actor, ActorLogging, ActorSystem, Props}
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
			log.info(s"${self.path.name} Received a messsage")
			val hashed = context.actorOf(Props[HashingAlghoritm](), "hashed")
			hashed ! HashString(login)
			context.become(receiveHash)
	}
		def 
	// def receiveHash: Receive = {
	// 	case Hash(hash) => 
	// 		???
	// }
}

class HashingAlghoritm extends Actor with ActorLogging {
	def receive: Receive = {
		case HashString(string) => 
			val sha256 = MessageDigest.getInstance("SHA-256")
			val digest = sha256.digest(string.getBytes)
			digest.map("%02x".format(_)).mkString
			sender ! 
	}
}

object Main extends App {
  implicit val system: ActorSystem = ActorSystem("my-scala-microservice")
  implicit val executionContext: ExecutionContextExecutor = system.dispatcher
  implicit val materializer: Materializer = Materializer(system)
  implicit val timeout: Timeout = Timeout(5.seconds)

  val hashActor = system.actorOf(Props[HashActor](), "hashActor")

  val route =
    path("login") {
      get {
        val responseFuture = ask(hashActor, UserLogin("chuj"))(timeout)
        complete(responseFuture.mapTo[String])
      }
    }

  Http().newServerAt("localhost", 8080).bindFlow(route)
  println(s"Server online at http://localhost:8080/")
}
")
file://<WORKSPACE>/src/main/scala/com/example/Main.scala
file://<WORKSPACE>/src/main/scala/com/example/Main.scala:32: error: expected identifier; obtained rbrace
}
^
#### Short summary: 

expected identifier; obtained rbrace