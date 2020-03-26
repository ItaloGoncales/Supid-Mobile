import React, { Component, useState, useEffect, useRef } from 'react';

import { StyleSheet, TouchableOpacity, Text, TextInput, Platform, Dimensions, View } from 'react-native';

import { TextInputMask } from 'react-native-masked-text'

import { CheckBox as RNECheckBox } from 'react-native-elements'

import { useField } from '@unform/core';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export function SupidButton({ text = "Enviar", onPress, style = {}, textStyle = {}, ...rest }) {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.button, style]} {...rest}>
            <View>
                <Text style={[styles.text, textStyle]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export function Input({ name, label, style = {}, labelStyle = {}, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue = '', error } = useField(name);

    const [isFocused, setFocus] = useState(false);

    const handleFocus = event => {
        setFocus(true);

        if (rest.onFocus)
            rest.onFocus = event
    }

    const handleBlur = event => {
        setFocus(false);

        if (rest.onBlur)
            rest.onBlur = event
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: '_lastNativeText',
            getValue(ref) {
                return ref._lastNativeText.trim() || '';
            },
            setValue(ref, value) {
                ref.setNativeProps({ text: value });
                ref._lastNativeText = value;
            },
            clearValue(ref) {
                ref.setNativeProps({ text: '' });
                ref._lastNativeText = '';
            },
        });
    }, [fieldName, registerField]);
    return (
        <>
            {label && <Text style={[styles.inputLabel, labelStyle]}>{label}</Text>}
            <TextInput
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
                defaultValue={defaultValue}
                style={[styles.input, style, { borderBottomColor: isFocused ? "#40AC59" : "#D3D3D3" }]}
                selectionColor={"#40AC59"}
                underlineColorAndroid={
                    isFocused ? "#40AC59" : "#D3D3D3"
                }
                {...rest} />
        </>
    );
}

export function InputMask({ name, label, style = {}, labelStyle = {}, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    const [isFocused, setFocus] = useState(false);

    const handleFocus = event => {
        setFocus(true);

        if (rest.onFocus)
            rest.onFocus = event
    }

    const handleBlur = event => {
        setFocus(false);

        if (rest.onBlur)
            rest.onBlur = event
    }

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
            getValue(ref) {
                console.log(ref.isValid())
                return ref.getRawValue() || '';
            },
            setValue(ref, value) {
                ref.setNativeProps({ text: value });
                ref._lastNativeText = value;
            },
            clearValue(ref) {
                ref.setNativeProps({ text: '' });
                ref._lastNativeText = '';
            },
        });
    }, [fieldName, registerField]);
    return (
        <>
            {label && <Text style={[styles.inputLabel, labelStyle]}>{label}</Text>}
            <TextInputMask
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
                defaultValue={defaultValue}
                style={[styles.input, style, { borderBottomColor: isFocused ? "#40AC59" : "#D3D3D3" }]}
                selectionColor={"#40AC59"}
                underlineColorAndroid={
                    isFocused ? "#40AC59" : "#D3D3D3"
                }
                {...rest} />
        </>
    );
};

export function CheckBox({ name, style = {}, ...rest }) {
    return (
        <RNECheckBox
            containerStyle={[styles.checkBox, style]}
            {...rest} />
    );
}

export default [SupidButton, Input, CheckBox]

let styles = StyleSheet.create({
    button: {
        backgroundColor: '#C74A55',
        borderRadius: 5,
        alignSelf: 'stretch',
        marginTop: screenWidth * 0.02,
        height: screenWidth * 0.12,
        marginLeft: 30,
        marginRight: 30,
        elevation: 5,
        justifyContent: 'center'
    },
    text: {
        color: "#FFF",
        textAlign: "center",
        textAlignVertical: "center"
    },
    input: {
        marginLeft: 30,
        marginRight: 30,
        height: screenWidth * 0.12,
        borderBottomWidth: Platform.OS == 'ios' ? 1 : 0,
        paddingLeft: 6
    },
    inputLabel: {
        fontSize: screenWidth * 0.03,
        color: "#333",
        marginTop: screenWidth * 0.05,
        marginBottom: screenWidth * -0.02,
        marginLeft: 30,
    },
    checkBox: {
        backgroundColor: 'transparent',
        alignSelf: "center",
        paddingHorizontal: 20,
        borderWidth: 0,
        marginTop: screenWidth * 0.05,
    }
});
