import {Text,ScrollView } from 'react-native'
import React from 'react'
import { styles } from '../styles/styles'
import { Button } from 'react-native-paper'
import { useContext } from 'react'
import { TriviaContext } from '../../App'
import LevelBtn from '../components/LevelBtn'

const LevelScreen = ({setScreenStat}) => {
  const {setGameLevel} = useContext(TriviaContext);


  const proceed = async(level) =>{
  await setGameLevel(level);
  console.log(`Level: ${level}`)
  setScreenStat('type');
  
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.heading,{marginBottom:20}]}>Choose level of difficulty? </Text>
     

     <LevelBtn level='easy' title='Easy' proceed={proceed}/>
     <LevelBtn level='medium' title='Medium' proceed={proceed}/>
     <LevelBtn level='hard' title='Hard' proceed={proceed}/>
     
     
    </ScrollView>
  )
}

export default LevelScreen
