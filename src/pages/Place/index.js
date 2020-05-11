import React, { useState, useRef } from 'react';
import { View, ScrollView, Image, Text, FlatList, TouchableOpacity, SafeAreaView, Dimensions, TextInput } from 'react-native';

import capitalize from 'capitalize';

import { Feather } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native';

let data = require("../../assets/products.json").reduce((arr, item) => !arr.includes(item.department) ? [...arr, item.department] : arr, []);

import styles from './styles';

export default function Place({ route }) {
    const place = route.params.place;
    const navigation = useNavigation();

    function renderDepartment({ item }) {
        return (
            <TouchableOpacity
                style={styles.departmentCard}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Department', {
                    place,
                    department: item
                })}>
                <View style={styles.departmentDetailContainer}>
                    <Text style={styles.departmentTitle}>{capitalize.words(item.replace(/-/g, " "))}</Text>
                    <Feather name="chevron-right" size={30} style={styles.accessDepartment} />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.placeHeader}>
                <Image source={require('../../assets/marketLogo.png')} style={styles.placeImage} resizeMode="cover" />
                <View style={styles.placeDetailsContainer}>
                    <Text style={styles.placeTitle}>{place.title}</Text>
                    <Text style={styles.placeInfo}>{place.category}</Text>
                    <Text style={styles.placeInfo}>{place.distance}km de distância</Text>
                    <Text style={styles.placeInfo}>Entrega em {place.time} min.</Text>
                </View>
            </View>
            <SafeAreaView >
                <FlatList
                    data={data}
                    renderItem={renderDepartment}
                    keyExtractor={(item, index) => String(index)}
                    style={styles.productContainer}
                    contentContainerStyle={styles.pageContainer}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={({ highlighted }) => (
                        <View style={[styles.separator, highlighted && { marginLeft: 0 }]} />
                    )}
                    ListHeaderComponent={(
                        <Text style={styles.departmentListTitle}>Departamentos:</Text>
                    )}
                    ListHeaderComponentStyle={styles.departmentListContainer}
                />
            </SafeAreaView>
        </View >
    );
}
