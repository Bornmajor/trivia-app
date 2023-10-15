import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    heading:{
        fontSize:20,
        fontWeight:'600',
        
    },
    card:{
        margin:10,
        borderRadius:15,
        padding:20,
        backgroundColor: '#FF5733',
        alignItems:'center',
        minHeight:450
        
    },
    answerCard:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        margin:10,
        borderRadius:10,
        // width:'100%',
    }
})

export  {styles}

