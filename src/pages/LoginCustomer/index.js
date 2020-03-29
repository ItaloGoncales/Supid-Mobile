import React, { Component, useState, useRef } from 'react';

import { KeyboardAvoidingView, Text, SafeAreaView, Image, ImageBackground, ScrollView, View } from 'react-native';
import { Form } from '@unform/mobile';

import styles from './styles';

import { SupidButton, Input, InputMask, CheckBox } from '../../components/supid';

export default function LoginCustomer() {
    const formRef = useRef(null);

    function handleSubmit(data) {
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/login_bg.png')} style={styles.backgroundImage}>
                <KeyboardAvoidingView behavior="padding" style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1 }}>
                    <View style={styles.inner}>
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
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>

    )
}