import React from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, Platform, StatusBar, View } from 'react-native';

const Layout = ({children, style}) => {

  return (
    <ImageBackground source={require('../../assets/images/background.png')} resizeMode='cover'
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
    paddingVertical: Platform.OS === "android" ? 20 : 0,
    marginHorizontal: 10,
  },
  backgroundImage: {
    flex: 1,
  },
})

export default Layout;
