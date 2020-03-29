import React, { Component, useState } from 'react';

import { View, Text, SafeAreaView, Image, ImageBackground, StyleSheet, TouchableOpacity, Platform, Linking, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import styles from "./styles";

import * as Facebook from 'expo-facebook';
import * as Google from "expo-google-app-auth";

import { SupidButton } from '../../components/supid';

export default function Login() {
    const [isLoggedin, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const navigation = useNavigation()

    googleLogin = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: `936015559872-bev45dg4fc70cdbfoks9gfb8vmmg3iq4.apps.googleusercontent.com`,
                androidClientId: `936015559872-v95n162k60rksv4mbcud48ivatuopqqf.apps.googleusercontent.com`,
                iosStandaloneAppClientId: `936015559872-pj8lenf2kc5f6rdd1f3d9qeubgo53rqd.apps.googleusercontent.com`,
                androidStandaloneAppClientId: `936015559872-54avv7n93at9chpj136r5usetj3p81tg.apps.googleusercontent.com`,
                scopes: ["profile", "email"]
            });

            if (result.type === "success") {
                setLoggedIn(true);
                setUserData({
                    name: result.user.name,
                    email: result.user.email,
                    profilePhoto: result.user.photoUrl,
                    token: result.accessToken,
                    source: "Google"
                })

                navigation.navigate("NewAddress", {
                    name: "Cadastre seu Endereço",
                    user: userData
                })
            } else {
                setLoggedIn(false);
                setUserData(null);
            }
        } catch (e) {
            alert(e)
            setLoggedIn(false);
            setUserData(null);
        }
    };

    facebookLogIn = async () => {
        try {
            await Facebook.initializeAsync("195842088522470");

            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('195842088522470', {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
                    .then(response => response.json())
                    .then(data => {
                        setLoggedIn(true);
                        setUserData({
                            name: data.name,
                            email: data.email,
                            profilePhoto: data.picture.data.url,
                            token: data.id,
                            source: "Facebook"
                        });
                        navigation.navigate("NewAddress", {
                            name: "Cadastre seu Endereço",
                            user: userData
                        })
                    })
                    .catch(e => console.log(e))
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    logout = () => {
        setLoggedIn(false);
        setUserData(null);
    }

    return (
        <ImageBackground source={require('../../assets/login_bg.png')} style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}>
                <Image source={require('../../assets/supid_icon_transparent.png')} style={styles.logoImage} />
                <Text style={styles.heading}>Compre Online e Receba em sua casa!</Text>
                <Text style={styles.loginInfo}>Acesse ou cadastre-se abaixo:</Text>
                <SupidButton onPress={facebookLogIn} text="Acessar com Facebook" style={styles.facebookLoginButton} />
                <SupidButton onPress={googleLogin} text="Acessar com Google" style={styles.googleLoginButton} />
                <Text style={styles.customerInfo}>Se você possui um estabelecimento</Text>
                <SupidButton onPress={() => { navigation.navigate('LoginCustomer') }} style={styles.signUpButton} text="Faça Login" />
                <Text style={styles.privacyAndPolicyText}
                    onPress={() => { navigation.navigate('SignUpCustomer') }}>
                    ou clique aqui para se cadastrar
                            </Text>
                <View style={styles.privacyAndPolicy}>
                    <Text style={styles.privacyAndPolicyText}
                        onPress={() => Linking.openURL('https://supid.com.br/privacy-and-policy.html')}>
                        Termos de Uso
                            </Text>
                    <Text style={styles.privacyAndPolicyText}
                        onPress={() => Linking.openURL('https://supid.com.br/privacy-and-policy.html')}>
                        Políticas de Privacidade
                            </Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

