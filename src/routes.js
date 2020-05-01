import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { View, TouchableOpacity, TextInput, Text, Platform } from 'react-native'

import constants from 'expo-constants';

import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();

import Login from './pages/Login'
import LoginCustomer from './pages/LoginCustomer'
import SignUpCustomer from './pages/SignUpCustomer';
import NewAddress from './pages/NewAddress';
import MainScreen from './pages/Main';
import Place from './pages/Place';
import Department from './pages/Department';

export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
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
                            title: "Cadastro de Cliente"
                        }}
                    />
                    <Stack.Screen
                        name="NewAddress"
                        component={NewAddress}
                        options={({ route }) => ({
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
                            header: () => (
                                <View style={{
                                    backgroundColor: '#40AC59',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: "space-around",
                                    height: Platform.OS === 'ios' ? 80 : 60,
                                    paddingTop: Platform.OS === 'ios' ? constants.statusBarHeight + 10 : 0,
                                    paddingBottom: Platform.OS === 'ios' ? 10 : 0
                                }}>
                                    <TouchableOpacity
                                        onPress={() => alert('This is a button!')}>
                                        <Feather name="menu" size={20} color="#FFF"
                                            style={{ paddingLeft: 15 }} />
                                    </TouchableOpacity>
                                    <TextInput
                                        style={{
                                            backgroundColor: "#FFF",
                                            borderRadius: 30,
                                            paddingHorizontal: 10,
                                            width: "70%",
                                            height: 30,
                                            alignSelf: "center"
                                        }}
                                        placeholder="Buscar Estabelecimento"
                                        placeholderTextColor="#C3C3C3"
                                    />
                                    <TouchableOpacity
                                        onPress={() => alert('This is a button!')}>
                                        <Feather name="shopping-cart" size={20} color="#FFF"
                                            style={{ paddingRight: 15 }} />
                                    </TouchableOpacity>
                                </View>),
                        })}
                    />
                    <Stack.Screen
                        name="Place"
                        component={Place}
                        options={({ route, navigation }) => ({
                            headerTitleAlign: "center",
                            headerTitleStyle: {
                                fontSize: 14,
                                color: "#FFF"
                            },
                            title: route.params.place.title,
                            headerStyle: {
                                elevation: 0,
                                backgroundColor: "#40AC59",
                            },
                            headerLeft: () => (
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}>
                                    <Feather name="arrow-left" size={20} color="#FFF"
                                        style={{ paddingLeft: 15 }} />
                                </TouchableOpacity>),
                            headerRight: () => (
                                <TouchableOpacity
                                    onPress={() => alert('This is a button!')}>
                                    <Feather name="shopping-cart" size={20} color="#FFF"
                                        style={{ paddingRight: 15 }} />
                                </TouchableOpacity>)
                        })}
                    />
                    <Stack.Screen
                        name="Department"
                        component={Department}
                        options={({ route, navigation }) => ({
                            headerTitleAlign: "center",
                            headerTitleStyle: {
                                fontSize: 14,
                                color: "#FFF"
                            },
                            title: route.params.place.title,
                            headerStyle: {
                                elevation: 0,
                                backgroundColor: "#40AC59",
                            },
                            headerLeft: () => (
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}>
                                    <Feather name="arrow-left" size={20} color="#FFF"
                                        style={{ paddingLeft: 15 }} />
                                </TouchableOpacity>),
                            headerRight: () => (
                                <TouchableOpacity
                                    onPress={() => alert('This is a button!')}>
                                    <Feather name="shopping-cart" size={20} color="#FFF"
                                        style={{ paddingRight: 15 }} />
                                </TouchableOpacity>)
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}