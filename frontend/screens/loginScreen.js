import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios'
import styles from './stylesLogin.js'

const Login = ({ onLogin }) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleRegister = () => {
        if (!email || !password) {
            console.log("prosze wprowadzic email i haslo")
            Alert.alert("Proszę wprowadzić email i hasło")
            return
        }

        const registrationData = {
            email: email,
            password: password
        }

        axios.post("http://ip:8080/register", registrationData)
            .then(result => {
                console.log(result.data)
                console.log("udalo sie zarejestrowac")
            })
            .catch(error => {
                console.error("error rejestracji:", error)
                Alert.alert("Rejestracja nie powiodla sie sprobuj ponownie.")
            })
    }
    const handleLogin = () => {
        if (!email || !password) {
            console.log("prosze wprowadzic email i haslo")
            alert("Proszę wprowadzić email i hasło")
            return
        }

        const loginData = {
            email: email,
            password: password
        }
        console.log("doszlo tu i chuj")
        axios.post("http://192.168.3.126:8080/login", loginData)
            .then(response => {
                console.log(response.data)
                console.log("udalo sie kurwa")
                onLogin(email, password)
            })
            .catch(error => {
                //console.error("Login error:", error)
                console.log("chuj error")
                Alert.alert("Logowanie nie powiodlo sie, zarejestruj sie")
                //setError("Logowanie nie powiodlo sie. Sprobuj ponownie")
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Zarejestruj się" onPress={handleRegister} />
            <Button title="Login" onPress={handleLogin} />
        </View>
      );
}

export default Login;