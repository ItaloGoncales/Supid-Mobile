import React, { Component, useState, useRef } from 'react';

import { KeyboardAvoidingView, ScrollView, Text, SafeAreaView, Image, ImageBackground, StyleSheet, TouchableOpacity, Platform, Linking, Dimensions } from 'react-native';
import { Form } from '@unform/mobile';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

import { SupidButton, Input, InputMask, CheckBox } from '../components/supid';

export default function LoginCustomer() {
    const formRef = useRef(null);

    function handleSubmit(data) {
    }

    return (
        <ImageBackground source={require('../../assets/login_bg.jpg')} style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80}>
                    <Image source={require('../../assets/supid_icon_transparent.png')} style={styles.logoImage} />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Text style={styles.heading}>Fazer Login</Text>
                        <Input
                            name="email"
                            label="Email"
                            type="email"
                            returnKeyType={"next"}
                            autoCompleteType="email"
                            keyboardType="email-address"
                            labelStyle={styles.labelStyle}
                            style={styles.inputStyle}
                            onSubmitEditing={() => formRef.current.getFieldRef('password').focus()}
                            blurOnSubmit={false}
                        />
                        <Input
                            name="password"
                            label="Senha"
                            type="password"
                            secureTextEntry={true}
                            labelStyle={styles.labelStyle}
                            style={styles.inputStyle}
                        />
                        <SupidButton onPress={() => formRef.current.submitForm()} style={styles.signUpButton} />
                    </Form>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    )
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: screenWidth * -0.1,
        backgroundColor: 'rgba(0,0,0,0.5)',
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
    heading: {
        color: "#FFF",
        // fontSize: Platform.OS == 'ios' ? 30 : width*0.08,
        fontSize: screenWidth * 0.08,
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
        marginTop: 30
    },
    signUpButton: {
        backgroundColor: '#40AC59',
    },
    labelStyle: {
        color: "#FFF",
        fontSize: screenWidth * 0.03
    },
    inputStyle: {
        color: "#FFF",
        fontSize: screenWidth * 0.05
    }
});