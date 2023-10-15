import { StyleSheet, Text, View,Alert } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button,Switch, RadioButton } from 'react-native-paper';
import { useContext } from 'react';
import { TriviaContext } from '../../App';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';



const SettingScreen = () => {

  const {appTheme,
    autoQuiz,setAutoQuiz,
    gameLevel,setGameLevel,
    quizType,setQuizType,
    setOpenFirstTime
  } = useContext(TriviaContext)
 // const [isSwitchOn, setIsSwitchOn] = React.useState(false);
 const [value, setValue] = React.useState('first');


  const onToggleSwitch = () => {
    setAutoQuiz(!autoQuiz);
     updateAutoQuiz(autoQuiz);
  };

  const verificationMsg = () =>
  Alert.alert('Confirmation','Your about to reset your setting ?Do wish to proceed', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => resetApp()},
  ]);

  const updateAutoQuiz = async(autoQuiz) =>{
    try {
      await AsyncStorage.setItem('auto-quiz', `${autoQuiz}`);
    } catch (e) {
      // saving error
    }
  }

    const resetApp = async () => {
        try {
          await AsyncStorage.setItem('welcome-status','true');
          setOpenFirstTime('true');
        } catch (e) {
          // saving error
        }
      };

      const saveQuizConfig = async() =>{
        try {
          await AsyncStorage.setItem('game-level',gameLevel);
          await AsyncStorage.setItem('quiz-type',quizType);
          await AsyncStorage.setItem('auto-quiz',`${autoQuiz}`);
          
        } catch (e) {
          // saving error
          console.log(e);
        }
      }
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('auto-quiz');
          if (value !== null) {
            console.log('auto quiz:'+value)
            // value previously stored
          }
        } catch (e) {
          // error reading value
        }
      };

      useEffect(()=>{
        getData();
      },[autoQuiz])

      useEffect(()=>{
        saveQuizConfig();
        console.log('Saved settings');
      },[quizType],[gameLevel],[autoQuiz])

  return (
    <ScrollView contentContainerStyle={styles.container} >
     
     {/* <View style={[styles.groupContainer]}>
      <Text>Auto generate quiz after correct attempt</Text>
      
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Switch 
      value={autoQuiz} 
      onValueChange={onToggleSwitch} 
      color={appTheme}
      />
       <Text>({autoQuiz == true ? 'on' : 'off'})</Text> 
      </View>
    

     </View> */}


     <View style={styles.groupContainer}>
         <Text style={styles.title} >Level difficulty</Text>
     <RadioButton.Group onValueChange={newValue => setGameLevel(newValue)} value={gameLevel}>
      <View style={{flexDirection:'row'}}>
        <View style={{margin:5}}>
        <Text>Easy</Text>
        <RadioButton value="easy" color={appTheme}/>
       </View>

      <View style={{margin:5}}>
        <Text>Medium</Text>
        <RadioButton value="medium" color={appTheme} />
      </View>

      <View style={{margin:5}}>
        <Text>Hard</Text>
        <RadioButton value="hard" color={appTheme} />
      </View>

      </View>
     
    </RadioButton.Group>

     </View>

     <View style={styles.groupContainer}>
         <Text style={styles.title} >Type of quiz</Text>
     <RadioButton.Group onValueChange={newValue => setQuizType(newValue)} 
     value={quizType}
     
     >
      <View style={{flexDirection:'row'}}>

      <View style={{margin:5}}>
        <Text>Both</Text>
        <RadioButton  value="both"  color={appTheme}/>
       </View>


        <View style={{margin:5}}>
        <Text>Multi-choice</Text>
        <RadioButton value="multiple" color={appTheme} />
       </View>

      <View style={{margin:5}}>
        <Text>True/false (Boolean)</Text>
        <RadioButton value="boolean"  color={appTheme} />
      </View>



      </View>
     
    </RadioButton.Group>

     </View>
   
     
    
   

      <Button 
      buttonColor='red'
      textColor='white'
      onPress={() => verificationMsg()}
      style={{marginTop:30}}
      >Reset data
      </Button>

    </ScrollView>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container:{
    margin:20
  },
  groupContainer:{
    backgroundColor:'#e2e3e5',
    padding:10,
    borderRadius:10,
    marginVertical:10
  },
  title:{
    fontSize:20,
    fontWeight:'600'
  }
})