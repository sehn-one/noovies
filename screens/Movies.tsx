import React, { useEffect, useState } from "react";
import { Dimensions, Text, Image, StyleSheet, useColorScheme} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator } from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur"
import Poster from "../components/Poster";


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

const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: white;
`



const Wrapper = styled.View`
    flex-direction:row;
    height: 100%;
    justify-content: center;
    align-items:center;
`

const Column = styled.View`
    width: 40%;
    margin-left: 5px;

`
const Overview = styled.Text`
    margin-top: 10px;
    color: rgba(255,255,255,0.6)
`

const Votes = styled(Overview)`
    margin-top: 5px;
    font-size: 12px;
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
                {nowPlaying.map( (movie) =>
                    (<View key={movie.id} >
                        <BgImg source={{ uri: makeImgPath(movie.backdrop_path) }} /> 
                        <BlurView tint={isDark? "dark" : "light" } style={StyleSheet.absoluteFill} intensity={10} >
                          
                            <Wrapper>
                                <Poster path={movie.poster_path}/>
                                <Column>
                                    <Title>{movie.original_title}</Title>
                                    {movie.vote_average > 0 ? <Votes>⭐️ {movie.vote_average}/10</Votes> : null}
                                    <Overview>{movie.overview.slice(0,80)+"..."}</Overview>
                                </Column>
                            </Wrapper>
                           
                        </BlurView>
                    </View>) )}            
            </Swiper>
        </ScrollView>
)}; 


export default Movies
