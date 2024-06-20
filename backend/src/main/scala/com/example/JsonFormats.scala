package com.example

import com.example.UserRegistry._
import spray.json.DefaultJsonProtocol._
import spray.json.RootJsonFormat

object JsonFormats  {
  implicit val userJsonFormat: RootJsonFormat[User] = jsonFormat3(User.apply)
  implicit val usersJsonFormat: RootJsonFormat[Users] = jsonFormat1(Users.apply)
  implicit val actionPerformedJsonFormat: RootJsonFormat[ActionPerformed] = jsonFormat1(ActionPerformed.apply)
  implicit val getUserResponseJsonFormat: RootJsonFormat[GetUserResponse] = jsonFormat1(GetUserResponse.apply)
}
