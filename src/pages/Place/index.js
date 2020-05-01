import React, { useState, useRef } from 'react';
import { View, ScrollView, Image, Text, FlatList, TouchableOpacity, SafeAreaView, Dimensions, TextInput } from 'react-native';

import { SupidButton } from '../../components/supid';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

let data = require("../../assets/products.json");
for (let index in data) {
    data[index]["id"] = index;
}

// [
//     {
//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         title: "Pão de Forma de Leite",
//         brand: "Panco",
//         price: 4.59,
//         currency: 'BRL',
//         category: 'Padaria e Confeitaria',
//         subCategory: 'Pães',
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         title: "Doce de Leite",
//         brand: "Tirol",
//         price: 6.79,
//         currency: 'BRL',
//         category: 'Matinal',
//         subCategory: 'Geléias e Doces',
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         title: "Mortadela Defumada",
//         brand: "Sadia",
//         price: 7.19,
//         currency: 'BRL',
//         category: 'Frios & Laticínios',
//         subCategory: 'Frios',
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d82',
//         title: "Pão de Forma de Lanche",
//         brand: "Pulman",
//         price: 3.89,
//         currency: 'BRL',
//         category: 'Padaria e Confeitaria',
//         subCategory: 'Pães',
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-045571e29c82',
//         title: "Bisnaguinha",
//         brand: "Panco",
//         price: 6.75,
//         currency: 'BRL',
//         category: 'Padaria e Confeitaria',
//         subCategory: 'Pães',
//     },
//     {
//         id: '58694a0f-3da1-471f-cd96-045571e29c82',
//         title: "Detergente",
//         brand: "Ipê",
//         price: 2.19,
//         currency: 'BRL',
//         category: 'Produtos de Limpeza',
//         subCategory: 'Detergente Líquido',
//     },
// ];

import styles from './styles';

export default function Place({ route }) {
    const place = route.params.place;

    const [index, setIndex] = useState(0);
    const [list, setList] = useState({});
    const [routes] = useState(
        data
            .reduce((unique, item) => unique.includes(item.department) ? unique : [...unique, item.department], [])
            .map(item => ({ key: item.replace(/\s+/g, '_').replace('&', 'e').toLowerCase(), title: item }))
    );
    const [products, setProducts] = useState(data.splice(0, 20));
    const [refreshing, setRefresh] = useState(false);
    const scrollViewRef = useRef(null);

    function addToList(item) {
        typeof list[item.id] === 'undefined'
            ? setList({ ...list, [item.id]: 1 })
            : setList({ ...list, [item.id]: list[item.id] + 1 })
    }

    function removeFromList(item) {
        if (typeof list[item.id] === 'undefined') return;

        if (list[item.id] == 1) {
            let left = { ...list };
            delete left[item.id];

            setList({ ...left });
        }
        else {
            setList({ ...list, [item.id]: list[item.id] - 1 });
        }
    }

    function retrieveMore(department) {
        setRefresh(true);

        let newProducts = [...products, ...data.filter(item => item.department == department).splice(0, 10)];
        setProducts(newProducts);

        data = [...data.filter(item => !products.find(product => product.id == item.id))]
        setRefresh(false);
    }

    function setTabIndex(index) {
        setIndex(index);
        retrieveMore(routes[index].key)
        scrollViewRef.current.scrollTo({ x: index * 120, y: 0, animated: true });
    }

    function renderProduct({ item }) {
        return (
            <View
                style={styles.productCard}>
                <View style={styles.productDetailsContainer}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productCategory}>{`${item.category} \u2022 ${item.brand}`}</Text>
                    <Text style={styles.productPrice}>R$ {item.price}</Text>
                </View>
                <View style={styles.itemPicker}>
                    <SupidButton onPress={() => removeFromList(item)} text="-" style={styles.itemSelector} />
                    <TextInput
                        value={typeof list[item.id] === 'undefined' ? "0" : `${list[item.id]}`}
                        editable={false}
                        style={styles.itemCounter}
                    />
                    <SupidButton onPress={() => addToList(item)} text="+" style={styles.itemSelector} />
                </View>
            </View>
        );
    }

    function renderDepartment(department) {
        return (<FlatList
            data={products.filter(item => item.department == department)}
            renderItem={renderProduct}
            listKey={department}
            keyExtractor={item => item.id}
            onEndReached={() => retrieveMore(department)}
            onEndReachedThreshold={0.7}
            refreshing={refreshing}
            style={styles.productContainer}
            showsVerticalScrollIndicator={false}
        />)
    }

    const renderScene = SceneMap(
        data
            .reduce((unique, item) => unique.includes(item.department) ? unique : [...unique, item.department], [])
            .map(department => ({ [department.replace(/\s+/g, '_').replace('&', 'e').toLowerCase()]: () => renderDepartment(department) }))
            .reduce((obj, item) => ({ ...obj, ...item }), {})
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={[1]}
                keyExtractor={() => "ParentList"}
                renderItem={() => (
                    <>
                        <View style={styles.placeHeader}>
                            <Image source={require('../../assets/marketLogo.png')} style={styles.placeImage} resizeMode="cover" />
                            <View style={styles.placeDetailsContainer}>
                                <Text style={styles.placeTitle}>{place.title}</Text>
                                <Text style={styles.placeInfo}>{place.department}</Text>
                                <Text style={styles.placeInfo}>{place.distance}km de distância</Text>
                                <Text style={styles.placeInfo}>Entrega em {place.time} min.</Text>
                            </View>
                        </View>
                        <SafeAreaView>
                            <TabView
                                navigationState={{ index, routes }}
                                renderScene={renderScene}
                                swipeEnabled={false}
                                onIndexChange={idx => setTabIndex(idx)}
                                renderTabBar={props =>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        ref={scrollViewRef}
                                        nestedScrollEnabled={true}>
                                        <TabBar
                                            style={{
                                                backgroundColor: "#fff",
                                                fontSize: 10,
                                                width: 120 * routes.length
                                            }}
                                            getLabelText={({ route }) => route.title.replace(/-/g, " ")}
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
                    </>
                )}
            />
        </View >
    );
}
