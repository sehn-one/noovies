import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {useColorScheme} from "react-native"

import Movies from '../screens/Movies'
import Tv from '../screens/Tv'
import Search from '../screens/Search'

const Tab = createBottomTabNavigator()

const Tabs = () => {
const isDark = useColorScheme();
// command + shift + a 
console.log(isDark)
return (<Tab.Navigator initialRouteName="Search">
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen name="Tv" component={Tv} />
    <Tab.Screen name="Search" component={Search} />
</Tab.Navigator>)
}

export default Tabs