
import React,{ useState } from 'react';
import AppLoading from 'expo-app-loading'
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons" 
import { Asset, useAssets } from "expo-asset"
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';

export default function App() {

  const [assets] = useAssets( [require("./assets/test.png"), "https://s.pstatic.net/static/www/img/uit/sp_main_dba1af.png" ])
  const [loaded] = Font.useFonts(Ionicons.font);

  return <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  ;
}
