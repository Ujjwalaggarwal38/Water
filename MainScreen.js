import { StyleSheet,View,ImageBackground,Button,TouchableOpacity,Text } from 'react-native'
import React from 'react'

const MainScreen = ({navigation}) => {
  return (
    <ImageBackground
    source={ require('../images/mainscreen.png')} 
    style={styles.background}
    resizeMode=""
  >

<View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
   
    </ImageBackground>
  )
}

export default MainScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container:{
        flex:1,
        justifyContent:'flex-end',
        marginBottom:50,
      },
      button: {
        backgroundColor: '#A8CF45', 
        paddingVertical: 10,
        paddingHorizontal: 35,
        textAlign:'center',
        borderRadius: 8,
      },
      buttonText: {
        fontSize: 23,
        color: '#fff',
        textTransform: 'capitalize', 
      },
})