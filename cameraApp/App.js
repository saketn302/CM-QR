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
  StyleSheet
} from 'react-native';

import Camera from 'react-native-camera';
import Video from 'react-native-video';

export default class BarcodeScan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qrcode: '',
            paused:true
        }
    }

    onBarCodeRead = (e) => {this.setState({qrcode: e.data})
    that=this;
  setTimeout(function(){
    that.setState({paused: false})

  },1000);
  };

    render () {
        return (
          <View  style={styles.container}>
           {this.state.qrcode=='' &&
           <View style={styles.container}>
           <Camera
style={styles.preview}
onBarCodeRead={this.onBarCodeRead}
ref={cam => this.camera = cam}
aspect={Camera.constants.Aspect.fill}
>
    <Text style={{
        backgroundColor: 'white'
    }}>{this.state.qrcode}</Text>
</Camera>
</View>}
          
            {this.state.qrcode!='' &&  
              <View  style={styles.container}>
            <Video source={{uri: this.state.qrcode}}   // Can be a URL or a local file.
              ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       onBuffer={this.onBuffer}  
       audioOnly={true}
       paused={this.state.paused}
       
                     // Callback when remote video is buffering
       onEnd={this.onEnd}                      // Callback when playback finishes
       onError={this.videoError}               // Callback when video cannot be loaded
       onFullscreenPlayerWillPresent={this.fullScreenPlayerWillPresent} // Callback before fullscreen starts
       onFullscreenPlayerDidPresent={this.fullScreenPlayerDidPresent}   // Callback after fullscreen started
       onFullscreenPlayerWillDismiss={this.fullScreenPlayerWillDismiss} // Callback before fullscreen stops
       onFullscreenPlayerDidDismiss={this.fullScreenPlayerDidDismiss}  // Callback after fullscreen stopped
       style={styles.backgroundVideo} />
        </View>
       }

              
               </View>
               
            
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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


