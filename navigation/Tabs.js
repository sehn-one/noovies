import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {useColorScheme} from "react-native"

import Movies from '../screens/Movies'
import Tv from '../screens/Tv'
import Search from '../screens/Search'

const Tab = createBottomTabNavigator()

const Tabs = () => {
const isDark = useColorScheme() === "dark";

return (
    <Tab.Navigator initialRouteName="Search"
    sceneContainerStyle={{
        backgroundColor:isDark?"#1e272e":"#34e7e4"
    }}
    screenOptions={{
        tabBarStyle:{
            backgroundColor:isDark?"#1e272e":"#34e7e4"
        },
        tabBarActiveTintColor: isDark?"#ffc048":"#485460",
        headerStyle:{
            backgroundColor:isDark?"#1e272e":"#34e7e4"
        },
        headerTitleStyle:{
            color:isDark?"white":"#1e272e"
        }
    }}>
        <Tab.Screen name="Movies" component={Movies} />
        <Tab.Screen name="Tv" component={Tv} />
        <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
    )
}

export default Tabs