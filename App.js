
import React,{ useState } from 'react';
import AppLoading from 'expo-app-loading'
import * as Font from "expo-font"
import {Ionicons} from "@expo/vector-icons" 
import {Asset} from "expo-asset"

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish =()=>{
    setReady(true)
  }
  const onError = ()=>{

  }
  const startLoading = async()=>{
    // preloading font icons
    await Font.loadAsync(Ionicons.font)
    await Asset.loadAsync(require("./assets/test.png"))
    // await new Promise(resolve=> setTimeout(resolve,5000) )
  }
  if(!ready){
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error}/>;
  }
  return null;
}
