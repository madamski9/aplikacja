// Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>aplikacja maciek</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f0f0f0', // kolor tła nagłówka
    padding: 15,
    paddingTop: 50, // wysokość nagłówka, aby unikać zakrywania przez system statusu
    position: 'absolute',
    width: '100%',
    zIndex: 100,
    top: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
  },
});

export default Header;
