// Header.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ onLogout }) => {
    const [ hover, setHover ] = useState(false);
    const [ isMenuOpen, setIsMenuOpen ] = useState(false)
    const [animation] = useState(new Animated.Value(0));

    const menuOpen = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    return (
        <View style={styles.header}>
            <View style={styles.leftSide}>
                <Text style={styles.title}>Aplikacja maciek</Text>
            </View>
            <View style={styles.rightSide}>
                <TouchableOpacity
                    style={[styles.menuBar, hover && styles.buttonHover]}
                    onPressIn={() => setHover(true)}
                    onPressOut={() => setHover(false)}
                    onPress={menuOpen}
                >
                    <Text style={styles.menuBarText}>
                        <Icon name="bars" size={20} color="#000" />
                    </Text>
                </TouchableOpacity>
            </View>
            {isMenuOpen && (
                <View style={styles.menu}>
                    <View style={styles.leftSideMenuBar}>
                        <TouchableOpacity
                            onPress={menuOpen}>
                            <Text>
                                <Icon name="home" size={40} color="#000" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.middleLeftSideMenuBar}>
                        <TouchableOpacity
                            onPress={menuOpen}>
                            <Text>
                                <Icon name="cog" size={35} color="#000" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.middleRightSideMenuBar}>
                        <TouchableOpacity
                            onPress={menuOpen}>
                            <Text>
                                <Icon name="envelope" size={30} color="#000" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rightSideMenuBar}>
                        <TouchableOpacity
                            onPress={onLogout}>
                            <Text style={styles.exit} role="img" aria-label="exit">&#x238B;</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f0f0f0', 
        padding: 10,
        paddingTop: 35, 
        position: 'absolute',
        width: '100%',
        zIndex: 100,
        top: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    leftSide: {
        flex: 1,
    },
    rightSide: {
        flex: 1,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'center',
    },
    menuBar: {
        padding: 10,
    },
    menuBarText: {
        fontSize: 30,
    },
    buttonHover: {
        backgroundColor: 'lightgray',
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between', // opcjonalnie, jeśli chcesz rozłożyć elementy równomiernie wzdłuż osi głównej
        alignItems: 'center', 
        position: 'absolute',
        backgroundColor: '#f0f0f0',
        width: '120%',
        top: 70, // pozycja menu od góry
        padding: 20,
        paddingTop: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowBRadius: 3,
        elevation: 5,
    },
    leftSideMenuBar: {
        marginLeft: 40,
    },
    middleLeftSideMenuBar: {
        flex: 1,
        alignItems: 'center'
    },
    MiddleRightSideMenuBar: {
        flex: 1,
    },
    rightSideMenuBar: {
        flex: 1,
        marginLeft: 40
    },
    exit: {
        fontSize: 30
    }
});

export default Header;
