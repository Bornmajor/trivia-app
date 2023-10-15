import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import { TriviaContext } from '../../App'
import { styles } from '../styles/styles'

const QuizCard = ({quiz}) => {
    const {appTheme} = useContext(TriviaContext);
  return (
    <View style={{justifyContent:'center'}}>

    <View style={styles.card}>
     <Text style={{fontSize:20,color:'white',textAlign:'center'}}>{quiz}</Text>
    </View>

    
   
    </View>
  )
}

export default QuizCard

