import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  WebView,
  BackHandler,
  ImageBackground,
    ToastAndroid,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native';

import Camera from 'react-native-camera';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
const colors=require('../../../assets/Media/Colors.mp3')
const colors1=require('../../../assets/Media/Hidden_in_Your_Heart.mp3')
const colors2=require('../../../assets/Media/Hopscotch.mp3')
const colors3=require('../../../assets/Media/Lincoln.mp3')
const colors4=require('../../../assets/Media/Learn.mp4')
const colors5=require('../../../assets/Media/The_Life___Times_of_a_Contortionist.mp4')
const  {height, width} = Dimensions.get('window');
import YouTube from 'react-native-youtube'
const bg_img=require('../../../assets/icons/audio.png')
const audioSelect=-1;
const videoSelect=-1;
const showFwdCntrl=false;
export default class BarcodeScan extends Component {

  static navigationOptions = {
    header: null
}
that=null;

componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton() {

  that.setState({  audioSelect:-1,videoSelect:-1})

        that.props.navigation.state.params.close()
        that.props.navigation.goBack()
return true;
}

getYoutubeVideoID(str)
{

  
  if(str.toLowerCase().indexOf('https://www.youtube.com/watch?v')>=0)
 return   mySubString = str.substring(
  str.indexOf("=") + 1, 
  str.indexOf("&")==-1?str.length:str.indexOf("&")
);
else if(str.toLowerCase().indexOf('https://youtu.be/')>=0)
{

  return   mySubString = str.substring(
    str.lastIndexOf("/") + 1, 
    str.indexOf("&")==-1?str.length:str.indexOf("&")
  );

}
//return str.toLowerCase().substr('https://youtu.be/','');


return '';

}





    constructor(props) {
        super(props);
        showFwdCntrl=false;
        qrcode=this.props.navigation.state.params.qrCode;
        file='';
        audioSelect=-1;
        videoSelect=-1;
        if(qrcode=='Colors.mp3')
        {file=colors;
         // audioSelect=0;
        }
        if(qrcode=='Hidden_in_Your_Heart.mp3')
      {  file=colors1;
      //  audioSelect=1;
       } if(qrcode=='Hopscotch.mp3')
       {//audioSelect=2;
          file=colors2;
       }if(qrcode=='Lincoln.mp3')
        {//audioSelect=3;
          file=colors3;
        }if(qrcode=='Learn.m4v')
        {//videoSelect=0;
          file=colors4;
        }if(qrcode=='The_Life_&_Times_of_a_Contortionist.m4v')
        {//videoSelect=1;
          file=colors5;
        }
        if(qrcode=='All.mp3')
        {audioSelect=0;
          file=colors;
          showFwdCntrl=true;
        }
        if(qrcode=='All.m4v')
        {videoSelect=0;
          file=colors4;
          showFwdCntrl=true;
        }




//alert(qrcode);
//return ;
        
      that=this;

      if(file=='')
      qrcode=this.getYoutubeVideoID(qrcode);
    //  alert(qrcode);
      if(qrcode=='')
      {
       
        Alert.alert(
          'Alert 🔎',
          'No Audio/Video found..🔎',
          [
           
            {text: 'OK', onPress: () => {
              this.props.navigation.state.params.close()
              this.props.navigation.goBack();
          
          }
          
          },
          ],
          { cancelable: false }
        )
        
       

      }

      this.state = {
        qrcode:qrcode,
        file:file,
        audio:{
          0:colors,
          1:colors1,
          2:colors2,
          3:colors3,
        },
        video:{
          0:colors4,
          1:colors5
        },
        audioSelect:audioSelect,
        videoSelect:videoSelect,
        showFwdCntrl:showFwdCntrl
     }
       
    }

    render () {

        return (

          <View  style={[styles.container]}>
          { (this.state.file=='') &&
          <View  style={[styles.container,{backgroundColor:'black',alignContent:'center',alignItems:'center'}]}>
         <TouchableOpacity onPress={this.handleBackButton} style={{position:'absolute',top:40,left:20,height:30,width:30}}>
         <Image source={require('../../../assets/images/back.png')}
          style={{height:20,resizeMode:'contain'}}
          />
    </TouchableOpacity>

          
 {this.state.qrcode!='' &&
 <YouTube
apiKey="AIzaSyCZs5LGQYP8EL8uQvvpO6SA-cFZs8kHw30"
  videoId={this.state.qrcode} // The YouTube video ID
  play={true}             // control playback of video with true/false
  fullscreen={true}       // control whether the video should play in fullscreen or inline
  loop={true}             // control whether the video should loop when ended
//  controls={2}
  showFullscreenButton={true}
  onReady={e => this.setState({ isReady: true })}
  onChangeState={e => this.setState({ status: e.state })}
  onChangeQuality={e => this.setState({ quality: e.quality })}
  onError={e => this.setState({ error: e.error })}
  modestbranding={true}
  style={{ alignSelf: 'stretch', height: 300,marginTop:height/2-150 ,marginBottom: 100, }}
/>
 }
</View>
          }

     
            {this.state.file!='' && 
           
              <View  style={styles.container}>
                {this.state.qrcode.indexOf('mp3')>0 &&
                 <View  style={styles.Mp3Image}>
               <Image
         
             style={{
         
           height:100,
           resizeMode:'contain',
          
        }}
         source={bg_img}
        />
                </View> }
            <VideoPlayer source={this.state.file}  // Can be a URL or a local file.
              ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       onBuffer={this.onBuffer}  
       paused={this.state.paused}
       onBack={()=>{   this.props.navigation.state.params.close()
        this.props.navigation.goBack();}}
       onEnd={()=>{

   
      this.setState({file:colors5});
       this.player.seekTo(0);
       
     
      }}

      onPlayNext={()=>{
    if(this.state.audioSelect!=-1)
    {

var temp = this.state.audioSelect;

if(this.state.audio[++temp])
{
  
  this.player.paused=true;
  this.setState({file:this.state.audio[temp],audioSelect:temp});
  this.player.seekTo(0);
  this.player.paused=false;
}
    }
  
else if(this.state.videoSelect!=-1)
    {
      var temp = this.state.videoSelect;
      if(this.state.video[++temp])
      {
        
        this.player.paused=true;
        this.setState({file:this.state.video[temp],videoSelect:temp});
        this.player.seekTo(0);
        this.player.paused=false;


      }
  
    }
    
        }}

        onPlayPrevious={()=>{
             
          if(this.state.audioSelect!=-1)
          {
      
      var temp = this.state.audioSelect;
      
      if(this.state.audio[--temp])
      {
        
        this.player.paused=true;
        this.setState({file:this.state.audio[temp],audioSelect:temp});
        this.player.seekTo(0);
        this.player.paused=false;
      }
          }
        
      else if(this.state.videoSelect!=-1)
          {
            var temp = this.state.videoSelect;
            if(this.state.video[--temp])
            {
              
              this.player.paused=true;
              this.setState({file:this.state.video[temp],videoSelect:temp});
              this.player.seekTo(0);
              this.player.paused=false;
      
      
            }
        
          }
                   
                 
                  }}

                  showFwdCntrl={this.state.showFwdCntrl}
         
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
  Mp3Image: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'white',
   // backgroudColor:'white'
   zIndex:4,
   marginTop: '25%',
   marginBottom:'25%' ,
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
   
   // margin:50
    
  },
});


