import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import NetInfo from '@react-native-community/netinfo';
import { useState,useEffect } from 'react'

const Loader = ({process}) => {
    const [netState,setNetState] = useState('');
    
    useEffect(()=>{
        const unsubscribe = NetInfo.addEventListener(state => {
            //runs anytime there network change
           // console.log('Connection type', state.type);
           // console.log('Is connected?', state.isConnected);
            if(state.isConnected == false || state.isInternetReachable == false){
             setNetState('No internet');
            }else{
             setNetState('');
            }
            process();
          console.log(state.isInternetReachable)
        });
        },[])
    
  return (
    <View  style={styles.loader}>
      <ActivityIndicator size={100} color='black'/>
      <Text style={{fontSize:20,textAlign:'center'}}>{netState}</Text>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    loader:{
        alignItems:'center',
        justifyContent:'center',
        margin:10
    }
})