import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { TriviaContext } from '../../App';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { styles } from '../styles/styles';
import LevelBtn from '../components/LevelBtn';
import opentdb from '../api/opentdb';
import { useState } from 'react';
import { FlatList } from 'react-native';
import Loader from '../components/Loader';

import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

   const {gameLevel,quizType,setGameLevel,setQuizType,setAutoQuiz} = useContext(TriviaContext);
   const [category,setCategory] = useState([]);
   const navigation = useNavigation();
   const [resultsState,setResultsState] = useState('');

    useEffect(()=>{
      console.log(gameLevel,quizType);

      navigation.setOptions({
        headerRight:()=>(
          <Pressable style={{margin:10}} onPress={() => navigation.navigate('setting')}>
            <Ionicons name="settings" size={30} color="white" />
          </Pressable>
        )
      })
    })
 
    const getQuizConfigData = async () => {
      try {
        const quiz_type = await AsyncStorage.getItem('quiz-type');
        const game_level = await AsyncStorage.getItem('game-level');
        const auto_quiz = await AsyncStorage.getItem('auto-quiz');

        if (quiz_type !== null || game_level !== null || auto_quiz !== null) {
          // value previously stored
          setGameLevel(game_level);
          setQuizType(quiz_type);
          setAutoQuiz(auto_quiz);

        }else{
          //reset app
        }
      } catch (e) {
        // error reading value
      }
    };
 

    useEffect(()=>{
     getCategory();
     getQuizConfigData(); 
    },[])

    const getCategory = async() =>{
      try{
      let response = await opentdb.get(`api_category.php`);
      setCategory(response.data.trivia_categories);
      setResultsState('ok');
      console.log('Called');
      //console.log(response.data)

      }catch(err){
        console.log(err)
      }
    }

    const proceed = (id,title) =>{

      navigation.navigate('quiz',{cat_id:id,title:title});
     
    }



  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.heading}>Choose category of questions</Text>


     {resultsState ? 
     <View style={{height:350}}>
        <FlatList 
      data={category}
      keyExtractor={item => item.id}
      renderItem={({item}) =>{
        return (
        <LevelBtn title={item.name} level={item.id} proceed={proceed}/>
        ) 
      }}
      />
    </View>
     : <Loader process={() => getCategory()}/>}
    
    
      

 

    </ScrollView>
  )
}

export default HomeScreen

