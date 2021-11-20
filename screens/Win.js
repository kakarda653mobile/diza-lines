import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';

import Layout from './Layout'
import image from '../assets/images/win_image.png'
import { Next } from '../components/shared/GameButtons'

const Win = ({navigation, route}) => {

  const handleGoBack = () => {
    navigation.navigate('Main', {isPlaying: true})
  }
  return (
    <Layout style={styles.layout}>
      <Image
        source={image}
        style={styles.image}/>
      <Text style={styles.text}>{route.params?.name}</Text>
      <View style={styles.nextButtonContainer}>
        <Next onPress={handleGoBack}/>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '60%',
    resizeMode: 'contain'
  },
  text: {
    position: 'relative',
    top: '-20%',
    color: 'white',
    fontSize: 55,
    textShadowRadius: 10,
    textShadowColor: 'black',
    fontFamily: "OPTIBlast"
  },
  nextButtonContainer: {
    width: '100%',
    marginTop: 40
  }
})

export default Win;
