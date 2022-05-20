import React, { useEffect, useState } from "react";
import { Dimensions, Text} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { ActivityIndicator } from "react-native";


const API_KEY = "d46caed65f5c8ff02793a020a4993177"

const ScrollView = styled.ScrollView`
    background-color : ${ (props) => props.theme.mainBgColor };
`
const View = styled.View`
    flex:1
`

const Loader = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color:${ (props) => props.theme.mainBgColor }
`

const { height: SCREEN_HEIGHT } =  Dimensions.get("window")  

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [loading, setLoading] = useState(true);
    const getNowPlaying = async () =>{
        const { results } = await (await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)).json();
        console.log(results)
        setLoading(false);
    }
    useEffect(()=>{
        getNowPlaying();
    },[])
    return  loading ? (<Loader>
        <ActivityIndicator size="large"/>
        </Loader>) : (
    <ScrollView>
        <Swiper loop timeout={3.5} controlsEnabled={false} containerStyle={{width:"100%", height: SCREEN_HEIGHT /  4 }}>
            <View style={{ backgroundColor:"red" }}></View>
            <View style={{ backgroundColor:"white" }}></View>
            <View style={{ backgroundColor:"blue" }}></View>
        </Swiper>
    </ScrollView>
)}; 


export default Movies
