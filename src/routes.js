import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

import Login from './pages/login'

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
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}