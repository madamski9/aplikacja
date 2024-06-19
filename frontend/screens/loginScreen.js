import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
const axios = require("axios")

function loginScreen({ navigation }) {
    const [ userEmail, setUserEmail ] = useState(' ')
    const [ userPassword, setUserPassword ] = useState(' ')

    const handleLogin = () => {
        axios.get("http://localhost:8080/login")
    }
}