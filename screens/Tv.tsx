import React from "react";
import {View, Text} from "react-native"
import styled from 'styled-components/native'

const StyledText = styled.Text`
  color: red;
`

const Tv = () => (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <StyledText>Tv</StyledText>
    </View>
);
export default Tv;