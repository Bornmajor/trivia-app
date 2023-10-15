import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNav from './src/navigation/StackNav';
import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { btoa, atob } from 'react-native-quick-base64';

export const TriviaContext = createContext();

export default function App() {
  const [appTheme,setAppTheme] = useState('#FF5733');
  const [openFirstTime,setOpenFirstTime] = useState('false');
  const [gameLevel,setGameLevel] = useState('');
  const [quizType,setQuizType] = useState('');
  const [categoryType,setCategoryType] = useState('');
  const [autoQuiz,setAutoQuiz] = useState();
  

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('welcome-status');
      if (value !== null) {
        // value previously stored
        setOpenFirstTime(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const decodeBase64 = (base64String) => {
    try {
      const decodedString = atob(base64String);
      return decodedString;
    } catch (error) {
      console.error('Error decoding base64: ', error);
      return null;
    }
  };
  useEffect(()=>{
    getData();

  },[])
  
  return (
    <TriviaContext.Provider value={{appTheme,
    setAppTheme,decodeBase64,
    openFirstTime,setOpenFirstTime,
    gameLevel,setGameLevel,
    quizType,setQuizType,
    categoryType,setCategoryType,
    autoQuiz,setAutoQuiz
    }}>
       <StackNav />
    </TriviaContext.Provider>
   
  );
}

