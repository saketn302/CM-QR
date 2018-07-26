/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/*
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or ggfgfhfhfffhghgf for dev menu',
  android: 'Double tap dfdfgfgfdgg R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
       
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
*/


import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar
} from 'react-native';

import Camera from 'react-native-camera';
import Video from 'react-native-video';


import YouTube from 'react-native-youtube'


export default class BarcodeScan extends Component {

    constructor(props) {
        super(props);
        that=this;
        cameraFlash:1,
        this.state = {
            qrcode: '',
            paused:true,
            
        }
    }
    mediaClose = (e) => {this.setState({qrcode:''})}
    onBarCodeRead = (e) => {this.setState({qrcode: e.data})
    that=this;

    
  
    const { navigate } = that.props.navigation;
    navigate('Media', { qrCode: that.state.qrcode,close:that.mediaClose})


  };


  toggleFlash = () => {
    const state = this.state
    //alert(Camera.constants.TorchMode.on);
    state.cameraFlash = state.cameraFlash === Camera.constants.TorchMode.on
    ? Camera.constants.TorchMode.off : Camera.constants.TorchMode.on
    this.setState(state)
    }

    
componentDidMount(){

this.toggleFlash()

}

    render () {
        return (
          
         
           <View style={styles.container}>

         <StatusBar
     backgroundColor="black"
     barStyle="light-content"
         />  
           <View style={{alignContent:'center',alignItems:'center',margin:8,  backgroundColor:'white'}}>
           <Image source={require('../../../assets/images/QR.png')} style={{height:50,
          resizeMode:'contain'}}/>
          <Text style={{fontWeight:'bold',fontSize:16,color:'black'}}> Scan Code</Text>
          </View>
          { this.state.qrcode=='' &&
          <Camera
style={styles.preview}
onBarCodeRead={this.onBarCodeRead}
ref={cam => this.camera = cam}
aspect={Camera.constants.Aspect.fill}
>
    <Text style={{
        backgroundColor: 'white'
    }}>{this.state.qrcode}</Text>
</Camera>}
</View>
          
         

              
            
               
            
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'white'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin:50
    
  },
});


