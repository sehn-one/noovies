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

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
    margin-top: 20px;
`

const Movie = styled.View`
    margin-right: 20px;
    align-items:center;
`

const Title = styled.Text`
    font-size: 12px;
    color: white;
    font-weight: 600;
    margin-top: 6px;
    margin-bottom: 5px;
`

const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const { height: SCREEN_HEIGHT } =  Dimensions.get("window")  

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([])
    const [upcoming, setUpcoming] = useState([]);
    const [trending, setTrending] = useState([]);

    const getNowPlaying = async () =>{
        const { results } = await (await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)).json();
        setNowPlaying(results);
    }
    const getTrending = async () => {
        const { results } = await (
          await fetch(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
          )
        ).json();
        setTrending(results);
      };
      const getUpcoming = async () => {
        const { results } = await (
          await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
          )
        ).json();
        setUpcoming(results);
      };
    const getData = async () =>{
       await Promise.all([getNowPlaying(),getTrending(),getUpcoming()])
       setLoading(false);
    };
    useEffect(()=>{        
        getData();   
    },[])
    return  loading ? (<Loader>
        <ActivityIndicator size="large"/>
        </Loader>) : (
        <ScrollView>
            <Swiper horizontal loop showsButtons={false} autoplayTimeout={3.5} showsPagination={false} containerStyle={{width:"100%", height: SCREEN_HEIGHT /  4 , marginBottom: 30,}}>
                {nowPlaying.map( (movie) => (<Slide  key={movie.id}
                    backdropPath={movie.backdrop_path}
                    posterPath={movie.poster_path}
                    originalTitle={movie.original_title}
                    voteAverage={movie.vote_average}
                    overview={movie.overview} />) )
                }            
            </Swiper>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
                horizontal
                contentContainerStyle={{paddingLeft:30,}}
                showsHorizontalScrollIndicator={false}
            >
                {trending.map((movie)=>(
                    <Movie key={movie.id}>
                        <Poster path={movie.poster_path}/>
                        <Title>
                            { movie.original_title.length > 13? movie.original_title.slice(0,13)+"..." : movie.original_title }
                        </Title>
                        <Votes>⭐️ {movie.vote_average}/10</Votes>
                    </Movie>
                ))}
            </TrendingScroll>
        </ScrollView>
)}; 


export default Movies
