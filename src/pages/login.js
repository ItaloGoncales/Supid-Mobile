import React, { Component, useState } from 'react';

import { View, Text, SafeAreaView, Image, ImageBackground, StyleSheet, TouchableOpacity, Platform, Linking, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

import * as Facebook from 'expo-facebook';
import * as Google from "expo-google-app-auth";

import { SupidButton } from '../components/supid';

const IOS_CLIENT_ID =
    // expo dev
    // "936015559872-bev45dg4fc70cdbfoks9gfb8vmmg3iq4.apps.googleusercontent.com";
    "936015559872-pj8lenf2kc5f6rdd1f3d9qeubgo53rqd.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
    // expo dev
    // "936015559872-v95n162k60rksv4mbcud48ivatuopqqf.apps.googleusercontent.com";
    "936015559872-54avv7n93at9chpj136r5usetj3p81tg.apps.googleusercontent.com";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false,
            userData: null
        };
        this.navigation = useNavigation()
    }

    googleLogin = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: IOS_CLIENT_ID,
                androidClientId: ANDROID_CLIENT_ID,
                scopes: ["profile", "email"]
            });

            if (result.type === "success") {
                this.setState({
                    isLoggedin: true,
                    userData: {
                        name: result.user.name,
                        email: result.user.email,
                        profilePhoto: result.user.photoUrl,
                        token: result.accessToken,
                        source: "Google"
                    }
                });
            } else {
                this.setState({
                    isLoggedin: false,
                    userData: null
                });
            }
        } catch (e) {
            this.setState({
                isLoggedin: false,
                userData: null
            });
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
                        this.setState({
                            isLoggedin: true,
                            userData: {
                                name: data.name,
                                email: data.email,
                                profilePhoto: data.picture.data.url,
                                token: data.id,
                                source: "Facebook"
                            }
                        });
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
        this.setState({
            isLoggedin: false,
            userData: null
        });
    }

    render() {
        return (
            this.state.isLoggedin ?
                this.state.userData ?
                    <ImageBackground source={require('../../assets/login_bg.jpg')} style={styles.backgroundImage} >
                        <SafeAreaView style={styles.container}>
                            <Image source={require('../../assets/supid_icon_transparent.png')} style={styles.logoImage} />
                            <Image source={{ uri: this.state.userData.profilePhoto }} style={styles.profile} />
                            <Text style={styles.heading}>Bem Vindo</Text>
                            <Text style={styles.loginInfo}>{this.state.userData.name}</Text>
                            <SupidButton onPress={this.logout} text="Desconectar" style={styles.facebookLoginButton} />
                        </SafeAreaView>
                    </ImageBackground>
                    : null
                :
                <ImageBackground source={require('../../assets/login_bg.jpg')} style={styles.backgroundImage}>
                    <SafeAreaView style={styles.container}>
                        <Image source={require('../../assets/supid_icon_transparent.png')} style={styles.logoImage} />
                        <Text style={styles.heading}>Compre Online e Receba em sua casa!</Text>
                        <Text style={styles.loginInfo}>Acesse ou cadastre-se abaixo:</Text>
                        <SupidButton onPress={this.facebookLogIn} text="Acessar com Facebook" style={styles.facebookLoginButton} />
                        <SupidButton onPress={this.googleLogin} text="Acessar com Google" style={styles.googleLoginButton} />
                        <Text style={styles.customerInfo}>Se você possui um estabelecimento</Text>
                        <SupidButton onPress={() => { this.navigation.navigate('LoginCustomer') }} style={styles.signUpButton} text="Faça Login" />
                        <Text style={styles.privacyAndPolicyText}
                            onPress={() => { this.navigation.navigate('SignUpCustomer') }}>
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
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        opacity: 25
    },
    logoImage: {
        width: screenWidth * 0.8,
        height: screenWidth * 0.22,
        alignSelf: 'center',
        resizeMode: 'stretch', // or 'stretch'
    },
    profile: {
        marginTop: '10%',
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        borderRadius: 25,
        alignSelf: 'center',
        resizeMode: 'stretch',
    },
    heading: {
        color: "#FFF",
        // fontSize: Platform.OS == 'ios' ? 30 : width*0.08,
        fontSize: screenWidth * 0.08,
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
        marginTop: 30
    },
    loginInfo: {
        color: "#FFF",
        fontSize: screenWidth * 0.05,
        textAlign: 'center',
        marginTop: screenWidth * 0.03
    },
    customerInfo: {
        color: "#FFF",
        fontSize: screenWidth * 0.05,
        textAlign: 'center',
        marginTop: screenWidth * 0.09,
        marginBottom: 0
    },
    facebookLoginButton: {
        backgroundColor: '#4267b2',
    },
    googleLoginButton: {
        backgroundColor: '#4285f4',
    },
    signUpButton: {
        backgroundColor: '#40AC59',
    },
    facebookLogoutButton: {
        backgroundColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        position: "absolute",
        bottom: 0
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
        textAlignVertical: "center"
    },
    privacyAndPolicy: {
        marginTop: screenWidth * 0.05,
        alignItems: 'center',
        justifyContent: 'center'
    },
    privacyAndPolicyText: {
        color: "#FFF",
        textDecorationLine: "underline",
        marginTop: screenWidth * 0.02,
        fontSize: screenWidth * 0.03
    }
});