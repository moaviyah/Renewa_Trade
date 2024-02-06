import React, {useEffect} from 'react';
import { StyleSheet, Text, Image, View, Dimensions } from 'react-native';
import { PRIMARY, SECONDARY } from '../colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Splash = ({navigation}) => {

    useEffect(() => {
        const timer = setTimeout(()=>{
            navigation.navigate('SignIn');
        }, 2000)
    
      return () => {
        clearTimeout(timer)
      }
    }, [])
    
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Pakistan's Largest Marketplace</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: PRIMARY,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius:15,
    marginTop:height * 0.2
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color:SECONDARY
  },
});

export default Splash;