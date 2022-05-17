
import React,{ useState } from 'react';
import AppLoading from 'expo-app-loading'
import * as Font from "expo-font"
import {Ionicons} from "@expo/vector-icons" 
import {Asset} from "expo-asset"
import { Image } from 'react-native';

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish =()=>{
    setReady(true)
  }
  const onError = ()=>{

  }
  const startLoading = async()=>{
    // preloading font icons
    await Font.loadAsync(Ionicons.font) // 폰트 아이콘 로딩
    await Asset.loadAsync(require("./assets/test.png")) // 로컬 에셋 로딩
    await Image.prefetch("https://s.pstatic.net/static/www/img/uit/sp_main_dba1af.png")
    // await new Promise(resolve=> setTimeout(resolve,5000) )
  }

  if(!ready){
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error}/>;
  }

  return null;
}
