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
import akka.http.scaladsl.model.HttpMethods._
import akka.http.scaladsl.model.headers._
import akka.http.javadsl.model.StatusCode

case class UserLogin(email: String, password: String)
case class UserRegister(email: String, password: String)
case class HashString(email: String, password: String)
case class Hash(hash: String, email: String)
case class AuthenticationResult(success: Boolean)
case class LoginRequest(email: String, password: String)
case class RegistrationRequest(email: String, password: String)

class HashActor extends Actor with ActorLogging {
	var dataBase: Map[String, String] = Map.empty
	def receive: Receive = {
		case UserLogin(email, password) =>
			log.info(s"${self.path.name} received a message")
			context.become(checkDataBase(email, password, sender()))
			self ! UserLogin(email, password)
		case UserRegister(email, password) =>
			log.info(s"${self.path.name} received a register message")
			val hashed = context.actorOf(Props[HashingAlghoritm](), "hashed")
			hashed ! HashString(email, password)
			context.become(receiveHash(sender()))
	}
	def receiveHash(mainProg: ActorRef): Receive = {
		case Hash(hash, email) => 
			log.info(s"doszlo tu hasz: ${hash}")
			log.info(s"Dodaje uzytkownika ${email} do bazy danych...")
			dataBase += (email -> hash)
			log.info("udalo sie wpisac hash i uzytkownika do bazy")
			mainProg ! AuthenticationResult(success = true)
			context.become(receive)
	}
	def checkDataBase(email: String, password: String, replyTo: ActorRef): Receive = {
		case UserLogin(email, password) => 
			log.info("sprawdzam czy email i haslo sa w bazie danych...")
			dataBase.get(email) match {
				case Some(savedHash) =>
					val hashedPassword = hashPassword(email, password)
					if savedHash == hashedPassword then (log.info(s"udalo sie zalogowac uzytkownika ${email}"), replyTo ! AuthenticationResult(success = true))
					else (log.info(s"nie udalo sie zalogowac uzytkownikowi ${email}"), replyTo ! AuthenticationResult(success = false))
				case None => 
					log.info(s"uzytkownika ${email} nie ma w bazie danych, zarejestruj sie")
					replyTo ! AuthenticationResult(success = false)
			}
			context.become(receive)
	}
	private def hashPassword(email: String, password: String): String = {
		val together = email + password
		val sha256 = MessageDigest.getInstance("SHA-256")
		val digest = sha256.digest(together.getBytes)
		digest.map("%02x".format(_)).mkString
	}
}

class HashingAlghoritm extends Actor with ActorLogging {
	def receive: Receive = {
		case HashString(email, password) => 
			log.info(s"${self.path.name} otrzymal ${email} i ${password} i teraz haszuje...")
			val together = email + password
			val sha256 = MessageDigest.getInstance("SHA-256")
			val digest = sha256.digest(together.getBytes)
			val digestHex = digest.map("%02x".format(_)).mkString
			sender() ! Hash(digestHex, email)
	}
}

@main
def mainProg: Unit = {
	implicit val system: ActorSystem = ActorSystem("my-scala-microservice")
	implicit val executionContext: ExecutionContextExecutor = system.dispatcher
	implicit val materializer: Materializer = Materializer(system)
	implicit val timeout: Timeout = Timeout(2.seconds)
	implicit val loginRequestFormat: RootJsonFormat[LoginRequest] = jsonFormat2(LoginRequest.apply)
	implicit val registrationRequestFormat: RootJsonFormat[RegistrationRequest] = jsonFormat2(RegistrationRequest.apply)
	implicit val authenticationResultFormat: RootJsonFormat[AuthenticationResult] = jsonFormat1(AuthenticationResult.apply)

	val hashActor = system.actorOf(Props[HashActor](), "hashActor")

	val route =
		path("register") {
			post {
				entity(as[RegistrationRequest]) { registrationRequest => 
					val responseFuture: Future[AuthenticationResult] = ask(hashActor, UserRegister(registrationRequest.email, registrationRequest.password))(timeout)
						.mapTo[AuthenticationResult]
					
					onComplete(responseFuture) {
						case scala.util.Success(user) =>
							println(s"udalo sie zarejestrowac uzytkownika: ${user}")
							if user.success then complete(StatusCodes.OK, s"Uzytkownik zarejestrowal sie")
							else complete(StatusCodes.InternalServerError, s"Nie udalo sie zarejestrowac")
						case scala.util.Failure(err) =>
							complete(StatusCodes.InternalServerError, s"Rejestracja nie powiodla sie error: ${err.getMessage}")
					}
				}
			}
		} ~
		path("login") {
			post {
				entity(as[LoginRequest]) { loginRequest =>
					println("Received POST request to /login")
					println(s"LoginRequest received: $loginRequest")
					val responseFuture: Future[AuthenticationResult] = ask(hashActor, UserLogin(loginRequest.email, loginRequest.password))(timeout)
						.mapTo[AuthenticationResult]
					
					onComplete(responseFuture) {
						case scala.util.Success(hash) => 
							println("wyslalo sie")
							if hash.success then complete(StatusCodes.OK, s"Login successful for email: ${loginRequest.email}")
							else complete(StatusCodes.Unauthorized, "Logowanie nie powiodlo sie, zarejestruj sie")
						case scala.util.Failure(ex) =>
							complete(StatusCodes.InternalServerError, s"error: ${ex.getMessage}")
					}
				}
			}
		}
	
	Http().newServerAt("0.0.0.0", 8080).bind(route)
	println(s"Server online at http://www.maplikacjaciek.xyz:8080/")
} 
