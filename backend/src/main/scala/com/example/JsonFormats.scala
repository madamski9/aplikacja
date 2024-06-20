package com.example

import com.example.UserRegistry.ActionPerformed

//#json-formats
import spray.json.RootJsonFormat
import spray.json.DefaultJsonProtocol

object JsonFormats  {
  // import the default encoders for primitive types (Int, String, Lists etc)
  import DefaultJsonProtocol._

  implicit val userJsonFormat: RootJsonFormat[User] = jsonFormat1(User.apply)
  implicit val loginRequestFormat: RootJsonFormat[LoginRequest] = jsonFormat2(LoginRequest.apply)
  implicit val registrationRequestFormat: RootJsonFormat[RegistrationRequest] = jsonFormat2(RegistrationRequest.apply)
  implicit val authenticationResultFormat: RootJsonFormat[AuthenticationResult] = jsonFormat1(AuthenticationResult.apply)
}
//#json-formats
