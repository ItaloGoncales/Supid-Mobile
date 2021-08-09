import React, { useState, useEffect } from 'react';

import { View, Text, AsyncStorage, BackHandler } from 'react-native';
import { SupidButton, GooglePlacesInput } from '../../components/supid';

import { MaterialIcons } from '@expo/vector-icons';

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import * as Location from 'expo-location';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function NewAddress() {
    const [location, setLocation] = useState({});
    const [backDisabled, setBackHandler] = useState(true);
    const [address, setAddress] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        async function _getLocation() {
            let location = await AsyncStorage.getItem('location');

            if (location === null) {
                location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                location = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                setLocation(location[0]);
            }
            else {
                setLocation(JSON.parse(location))
            }
        }

        _getLocation();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            // const onBackPress = () => {
            //     if (isSelectionModeEnabled()) {
            //         disableSelectionMode();
            //         return true;
            //     } else {
            //         return false;
            //     }
            // };

            BackHandler.addEventListener('hardwareBackPress', () => backDisabled);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', () => backDisabled);
        }, [backDisabled])
    );

    const parseGeocodedData = (data, details) => {
        const address = {};

        details.address_components.forEach(component => {
            if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
                address.city = component.long_name;
            }
            else if (component.types.includes('street_address') || component.types.includes('route')) {
                address.street = component.long_name;
            }
            else if (component.types.includes('street_number')) {
                address.streetNumber = component.long_name;
            }
            else if (component.types.includes('administrative_area_level_1')) {
                address.region = component.long_name;
                address.regionShort = component.short_name;
            }
            else if (component.types.includes('country')) {
                address.country = component.long_name;
            }
            else if (component.types.includes('postal_code')) {
                address.postalCode = component.long_name;
            }
            else if (component.types.includes('point_of_interest')) {
                address.name = component.long_name;
            }
        });

        address.location = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
        };

        setAddress(address);
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.6} style={styles.address} onPress={() => navigation.navigate("Main")}>
                    <MaterialIcons name="my-location" size={25} color="#C3C3C3" style={styles.currentLocationMarker} />
                    <View style={styles.currentLocation}>
                        <Text>
                            Usar localização atual{"\n"}
                            <Text style={styles.myAddress}>
                                {location == null || Object.keys(location).length == 0
                                    ? "Carregando..."
                                    : (Platform.OS == "ios"
                                        ? `${location.name} ${location.city != null ? ` - ${location.city}` : ""} - ${location.region}`
                                        : `${location.street}, ${location.name} ${location.city != null ? ` - ${location.city}` : ""} - ${location.region}`)
                                }
                            </Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <GooglePlacesInput currentLocation={false} onPress={parseGeocodedData} />
        </>
    );
}
