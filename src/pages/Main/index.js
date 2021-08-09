import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, FlatList, ImageBackground, SafeAreaView, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

const data = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        category: 'Supermercado',
        title: "Osmari Supermercados",
        time: 30,
        distance: 2.4
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        category: 'Farmácia',
        title: "Droga Raia",
        time: 60,
        distance: 11.3
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        category: 'PetShop',
        title: "Casa de Rações Billy & Nick",
        time: 105,
        distance: 8.7
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d82',
        category: 'Conveniência',
        title: "Conveniência 252",
        time: 45,
        distance: 17.0
    },
    {
        id: '58694a0f-3da1-471f-bd96-045571e29d82',
        category: 'Supermercado',
        title: "Koch Casa Branca",
        time: 35,
        distance: 7.0
    },
    {
        id: '58694a0f-3da1-471f-bd96-045571e29c82',
        category: 'Supermercado',
        title: "Koch Centro",
        time: 35,
        distance: 7.0
    },
];

export default function Main() {
    const navigation = useNavigation();
    function renderPlace({ item }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Place', {
                    place: item
                })}
                style={styles.placeCard}>
                <Image source={require('../../assets/marketLogo.png')} style={styles.placeImage} resizeMode="cover" />
                <View style={styles.placeDetailsContainer}>
                    <Text style={styles.placeTitle}>{item.title}</Text>
                    <Text style={styles.placeCategory}>{item.category}</Text>
                    <Text style={styles.placeInfo}><MaterialIcons name="timer" size={10} /> {item.time} min. - {item.distance} Km</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function renderPageContent() {
        return <>
            <ScrollView
                style={styles.filtersContainer}
                horizontal={true}
                contentContainerStyle={styles.filtersContainerContent}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}>
                <TouchableOpacity activeOpacity={0.9} style={styles.card}>
                    <ImageBackground imageStyle={{ borderRadius: 5 }} style={styles.cardImage} source={require('../../assets/supermarket.png')}>
                        <View style={styles.imageOpacity}>
                            <Text style={styles.cardText}>Supermercado</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.card}>
                    <ImageBackground imageStyle={{ borderRadius: 5 }} style={styles.cardImage} source={require('../../assets/drugstore.png')}>
                        <View style={styles.imageOpacity}>
                            <Text style={styles.cardText}>Farmácia</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.card}>
                    <ImageBackground imageStyle={{ borderRadius: 5 }} style={styles.cardImage} source={require('../../assets/petshop.png')}>
                        <View style={styles.imageOpacity}>
                            <Text style={styles.cardText}>Petshop</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={styles.card}>
                    <ImageBackground imageStyle={{ borderRadius: 5 }} style={styles.cardImage} source={require('../../assets/convenience.png')}>
                        <View style={styles.imageOpacity}>
                            <Text style={styles.cardText}>Conveniência</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </ScrollView>
            <Text style={styles.placesHeader}>Estabelecimentos</Text>
        </>
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.6} style={styles.address}>
                <MaterialIcons name="my-location" size={15} color="#C3C3C3" style={styles.currentLocationMarker} />
                <View style={styles.currentLocation}>
                    <Text style={styles.currentLocationText}>
                        Enviar para Rua 600, 313
                    </Text>
                </View>
            </TouchableOpacity>
            <SafeAreaView style={styles.pageContainer}>
                <FlatList
                    data={data}
                    renderItem={renderPlace}
                    keyExtractor={item => item.id}
                    style={styles.placesContainer}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={renderPageContent} />
            </SafeAreaView>
        </View>
    );
}