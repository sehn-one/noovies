import React, { useEffect, useState } from "react";
import { Dimensions, Text, Image, StyleSheet, useColorScheme} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator } from "react-native";
import { makeImgPath } from "../utils";

import Poster from "../components/Poster";
import Slide from "../components/Slide";


const API_KEY = "d46caed65f5c8ff02793a020a4993177"

const ScrollView = styled.ScrollView`
    background-color : ${ (props) => props.theme.mainBgColor };
`

const Loader = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color:${ (props) => props.theme.mainBgColor }
`


const { height: SCREEN_HEIGHT } =  Dimensions.get("window")  

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const isDark = useColorScheme() === "dark";
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
            <Swiper horizontal loop showsButtons={false} autoplayTimeout={3.5} showsPagination={false} containerStyle={{width:"100%", height: SCREEN_HEIGHT /  4 }}>
                {nowPlaying.map( (movie) => (<Slide  key={movie.id}
                    backdropPath={movie.backdrop_path}
                    posterPath={movie.poster_path}
                    originalTitle={movie.original_title}
                    voteAverage={movie.vote_average}
                    overview={movie.overview} />) )
                }            
            </Swiper>
        </ScrollView>
)}; 


export default Movies
