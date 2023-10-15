import { StyleSheet, Text, View,ScrollView,Pressable } from 'react-native'
import React,{useState} from 'react'
import opentdb from '../api/opentdb';
import { TriviaContext } from '../../App';
import { useContext } from 'react';
import { styles } from '../styles/styles';
import { useEffect } from 'react';
import { Button, } from 'react-native-paper';
import AnswerCard from '../components/AnswerCard';
import { FlatList } from 'react-native';
import Loader from '../components/Loader';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const QuizScreen = ({route}) => {
  const {cat_id,title} =  route.params;
  const {appTheme,gameLevel,setGameLevel,quizType,decodeBase64} = useContext(TriviaContext);
  const [quiz,setQuiz] = useState();
  const [answers,setAnswers] = useState([]);
  const [session,setSession] = useState();
  const [resultState,setResultState] = useState('');
  const [attempt,setAttempt] = useState(0);
  const [correctQuiz,setCorrectQuiz] = useState(0);
  const [performance,setPerformance] = useState('');
  const [showAnswer,setShowAnswer] = useState(false);
  const navigation = useNavigation();

  // const [amount,setAmount] = useState(1);

   const generateSession = async() =>{
    try{
    let response = await opentdb.get(`api_token.php?command=request`);
    setSession(response.data.token);
    console.log(response.data);
    generateQuiz();
    setResultState('ok')
    }catch(err){
      console.log(err);
    }
   }

   const regenerateSession = async() =>{
    try{
      let response = await opentdb.get(`api_token.php?command=request`);
      setSession(response.data.token);
      console.log(response.data);

      if(gameLevel == 'easy'){
        setGameLevel('medium')
      }else if(gameLevel == 'medium'){
        setGameLevel('hard')
      }


      
      }catch(err){
        console.log(err);
      }
   }
  const generateQuiz =  async () =>{

    let type ;
    if(quizType == 'both'){
      type = '';
    }else{
      type = `&type=${quizType}`
    }

    try{
      let response = await opentdb.get(`api.php?amount=1&category=${cat_id}&difficulty=${gameLevel}${type}&encode=base64&token=${session}`);
      console.log(`api.php?amount=1&category=${cat_id}&difficulty=${gameLevel}${type}&encode=base64&token=${session}`)
      setQuiz(response.data.results[0]);
       console.log(response.data.response_code);

       if(response.data.response_code == 4){
        //regenerate session id if question to prevent repetition
        regenerateSession();
       
       }else{
        
      setAnswers(response.data.results[0].incorrect_answers);
      setAnswers((prevState)=>{
        const newState = [...prevState]
        newState.push(response.data.results[0].correct_answer);
        return newState.sort();
      });
     
       }




    }catch(err){
       console.log(err);
    }
  }

useEffect(()=>{
  console.log(quizType);
     navigation.setOptions({
      title: title,
      headerRight:()=>(
        <Pressable style={{margin:10}} onPress={() => navigation.navigate('setting')}>
          <Ionicons name="settings" size={30} color="white" />
        </Pressable>
      )
     })
  },[])



  useEffect(()=>{
    //generate session token ones category is set
    generateSession();
     console.log(answers);
  },[resultState])

  useEffect(()=>{
    //generate new quiz if quizType changes
    generateQuiz();
  },[quizType])

  useEffect(()=>{
      //generate new quiz if quizlevel changes
    generateQuiz();
  },[gameLevel])

  const proceed = (usr_ans) =>{
    setAttempt(attempt+1);
 
  if(usr_ans == quiz.correct_answer){
    // console.log('correct'); 
    setCorrectQuiz(correctQuiz+1);
  }else{
    // console.log('incorrect')
  }
  ratings();
  }

  const ratings = () =>{
    
    let rate =  parseInt(correctQuiz/attempt * 100) ;
    // console.log(`User ratings ${rate}`)
  if(rate  <= 25){
    setPerformance('Fair')
  }else if(rate >= 26 && rate <= 50 ){
    setPerformance('Good');
  }else if(rate  >= 51 && rate <= 75){
    setPerformance('Very Good');
  }else if(rate  >= 76 && rate <= 99){
    setPerformance('Keep it up');
  }else {
    setPerformance('Easy peasy');
  }

  }
  
 

  return (
    <ScrollView contentContainerStyle={{flex:1}}>

      {/* <Text>{cat_id}</Text> */}
  <ScrollView contentContainerStyle={{justifyContent:'center'}}>

<View style={{flexDirection:'row'}}>
{gameLevel || quizType ?
<View style={{marginHorizontal:20,marginVertical:10}}>
    <Text >Difficulty : {gameLevel} </Text>
    <Text >Quiz type : {quizType == 'boolean' ? 'True/false' : quizType}</Text> 
</View>
: null}

{attempt || correctQuiz? 
  <View style={{marginHorizontal:20,marginVertical:10}}>
    <Text >Attempted : {attempt} </Text>
    <Text>Correct : {correctQuiz}</Text> 
</View>
:
null
}  
</View>

{attempt > 2 && performance ?
<View style={{flexDirection:'row',alignItems:'center',marginHorizontal:20,marginVertical:2}}>
<AntDesign name="star" size={18}  color={appTheme} /> 
<Text style={{marginHorizontal:10}}>{performance}</Text>  
</View>
: null
}

  
{resultState ? 
<View style={styles.card}>

<Text style={{fontSize:22,color:'white',textAlign:'center',marginVertical:10}}>{decodeBase64(quiz?.question)}</Text>

{quiz ?
<FlatList 
contentContainerStyle={{marginVertical:10}}
style={{width:'100%'}}
data={answers}
keyExtractor={(item,index) => index.toString()}
renderItem={({item}) =>{
   return(
   <AnswerCard answer={item} 
   proceed={proceed} 
   quiz={quiz}
   correct_answer={quiz?.correct_answer} 
   showAnswer={() => showAnswer()}
   generateQuiz={() => generateQuiz()}
   /> 

   )
}}
/> 
: 
<Button textColor='white' 
  buttonColor='green' 
  style={{borderRadius:10,margin:5}}
  onPress={() => { 
    regenerateSession() }}>
  Questions exhausted upgrade level
  </Button>
}



{quiz &&

<Button textColor='white' 
  buttonColor='green' 
  style={{borderRadius:10,margin:5}}
  onPress={() => { 
    setShowAnswer(true);
    generateQuiz() 
  setAttempt(attempt+1) }}>
  Next 
  </Button>
}


</View>

: <Loader process={() => generateQuiz()}/>}




</ScrollView>

     

    </ScrollView>
  )
}

export default QuizScreen

