import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Image, Text, FlatList, TouchableOpacity, SafeAreaView, Dimensions, TextInput } from 'react-native';

import { SupidButton } from '../../components/supid';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

let data = require("../../assets/products.json");
for (let index in data) {
    data[index]["id"] = index;
}

import styles from './styles';

import capitalize from 'capitalize';

export default function Place({ route }) {
    const place = route.params.place;
    const department = route.params.department;

    data = data.filter(item => item.department == department);

    const [index, setIndex] = useState(0);
    const [list, setList] = useState({});
    const [routes] = useState(
        data
            .reduce((unique, item) => unique.includes(item.category) ? unique : [...unique, item.category], [])
            .map(item => ({ key: item.replace(/\s+/g, '_').replace('&', 'e').toLowerCase(), title: item }))
    );
    const [products, setProducts] = useState([]);
    const [refreshing, setRefresh] = useState(false);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        retrieveMore(routes[0].key);
    }, [])

    function renderItemPicker(item) {
        if (item.price == "")
            return;

        return (
            <View style={styles.itemPicker}>
                <SupidButton onPress={() => removeFromList(item)} text="-" style={styles.itemSelector} />
                <TextInput
                    value={typeof list[item.id] === 'undefined' ? "0" : `${list[item.id]}`}
                    editable={false}
                    style={styles.itemCounter}
                />
                <SupidButton onPress={() => addToList(item)} text="+" style={styles.itemSelector} />
            </View>
        )
    }

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

    function retrieveMore(category) {
        setRefresh(true);

        let newProducts = [...products, ...data.filter(item => item.category == category && !products.find(prod => prod.id == item.id)).sort((a, b) => {
            if (a.price === "") return 1;
            if (b.price === "") return -1;
        })];
        newProducts = newProducts.splice(0, products.length + 10)
        setProducts(newProducts);

        // data = [...data.filter(item => !products.find(product => product.id == item.id))]
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
                <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
                <View style={styles.productDetailsContainer}>
                    <View>
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.productCategory}>{`${capitalize.words(item.category.replace(/-/g, " "))} \u2022 ${item.brand}`}</Text>
                        {item.price != ""
                            ? <Text style={styles.productPrice}>R$ {item.price}</Text>
                            : <Text style={styles.productPriceUnavailable}>Indisponível</Text>
                        }
                    </View>
                </View>
                {renderItemPicker(item)}
            </View>
        );
    }

    function renderCategory(category) {
        return (<FlatList
            data={products.filter(item => item.category == category).sort((a, b) => {
                if (a.price === "") return 1;
                if (b.price === "") return -1;
            })}
            renderItem={renderProduct}
            listKey={category}
            keyExtractor={item => item.id}
            onEndReached={() => retrieveMore(category)}
            onEndReachedThreshold={0.7}
            refreshing={refreshing}
            style={styles.productContainer}
            showsVerticalScrollIndicator={false}
        />)
    }

    const renderScene = SceneMap(
        data
            .reduce((unique, item) => unique.includes(item.category) ? unique : [...unique, item.category], [])
            .map(category => ({ [category.replace(/\s+/g, '_').replace('&', 'e').toLowerCase()]: () => renderCategory(category) }))
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
                                            getLabelText={({ route }) => capitalize.words(route.title.replace(/-/g, " "))}
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
