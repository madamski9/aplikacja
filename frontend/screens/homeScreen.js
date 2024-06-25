import { ScrollView, Text, Image, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import styles from './stylesHeader.js'
import { useNavigation } from '@react-navigation/native';


const Home = () => {
    const navigation = useNavigation();

    const goToApp = () => {
        navigation.navigate('StoreScreen');
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.gridContainer}>
                    <TouchableOpacity style={styles.gridItem}>
                        <Text style={styles.gridItemText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={goToApp}
                        style={styles.gridItem2}>
                        <Text style={styles.gridItemText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gridItem3}>
                        <Text style={styles.gridItemText}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gridItem4}>
                        <Text style={styles.gridItemText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.gridItem5}>
                        <Text style={styles.gridItemText}>5</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home;