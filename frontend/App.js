import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, Image, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import styles from './styles.js'
import Login from './screens/loginScreen'; 
import axios from 'axios'
import Header from './header.js'

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
    axios.post("http://ip:8080/login", { email, password })
      .then(response => {
        console.log(response.data)
        console.log("doszlo tu3")
        setIsLoggedIn(true)
      })
      .catch(error => {
        //console.error("Login error:", error)
        setError("Logowanie nie powiodlo sie. Sprobuj ponownie")
      })
  }
  const showConfirmAlert = () => {
    Alert.alert(
      "Wylogowanie",
      "Czy na pewno chcesz się wylogować?",
      [
        {
          text: "Nie",
          onPress: () => console.log("Anulowano"),
          style: "cancel"
        },
        { 
          text: "Tak", 
          onPress: () => handleLogout() 
        }
      ]
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <View style={styles.container}>
      <Header onLogout={showConfirmAlert} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonHover]}
            onPressIn={() => setHover(true)}
            onPressOut={() => setHover(false)}
            onPress={click}>
            <Image
              style={styles.clothStore}
              source={require("./assets/clothStore1.png")}
            />
            <View style={styles.backgroundText1}>
              <Text style={styles.textUnderImg}>
                S K L E P 1
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button2, styles.buttonHover]}
            onPressIn={() => setHover(true)}
            onPressOut={() => setHover(false)}
            onPress={click2}>
            <Image
              style={styles.clothStore}
              source={require("./assets/clothStore2.png")}
            />
            <View style={styles.backgroundText2}>
              <Text style={styles.textUnderImg}>
                S K L E P 2
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button3, styles.buttonHover]}
            onPressIn={() => setHover(true)}
            onPressOut={() => setHover(false)}
            onPress={click3}>
            <Image
              style={styles.clothStore}
              source={require("./assets/clothStore3.png")}
            />
            <View style={styles.backgroundText3}>
              <Text style={styles.textUnderImg}>
                S K L E P 3
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button3, styles.buttonHover]}
            onPressIn={() => setHover(true)}
            onPressOut={() => setHover(false)}
            onPress={click3}>
            <Image
              style={styles.clothStore}
              source={require("./assets/clothStore4.jpeg")}
            />
            <View style={styles.backgroundText4}>
              <Text style={styles.textUnderImg}>
                S K L E P 4
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button3, styles.buttonHover]}
            onPressIn={() => setHover(true)}
            onPressOut={() => setHover(false)}
            onPress={click3}>
            <Image
              style={styles.clothStore}
              source={require("./assets/clothStore5.jpeg")}
            />
            <View style={styles.backgroundText5}>
              <Text style={styles.textUnderImg}>
                S K L E P 5
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button3, styles.buttonHover]}
            onPressIn={() => setHover(true)}
            onPressOut={() => setHover(false)}
            onPress={click3}>
            <Image
              style={styles.clothStore}
              source={require("./assets/clothStore6.jpeg")}
            />
            <View style={styles.backgroundText6}>
              <Text style={styles.textUnderImg}>
                S K L E P 6
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button3, styles.buttonHover]}
            onPressIn={() => setHover(true)}
            onPressOut={() => setHover(false)}
            onPress={click3}>
            <Image
              style={styles.clothStore}
              source={require("./assets/clothStore7.jpeg")}
            />
            <View style={styles.backgroundText7}>
              <Text style={styles.textUnderImg}>
                S K L E P 7
              </Text>
            </View>
          </TouchableOpacity>
          <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}
