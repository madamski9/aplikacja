import { StyleSheet } from "react-native";
import chroma from 'chroma-js';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30
    },
    font: {
      color: 'pink',
    },
    button: {
      padding: 0,
      width: 340,
      height: 150,
      borderRadius: 15,
      marginTop: 103,
      borderColor: 'white',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
    },
    button2: {
      padding: 0,
      width: 340,
      height: 150,
      borderRadius: 15,
      marginTop: 15,
      borderColor: 'white',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
    },
    button3: {
      padding: 0,
      width: 340,
      height: 150,
      borderRadius: 15,
      marginTop: 15,
      borderColor: 'white',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
    },
    buttonHover: {
      backgroundColor: 'white',
    },
    buttonText: {
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    clothStore: {
      height: 120,
      width: 340,
      borderTopStartRadius: 15,
      borderTopEndRadius: 15,
    },
    textUnderImg: {
      textAlign: 'center',
      fontSize: 13,
      fontWeight: '650',
    },
    backgroundText1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: 340,
      borderBottomEndRadius: 12,
      borderBottomStartRadius: 12,
      backgroundColor: chroma('skyblue').brighten(0).hex()
    },
    backgroundText2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: 340,
      borderBottomEndRadius: 12,
      borderBottomStartRadius: 12,
      backgroundColor: chroma('#F5F5DC').brighten(-0.5).hex()
    },
    backgroundText3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: 340,
      borderBottomEndRadius: 12,
      borderBottomStartRadius: 12,
      backgroundColor: chroma('pink').brighten(0.7).hex()
    },
    backgroundText4: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: 340,
      borderBottomEndRadius: 12,
      borderBottomStartRadius: 12,
      backgroundColor: chroma('green').brighten(3.5).hex()
    },
    backgroundText5: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: 340,
      borderBottomEndRadius: 12,
      borderBottomStartRadius: 12,
      backgroundColor: chroma('grey').brighten(0.7).hex()
    },
    backgroundText6: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: 340,
      borderBottomEndRadius: 12,
      borderBottomStartRadius: 12,
      backgroundColor: chroma('brown').brighten(3).hex()
    },
    backgroundText7: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: 340,
      borderBottomEndRadius: 12,
      borderBottomStartRadius: 12,
      backgroundColor: chroma('purple').brighten(2.7).hex()
    },
  });

export default styles;