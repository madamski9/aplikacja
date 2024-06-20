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
import spray.json.DefaultJsonProtocol._
import spray.json._
import akka.http.scaladsl.unmarshalling._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import scala.concurrent.Future
import akka.http.scaladsl.model.StatusCodes

case class UserLogin(email: String, password: String)
case class HashString(email: String, password: String)
case class Hash(hash: String,email: String, password: String)
case class AuthenticationResult(success: Boolean)
case class LoginRequest(email: String, password: String)

class HashActor extends Actor with ActorLogging {
	def receive: Receive = {
		case UserLogin(email, password) =>
			log.info(s"${self.path.name} received a message")
			val hashed = context.actorOf(Props[HashingAlghoritm](), "hashed")
			hashed ! HashString(email, password)
			context.become(receiveHash(sender()))
	}
	def receiveHash(mainProg: ActorRef): Receive = {
		case Hash(hash, email, password) => 
			mainProg ! (hash, email, password)
	}
}

class HashingAlghoritm extends Actor with ActorLogging {
	def receive: Receive = {
		case HashString(email, password) => 
			val together = email + password
			val sha256 = MessageDigest.getInstance("SHA-256")
			val digest = sha256.digest(together.getBytes)
			val digestHex = digest.map("%02x".format(_)).mkString
			sender() ! Hash(digestHex, email, password)
	}
}

@main
def mainProg: Unit = {
	implicit val system: ActorSystem = ActorSystem("my-scala-microservice")
	implicit val executionContext: ExecutionContextExecutor = system.dispatcher
	implicit val materializer: Materializer = Materializer(system)
	implicit val timeout: Timeout = Timeout(2.seconds)
	implicit val loginRequestFormat: RootJsonFormat[LoginRequest] = jsonFormat2(LoginRequest.apply)

	val hashActor = system.actorOf(Props[HashActor](), "hashActor")

	val route =
		path("login") {
			post {
				entity(as[LoginRequest]) { loginRequest =>
					val responseFuture: Future[AuthenticationResult] = ask(hashActor, UserLogin(loginRequest.email, loginRequest.password))(timeout)
						.mapTo[AuthenticationResult]
					
					onComplete(responseFuture) {
						case scala.util.Success(authResult) => 
							if authResult.success then complete(StatusCodes.OK, s"Login successful for email: ${loginRequest.email}")
							else complete(StatusCodes.Unauthorized, "Login failed")
						case scala.util.Failure(ex) =>
							complete(StatusCodes.InternalServerError, s"error: ${ex.getMessage}")
					}
				}
			}
		}
	
	Http().newServerAt("localhost", 8080).bindFlow(route)
	println(s"Server online at http://localhost:8080/")
}
