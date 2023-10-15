import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import HomeScreen from '../screens/HomeScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import SettingScreen from '../screens/SettingScreen'
import QuizScreen from '../screens/QuizScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useContext } from 'react'
import { TriviaContext } from '../../App'

const StackNav = () => {
    const {appTheme,openFirstTime,} = useContext(TriviaContext);

    const Stack = createStackNavigator();

    useEffect(()=>{
        console.log(openFirstTime);
    })

  return (
   <NavigationContainer>
     <Stack.Navigator >
        {openFirstTime == 'true' ?
        <Stack.Screen 
        name='welcome'
        component={WelcomeScreen}
        options={{
        title: '',
        headerShadowVisible:false ,
        headerStyle:{backgroundColor: '#f1f1f1'}  
        }}
        />
        : 
        <> 
         <Stack.Screen 
        name='home'
        component={HomeScreen}
        options={{
            title:'Trivia Quiz App',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: appTheme }
        }}
        />

        <Stack.Screen 
        name='setting'
        component={SettingScreen}
        options={{
          title:'Setting',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: appTheme }
        }}

        />
        <Stack.Screen 
        name='quiz'
        component={QuizScreen}
        options={{
          title:'Quiz',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: appTheme }
        }}
        />


        </>
     
        }
     
       
     </Stack.Navigator>
   </NavigationContainer>
  )
}

export default StackNav

