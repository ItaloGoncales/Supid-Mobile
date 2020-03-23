import React from 'react';

import { StatusBar } from 'react-native'

import 'react-native-gesture-handler';

import Index from './src/index';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Index></Index>
    </>
  );
}
