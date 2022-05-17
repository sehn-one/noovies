
import React,{ useState } from 'react';
import AppLoading from 'expo-app-loading'
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons" 
import { Asset } from "expo-asset"
import { Image } from 'react-native';

const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(font))
const loadImages = (images)=> images.map(image=>{
  if(typeof image ==="string"){
    return Image.prefetch(image)
  }else{
    return Asset.loadAsync(image)
  }
})
export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish =()=>{
    setReady(true)
  }
  const onError = ()=>{

  }
  const startLoading = async()=>{
    // preloading font icons
    const fonts = loadFonts([Ionicons.font]) // 폰트 아이콘 로딩
    const images = loadImages([ require("./assets/test.png"), "https://s.pstatic.net/static/www/img/uit/sp_main_dba1af.png" ]) // 에셋 로딩
    await Promise.all([...fonts,...images]); // 전체 Promise가 resolve 될때까지 wait
  }

  if(!ready){
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error}/>;
  }

  return null;
}
