import React, { useEffect, useState } from "react";
import { Dimensions, Text, Image} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator } from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur"


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
const BgImg = styled.Image`
    width:100%;
    height:100%;
    position:absolute;
`

const Title = styled.Text``

const { height: SCREEN_HEIGHT } =  Dimensions.get("window")  

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([])
    const getNowPlaying = async () =>{
        const { results } = await (await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)).json();
        setNowPlaying(results);
        setLoading(false);
    }
    useEffect(()=>{
        
        getNowPlaying();
        console.log("hook")
    },[])
    return  loading ? (<Loader>
        <ActivityIndicator size="large"/>
        </Loader>) : (
        <ScrollView>
            <Swiper loop timeout={3.5} controlsEnabled={false} containerStyle={{width:"100%", height: SCREEN_HEIGHT /  4 }}>
                {nowPlaying.map( (movie) =>
                    (<View key={movie.id} >
                        <BgImg source={{ uri: makeImgPath(movie.backdrop_path) }} /> 
                        <BlurView style={{ width:"100%" , height:"100%",position:"absolute" }} intensity={5} >
                            <Title>{movie.original_title}</Title>
                        </BlurView>
                    </View>) )}            
            </Swiper>
        </ScrollView>
)}; 


export default Movies
