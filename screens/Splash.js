import React from 'react';
import { StyleSheet, Image } from 'react-native';

import Layout from '../components/shared/Layout'
import image from '../assets/images/loading_logo.gif'

const Win = () => {
  return (
    <Layout style={styles.layout}>
      <Image
        source={image}
        style={styles.image}/>
    </Layout>
  )
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    resizeMode: 'contain'
  },
})

export default Win;
