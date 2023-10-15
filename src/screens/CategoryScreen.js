import { StyleSheet, Text,ScrollView } from 'react-native'
import React,{useState} from 'react'
import { styles } from '../styles/styles'


const CategoryScreen = () => {
   

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Which type of trivia quiz would like?</Text>


    </ScrollView>
  )
}

export default CategoryScreen
