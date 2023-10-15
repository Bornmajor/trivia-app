import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/styles'
import { Pressable } from 'react-native'
import { useContext } from 'react'
import { TriviaContext } from '../../App'
import { AntDesign } from '@expo/vector-icons';

const AnswerCard = ({answer,proceed,correct_answer,generateQuiz,quiz,showAnswer}) => {
    const {decodeBase64,autoQuiz} = useContext(TriviaContext);
    const [newBackgrnd,setNewBackgrnd] = useState('white');
    const [tickState,setTickState] = useState('none')

   useEffect(()=>{
    setNewBackgrnd('white');
    setTickState('none')
   // console.log('changed');
   },[quiz])

   useEffect(()=>{
    if(showAnswer == true){
      setTickState('flex')
    }
   },[showAnswer])
   
    const checkIfCorrect = () =>{
      if(answer !== correct_answer){
        setNewBackgrnd('#cdcdcd');

      }else{
        setTickState('flex');
        //regenerate quiz if correct
       
          generateQuiz()
     

        ;
      }
    }
  return (
    <Pressable style={[styles.answerCard,{backgroundColor:newBackgrnd}]} 
    onPress={() =>
    {
     proceed(answer)
     checkIfCorrect()
    }
    }
     >
      <AntDesign name="checkcircle" size={30} color="green" style={{marginHorizontal:5,display:tickState}}/>
      <Text style={{color:'black',textAlign:'center'}}>{decodeBase64(answer)}</Text>
    </Pressable>
  )
}

export default AnswerCard

