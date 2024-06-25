import { Alert } from 'react-native';
import React, { useState } from 'react';
import Login from './screens/loginScreen'; 
import axios from 'axios'
import Home from './screens/homeScreen.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StoreScreen from './screens/storeScreen.js';
import AppNavigator from './appNavigator.js';

const Stack = createStackNavigator();

export default function App() {
  const [ error, setError ] = useState(null)
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const handleLogin = (email, password) => {
    axios.post("ip:8080/login", { email, password })
      .then(response => {
        console.log(response.data)
        console.log("doszlo tu3")
        setIsLoggedIn(true)
      })
      .catch(error => {
        console.error("Login error:", error)
        setError("Logowanie nie powiodlo sie. Sprobuj ponownie")
      })
  }

  const handleLogout = () => {
    // Logika wylogowania
    setIsLoggedIn(false);
  };

  return (
    <AppNavigator 
      isLoggedIn={isLoggedIn} 
      onLogin={handleLogin} 
      onLogout={handleLogout}
      />
  );
}