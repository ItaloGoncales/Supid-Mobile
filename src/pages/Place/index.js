import React, { useState } from 'react';
import { View, ScrollView, Image, Text, FlatList, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const data = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: "Pão de Forma de Leite",
        brand: "Panco",
        price: 4.59,
        currency: 'BRL',
        category: 'Padaria e Confeitaria',
        subCategory: 'Pães',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: "Doce de Leite",
        brand: "Tirol",
        price: 6.79,
        currency: 'BRL',
        category: 'Matinal',
        subCategory: 'Geléias e Doces',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: "Mortadela Defumada",
        brand: "Sadia",
        price: 7.19,
        currency: 'BRL',
        category: 'Frios & Laticínios',
        subCategory: 'Frios',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d82',
        title: "Pão de Forma de Lanche",
        brand: "Pulman",
        price: 3.89,
        currency: 'BRL',
        category: 'Padaria e Confeitaria',
        subCategory: 'Pães',
    },
    {
        id: '58694a0f-3da1-471f-bd96-045571e29c82',
        title: "Bisnaguinha",
        brand: "Panco",
        price: 6.75,
        currency: 'BRL',
        category: 'Padaria e Confeitaria',
        subCategory: 'Pães',
    },
    {
        id: '58694a0f-3da1-471f-cd96-045571e29c82',
        title: "Detergente",
        brand: "Ipê",
        price: 2.19,
        currency: 'BRL',
        category: 'Produtos de Limpeza',
        subCategory: 'Detergente Líquido',
    },
];

import styles from './styles';

export default function Place({ route }) {
    const place = route.params.place;

    const [index, setIndex] = useState(0);
    const [routes] = useState(
        data
            .reduce((unique, item) => unique.includes(item.category) ? unique : [...unique, item.category], [])
            .map(item => ({ key: item.replace(/\s+/g, '_').replace('&', 'e').toLowerCase(), title: item }))
    );

    function renderProduct({ item }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.productCard}>
                <View style={styles.productDetailsContainer}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productCategory}>{`${item.subCategory} \u2022 ${item.brand}`}</Text>
                    <Text style={styles.productPrice}>R$ {item.price}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function renderCategory(category) {
        return (<FlatList
            data={data.filter(item => item.category == category)}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.productContainer}
            showsVerticalScrollIndicator={false} />)
    }

    const renderScene = SceneMap(
        data
            .reduce((unique, item) => unique.includes(item.category) ? unique : [...unique, item.category], [])
            .map(category => ({ [category.replace(/\s+/g, '_').replace('&', 'e').toLowerCase()]: () => renderCategory(category) }))
            .reduce((obj, item) => ({ ...obj, ...item }), {})
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.placeHeader}>
                    <Image source={require('../../assets/marketLogo.png')} style={styles.placeImage} resizeMode="cover" />
                    <View style={styles.placeDetailsContainer}>
                        <Text style={styles.placeTitle}>{place.title}</Text>
                        <Text style={styles.placeInfo}>{place.category}</Text>
                        <Text style={styles.placeInfo}>{place.distance}km de distância</Text>
                        <Text style={styles.placeInfo}>Entrega em {place.time} min.</Text>
                    </View>
                </View>
                <SafeAreaView>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        swipeEnabled={false}
                        onIndexChange={setIndex}
                        renderTabBar={props =>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                nestedScrollEnabled={true}>
                                <TabBar
                                    style={{
                                        backgroundColor: "#fff",
                                        fontSize: 10,
                                        width: 120 * data.length
                                    }}
                                    getLabelText={({ route }) => route.title}
                                    indicatorStyle={{
                                        backgroundColor: '#40AC59',
                                    }}
                                    labelStyle={{
                                        color: "#0c0c0c",
                                        fontSize: 10,
                                        textAlign: "center",
                                    }}
                                    {...props}
                                />
                            </ScrollView>
                        }
                    />
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}
