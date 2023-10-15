import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { useContext } from 'react'
import { TriviaContext } from '../../App'
import { Button } from 'react-native-paper'

const LevelBtn = ({level,proceed,title}) => {
    const {appTheme} = useContext(TriviaContext);
    const [selectBtn,setSelectBtn] = useState('');

  
  // setInterval(() => {
  //   setSelectBtn('');

  // }, 1500);
    

  return (
    <Button
       buttonColor={selectBtn ? 'green' :  appTheme }
       textColor='white'
       style={{borderRadius:10,minWidth:'55%',margin:10}}
       labelStyle={{fontSize:17}}
      //  onPressOut={() => setSelectBtn('pressed')}
       onPress={() =>
        {
          setSelectBtn('pressed') 
          proceed(level,title)
          setInterval(() => setSelectBtn(''),2000);
        }

        }
       >
        {title}
       </Button>
  )
}

export default LevelBtn

const styles = StyleSheet.create({})