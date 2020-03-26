import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

import Login from './pages/login'
import LoginCustomer from './pages/loginCustomer'
import SignUpCustomer from './pages/signUpCustomer';

export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="LoginCustomer"
                        component={LoginCustomer}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="SignUpCustomer"
                        component={SignUpCustomer}
                        options={{
                            headerShown: true,
                            title: "Cadastro de Cliente"
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}