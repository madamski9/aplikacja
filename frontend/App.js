import { StatusBar } from 'expo-status-bar';
import { Text, Image, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import styles from './styles.js'
import Login from './screens/loginScreen'; 
import axios from 'axios'


export default function App() {
  const [ hover, setHover ] = useState(false)
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ error, setError ] = useState(null)
 
  const click = () => {
    if (hover) {
      Alert.alert('jd')
    }
  }

  const click2 = () => {
    if(hover) {
      Alert.alert('jd2')
    }
  }

  const click3 = () => {
    if(hover) {
      Alert.alert('jd3')
    }
  }

  const handleLogin = (email, password) => {
    axios.post("http://192.168.0.227:8080/login", { email, password })
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

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, styles.buttonHover]}
        onPressIn={() => setHover(true)}
        onPressOut={() => setHover(false)}
        onPress={click}>
        <Image
          style={styles.clothStore1}
          source={require("./assets/clothStore1.png")}
        />
        <Text style={styles.testUnderImg}>
          S K L E P 1
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button2, styles.buttonHover]}
        onPressIn={() => setHover(true)}
        onPressOut={() => setHover(false)}
        onPress={click2}>
        <Image
          style={styles.clothStore2}
          source={require("./assets/clothStore2.png")}
        />
        <Text style={styles.testUnderImg}>
          S K L E P 2
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button3, styles.buttonHover]}
        onPressIn={() => setHover(true)}
        onPressOut={() => setHover(false)}
        onPress={click3}>
        <Image
          style={styles.clothStore3}
          source={require("./assets/clothStore3.png")}
        />
        <Text style={styles.testUnderImg}>
          S K L E P 3
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
