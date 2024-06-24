import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingLeft: 8,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between', // opcjonalnie, jeśli chcesz rozłożyć elementy równomiernie wzdłuż osi głównej
      alignItems: 'center', 
    },
    zarejestruj: {
      color: 'black'
    }
});

export default styles;