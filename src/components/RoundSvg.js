import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import Svg, { Path } from 'react-native-svg';

export default props => {
  
  return (
    <View style={[ StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' } ]}>

      <Svg 
        width={Dimensions.get("window").width} 
        height="49" 
        viewBox={`0 0 ${Dimensions.get("window").width} 49`} fill="none">

        <Path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d={`M0 0C50.6431 30.5934 115.809 49 186.91 49C258.011 49 323.177 30.5934 ${Dimensions.get("window").width} 0H0Z`} 
          fill={props.color || "#C60B0B"}/>
      </Svg>
    </View>
      );  
}