lazy val akkaHttpVersion = "10.6.3"
lazy val akkaVersion    = "2.9.3"

resolvers += "Akka library repository".at("https://repo.akka.io/maven")

// Run in a separate JVM, to make sure sbt waits until all threads have
// finished before returning.
// If you want to keep the application running while executing other
// sbt tasks, consider https://github.com/spray/sbt-revolver/

scalacOptions ++= Seq(
   "-deprecation",         // Emit warning and location for usages of deprecated APIs.
   "-explain",             // Explain errors in more detail.
   "-feature",             // Emit warning and location for usages of features that should be imported explicitly.
   "-print-lines",         // Show source code line numbers.
   "-unchecked",           // Enable additional warnings where generated code depends on assumptions
   "-Xfatal-warnings",     // Fail the compilation if there are any warnings.
   "-Xmigration",          // Warn about constructs whose behavior may have changed since version.
   "-source:3.0",
   "-encoding", "utf8",
)

fork := true

lazy val root = (project in file(".")).
  settings(
    inThisBuild(List(
      organization    := "com.example",
      scalaVersion    := "3.3.3"
    )),
    name := "backend",
    libraryDependencies ++= {
      val pekkoV = "1.0.2"
      Seq(
      "com.typesafe.akka" %% "akka-http"                % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-spray-json"     % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-actor-typed"         % akkaVersion,
      "com.typesafe.akka" %% "akka-stream"              % akkaVersion,
      "ch.qos.logback"    % "logback-classic"           % "1.2.11",

      "com.typesafe.akka" %% "akka-http-testkit"        % akkaHttpVersion % Test,
      "com.typesafe.akka" %% "akka-actor-testkit-typed" % akkaVersion     % Test,
      "org.scalatest"     %% "scalatest"                % "3.2.12"        % Test,
      "org.apache.pekko" %% "pekko-actor" % pekkoV,
      "org.apache.pekko" %% "pekko-slf4j" % pekkoV,
      //"ch.qos.logback" % "logback-classic" % "1.3.8", // for JDK ver. < 11
      "ch.qos.logback" % "logback-classic" % "1.5.6" // for Java ver. >= 11
    )
    }
  )
