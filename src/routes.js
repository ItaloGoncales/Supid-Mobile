import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

import Login from './pages/Login'
import LoginCustomer from './pages/LoginCustomer'
import SignUpCustomer from './pages/SignUpCustomer';
import NewAddress from './pages/NewAddress';
import MainScreen from './pages/Main';

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
                    <Stack.Screen
                        name="NewAddress"
                        component={NewAddress}
                        options={({ route }) => ({
                            headerShown: true,
                            headerLeft: null,
                            headerTitleAlign: "center",
                            headerTitleStyle: {
                                fontSize: 14,
                            },
                            title: route.params.name,
                            headerStyle: {
                                elevation: 0
                            }
                        })}
                    />
                    <Stack.Screen
                        name="Main"
                        component={MainScreen}
                        options={({ route }) => ({
                            headerShown: true,
                            headerLeft: null,
                            headerTitle: null,
                            headerStyle: {
                                elevation: 0,
                                backgroundColor: "#40AC59"
                            }
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}