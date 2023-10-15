import {Text, View,ScrollView } from 'react-native'
import React from 'react'
import { styles } from '../styles/styles'
import { useContext } from 'react'
import { TriviaContext } from '../../App'
import LevelBtn from '../components/LevelBtn'
import AsyncStorage from '@react-native-async-storage/async-storage';

const TypeScreen = ({setScreenStat}) => {
  
  const {setQuizType,setOpenFirstTime,quizType,gameLevel} = useContext(TriviaContext);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('welcome-status', value);
    } catch (e) {
      // saving error
    }
  };

 const setOpenStat = async() =>{
 await storeData('false');   
 setOpenFirstTime(false);
 }

 const quizConfigData = async (level) => {
  try {
    await AsyncStorage.setItem('quiz-type',level);
    await AsyncStorage.setItem('game-level',gameLevel);
    await AsyncStorage.setItem('auto-quiz','false');
    
  } catch (e) {
    // saving error
    console.log(e);
  }
};


  const proceed = async(level) =>{
    await setQuizType(level);
    console.log(`Type: ${level}`);
  
   
    setOpenStat();
    quizConfigData(level);
    
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.heading,{marginBottom:20}]}>Select type of questions</Text>

      <LevelBtn level='multiple' title='Multi-choice' proceed={proceed}/>
      <LevelBtn level='boolean' title='True/False' proceed={proceed}/>
      <LevelBtn level='both' title='Both' proceed={proceed}/>

    </ScrollView>
  )
}

export default TypeScreen

