/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Slider,
  Image,
  Dimensions,
} from 'react-native';

import { TabNavigator,DrawerItems, StackNavigator,DrawerNavigator,NavigationActions } from 'react-navigation';


import {
Home, 
Media

} from '@screen';
    

const  {height, width} = Dimensions.get('window');

type Props = {};


export default class Router extends Component {
	render() {

		
		

			

				const MainNavigator = StackNavigator({
					
					Home:{screen:Home},
					Media:{screen:Media},
				
						},
							{
								initialRouteName: 'Home',
								
								navigationOptions: {
									headerVisible: true,
									headerTitleStyle: { color: "red", fontWeight: 'bold' },
									headerTitle: (
										<View style={{flexDirection:'row'}}> 
										<Image source={require('../../assets/images/icon.png')}/>
										<Text style={{color:'#CE8A7E',fontSize:22,
										width:width,marginLeft:25,textAlignVertical:'center',
									fontWeight:'bold'}}>CM Library QR Scanner</Text>
										</View>
									),
									headerStyle: {
										backgroundColor: "black",
										paddingHorizontal: 10,
											borderBottomWidth: 0
									},
				
								},
							});

				


		return <MainNavigator />;
	}
}
