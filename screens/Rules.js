import React, {useContext, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Layout from '../components/shared/Layout'

const Rules = ({navigation}) => {
    return (
        <Layout style={styles.layout}>
          <Text>Правила игры</Text>
        </Layout>
    )
}

const styles = StyleSheet.create({})

export default Rules;
