import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios'
import styles from './stylesLogin.js'

const Login = ({ onLogin }) => {
    const [ email, setEmail ] = useState(' ')
    const [ password, setPassword ] = useState(' ')

    const handleLogin = (event) => {
        if (!email || !password) {
            alert("Proszę wprowadzić email i hasło")
            return
        }

        event.preventDefault()
        const loginData = {
            email: email,
            password: password
        }
        axios.post("http://localhost:8080/login", loginData)
            .then(result => {
                console.log(result.data)
                onLogin()
            })
            .catch(error => {
                console.error(error)
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
            <Button title="Login" onPress={handleLogin} />
        </View>
      );
}

export default Login;