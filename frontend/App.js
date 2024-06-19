import { StatusBar } from 'expo-status-bar';
import { Text, Image, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import styles from './styles.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loginScreen from './screens/loginScreen'; 


export default function App() {
  const [ hover, setHover ] = useState(false)

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
