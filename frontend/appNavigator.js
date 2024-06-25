import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/homeScreen';
import StoreScreen from './screens/storeScreen.js';
import Login from './screens/loginScreen.js';
import Header from './header.js'

const Stack = createStackNavigator();

const AppNavigator = ({ isLoggedIn, onLogin, onLogout }) => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Home">
                {(props) => <Home {...props} onLogout={onLogout} />}
              </Stack.Screen>
              <Stack.Screen name="StoreScreen"
                //</>options={{ header: (props) => <Header {...props} title="Strona główna" /> }
                //}
                >
                {(props) => <StoreScreen {...props} onLogout={onLogout} />}
              </Stack.Screen>
            </>
          ) : (
            <Stack.Screen name="Login">
              {(props) => <Login {...props} onLogin={onLogin} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default AppNavigator;