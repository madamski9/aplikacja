file://<WORKSPACE>/src/main/scala/com/example/Main.scala
### java.lang.AssertionError: NoDenotation.owner

occurred in the presentation compiler.

presentation compiler configuration:
Scala version: 3.3.3
Classpath:
<WORKSPACE>/src/main/resources [exists ], <WORKSPACE>/.bloop/root/bloop-bsp-clients-classes/classes-Metals-TvL5yibgTom-_AiIcriedA== [exists ], <HOME>/Library/Caches/bloop/semanticdb/com.sourcegraph.semanticdb-javac.0.9.10/semanticdb-javac-0.9.10.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo1.maven.org/maven2/org/scala-lang/scala3-library_3/3.3.3/scala3-library_3-3.3.3.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo.akka.io/maven/com/typesafe/akka/akka-http_3/10.6.3/akka-http_3-10.6.3.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo.akka.io/maven/com/typesafe/akka/akka-http-spray-json_3/10.6.3/akka-http-spray-json_3-10.6.3.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo.akka.io/maven/com/typesafe/akka/akka-actor-typed_3/2.9.3/akka-actor-typed_3-2.9.3.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo.akka.io/maven/com/typesafe/akka/akka-stream_3/2.9.3/akka-stream_3-2.9.3.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo1.maven.org/maven2/ch/qos/logback/logback-classic/1.2.11/logback-classic-1.2.11.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo1.maven.org/maven2/org/scala-lang/scala-library/2.13.12/scala-library-2.13.12.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo.akka.io/maven/com/typesafe/akka/akka-http-core_3/10.6.3/akka-http-core_3-10.6.3.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo.akka.io/maven/com/typesafe/akka/akka-pki_3/2.9.3/akka-pki_3-2.9.3.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo1.maven.org/maven2/io/spray/spray-json_3/1.3.6/spray-json_3-1.3.6.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo.akka.io/maven/com/typesafe/akka/akka-actor_3/2.9.3/akka-actor_3-2.9.3.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo.akka.io/maven/com/typesafe/akka/akka-slf4j_3/2.9.3/akka-slf4j_3-2.9.3.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo1.maven.org/maven2/org/slf4j/slf4j-api/1.7.36/slf4j-api-1.7.36.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo.akka.io/maven/com/typesafe/akka/akka-protobuf-v3_3/2.9.3/akka-protobuf-v3_3-2.9.3.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo1.maven.org/maven2/org/reactivestreams/reactive-streams/1.0.4/reactive-streams-1.0.4.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo1.maven.org/maven2/ch/qos/logback/logback-core/1.2.11/logback-core-1.2.11.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo.akka.io/maven/com/typesafe/akka/akka-parsing_3/10.6.3/akka-parsing_3-10.6.3.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo1.maven.org/maven2/com/hierynomus/asn-one/0.6.0/asn-one-0.6.0.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo1.maven.org/maven2/com/typesafe/config/1.4.3/config-1.4.3.jar [exists ], <HOME>/Library/Caches/Coursier/v1/https/repo1.maven.org/maven2/org/scala-lang/modules/scala-java8-compat_3/1.0.2/scala-java8-compat_3-1.0.2.jar [exists ]
Options:
-Xsemanticdb -sourceroot <WORKSPACE>


action parameters:
offset: 1121
uri: file://<WORKSPACE>/src/main/scala/com/example/Main.scala
text:
```scala
package com.example

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

// class HashActor extends Actor with ActorLogging {
//   	def receive: Receive = {
// 		case UserLogin(login) => 
// 			log.info(s"${self.path.name} Received a messsage")
// 			val hashed = context.actorOf(Props[HashingAlghoritm](), "hashed")
// 			hashed ! HashString(login)
// 			context.become(receiveHash)
// 	}
// 	def receiveHash: Receive = {
// 		case Hash(hash) => 
// 			???
// 	}
// }
class HashActor extends Actor with ActorLogging {
	def receive: Receive = {
		case UserLogin(login) =>
			log.info(s"${self.path.name} received a message")
			val hashed = context.actorOf(Props[@@])
	}
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

```



#### Error stacktrace:

```
dotty.tools.dotc.core.SymDenotations$NoDenotation$.owner(SymDenotations.scala:2607)
	scala.meta.internal.pc.SignatureHelpProvider$.isValid(SignatureHelpProvider.scala:83)
	scala.meta.internal.pc.SignatureHelpProvider$.notCurrentApply(SignatureHelpProvider.scala:96)
	scala.meta.internal.pc.SignatureHelpProvider$.$anonfun$1(SignatureHelpProvider.scala:48)
	scala.collection.StrictOptimizedLinearSeqOps.dropWhile(LinearSeq.scala:280)
	scala.collection.StrictOptimizedLinearSeqOps.dropWhile$(LinearSeq.scala:278)
	scala.collection.immutable.List.dropWhile(List.scala:79)
	scala.meta.internal.pc.SignatureHelpProvider$.signatureHelp(SignatureHelpProvider.scala:48)
	scala.meta.internal.pc.ScalaPresentationCompiler.signatureHelp$$anonfun$1(ScalaPresentationCompiler.scala:426)
```
#### Short summary: 

java.lang.AssertionError: NoDenotation.owner