import React from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, StatusBar } from 'react-native';

const Layout = ({children, style}) => {

  return (
    <ImageBackground source={require('../assets/images/background.png')} resizeMode='cover'
                     style={styles.backgroundImage}>
      <SafeAreaView style={[styles.container, style]}>
        <StatusBar backgroundColor="transparent"/>
        {children}
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  backgroundImage: {
    flex: 1,
  },
})

export default Layout;
