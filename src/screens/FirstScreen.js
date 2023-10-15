import {Text, View,ScrollView } from 'react-native'
import React,{useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper'
import { useContext } from 'react'
import { TriviaContext } from '../../App'
import { styles } from '../styles/styles'
import { Image } from 'react-native';

const FirstScreen = ({setScreenStat}) =>{
    const {appTheme} = useContext(TriviaContext);

    // const storeData = async (value) => {
    //     try {
    //       await AsyncStorage.setItem('welcome-status', value);
    //     } catch (e) {
    //       // saving error
    //     }
    //   };

    //  const setOpenStat = async() =>{
    //  await storeData('false');   
    //  setOpenFirstTime(false);
    //  }

    return(
    <ScrollView contentContainerStyle={styles.container}>
    <Text style={[styles.heading,{marginVertical:15}]}>Trivia Questions App</Text>
    <Image source={require('../../assets/welcome.png')} style={{width:'100%',height:'70%'}} />

    <Button
    buttonColor={appTheme}
    textColor='white'
    style={{borderRadius:10,fontSize:20}}
    onPress={() => setScreenStat('level')}
    >
    Get started
    </Button>

  </ScrollView>  
    )
    
}

export default FirstScreen
