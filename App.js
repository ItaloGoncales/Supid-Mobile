import React, { useEffect } from 'react';

import { StatusBar, BackHandler, Alert, AsyncStorage } from 'react-native'

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import 'react-native-gesture-handler';

import Index from './src/index';

export default function App() {


  useEffect(() => {
    const AsyncAlert = async (message) => new Promise((resolve) => {
      Alert.alert(
        'Alerta',
        message,
        [
          {
            text: 'OK',
            onPress: () => {
              resolve('YES');
            },
          },
        ],
        { cancelable: false },
      );
    });

    async function alertIfRemoteNotificationsDisabledAsync() {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        await AsyncAlert('Olá! Para o funcionamento correto do aplicativo, é necessário ativar a localização.');
        BackHandler.exitApp();
      }
      else {
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        location = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        await AsyncStorage.setItem('location', JSON.stringify(location[0]));
      }
    }

    alertIfRemoteNotificationsDisabledAsync()
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Index></Index>
    </>
  );
}
