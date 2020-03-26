import React, { Component, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { SupidButton, Input, InputMask, CheckBox } from '../components/supid';
import { KeyboardAvoidingView, View, StyleSheet, ScrollView, Text, Dimensions, Linking } from 'react-native'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function SignUpCustomer() {
    const formRef = useRef(null);
    const [cnpj, setCNPJ] = useState("");
    const [checked, setChecked] = useState(false);

    function handleSubmit(data) {
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
            <ScrollView >
                <View style={styles.inner}>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input
                            name="nome"
                            label="Seu nome"
                            type="text"
                            returnKeyType={"next"}
                            onSubmitEditing={() => formRef.current.getFieldRef('estabelecimento').focus()}
                            blurOnSubmit={false}
                        />
                        <Input
                            name="estabelecimento"
                            label="Nome do Estabelecimento"
                            type="text"
                            returnKeyType={"next"}
                            onSubmitEditing={() => formRef.current.getFieldRef('email').focus()}
                            blurOnSubmit={false}
                        />
                        <Input
                            name="email"
                            label="Email"
                            type="email"
                            returnKeyType={"next"}
                            autoCompleteType="email"
                            keyboardType="email-address"
                            onSubmitEditing={() => formRef.current.getFieldRef('password').focus()}
                            blurOnSubmit={false}
                        />
                        <Input
                            name="password"
                            label="Senha"
                            type="password"
                            secureTextEntry={true}
                            returnKeyType={"next"}
                            onSubmitEditing={() => formRef.current.getFieldRef('confirmPassword').focus()}
                            blurOnSubmit={false}
                        />
                        <Input
                            name="confirmPassword"
                            label="Confirmar Senha"
                            type="password"
                            secureTextEntry={true}
                            returnKeyType={"next"}
                            onSubmitEditing={() => formRef.current.getFieldRef('cnpj')._inputElement.focus()}
                            blurOnSubmit={false}
                        />
                        <InputMask
                            name="cnpj"
                            label="CNPJ"
                            type="cnpj"
                            value={cnpj}
                            onChangeText={text => {
                                setCNPJ(text)
                            }}
                        />
                        <CheckBox
                            title={
                                <Text style={styles.checkBoxMessage}>
                                    <Text>Estou de acordo com os </Text>
                                    <Text style={styles.privacyAndPolicyText} onPress={() => Linking.openURL('https://supid.com.br/privacy-and-policy.html')}>Termos de Uso</Text>
                                    <Text> e as </Text>
                                    <Text style={styles.privacyAndPolicyText} onPress={() => Linking.openURL('https://supid.com.br/privacy-and-policy.html')}>Políticas de Privacidade</Text>.
                            </Text>
                            }
                            iconType='material-community'
                            checkedIcon='check-box-outline'
                            uncheckedIcon='checkbox-blank-outline'
                            checked={checked}
                            checkedColor='#40AC59'
                            onPress={() => setChecked(!checked)}
                        />

                        <SupidButton text="Cadastrar" onPress={() => formRef.current.submitForm()} />

                    </Form>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: "space-between"
    },
    privacyAndPolicyText: {
        textDecorationLine: "underline",
        marginTop: screenWidth * 0.02,
    },
    checkBoxMessage: {
        paddingHorizontal: 10
    }
})