import React, { useState } from 'react'
import FirstScreen from './FirstScreen'
import CategoryScreen from './CategoryScreen'
import LevelScreen from './LevelScreen'
import TypeScreen from './TypeScreen'
import { createContext } from 'react'

export const WelcomeContext = createContext();

const WelcomeScreen = () => {
    
const [screenStat,setScreenStat] = useState('welcome');

  switch(screenStat) {
    case 'welcome':
    return <FirstScreen setScreenStat={setScreenStat}/> 
    break;
    case 'category':
    return <CategoryScreen setScreenStat={setScreenStat} />
    break;
    case 'level':
    return <LevelScreen  setScreenStat={setScreenStat}/>
    break;
    case 'type':
    return <TypeScreen setScreenStat={setScreenStat}/>
    break;
    default:
    return <FirstScreen setScreenStat={setScreenStat}/>
    
  }

}

export default WelcomeScreen

