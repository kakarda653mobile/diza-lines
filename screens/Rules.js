import React, { useContext, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

import Layout from '../components/shared/Layout'
import {
  Back as BackButton, GameRules as GameRulesButton,
  GameRulesFinished as GameRulesFinishedButton
} from "../components/shared/GameButtons";
import rulesImage from '../assets/images/rules_image.png'
import rule1 from '../assets/images/rule_1.png'
import rule2 from '../assets/images/rule_2.png'
import rule3 from '../assets/images/rule_3.png'
// import arrowDown from '../assets/images/arrow_down.png'
import { Context } from "../App";

const screenHeight = Dimensions.get('window').height;

const Rules = ({navigation}) => {

  const [context, setContext] = useContext(Context);
  const {redRules} = useMemo(() => context, [context])

  const scrollEl = useRef(null)

  const handleBackButtonTouch = () => {
    navigation.goBack()
  }

  const handleFinishReadingRulesPress = () => {
    setContext({...context, redRules: true})
    navigation.replace('Main')
  }

  const handleArrowDownPress = () => {
    console.log({screenHeight})
    scrollEl.current.scrollTo({y: screenHeight * 0.75})
  }

  return (
    <Layout>
      <View style={styles.topBarContainer}>
        <View style={styles.space}/>
        <View style={styles.gameButtonRulesContainer}>
          <GameRulesButton/>
        </View>
        <View style={styles.backButtonContainer}>
          {redRules && <BackButton onPress={handleBackButtonTouch}/>}
        </View>
      </View>
      <ScrollView contentContainerStyle={{alignItems: 'flex-start'}} ref={scrollEl}>
        <Text style={styles.textBlock}>
          {'    '}Игроки ходят по очереди.
          Ход заключается в выкладывании на игровое поле одной из 27 представленных фигур.
          Набор элементов один на обоих игроков
        </Text>
        <Image style={styles.image} source={rulesImage} resizeMode='contain'/>
        <Text style={styles.textBlock}>
          {'    '}Каждая фигура имеет уникальную комбинацию из 3 параметров:
          цвет, размер, форма.
        </Text>
        <Text style={styles.textBlock}>
          {'    '}Цель игры - первым собрать линию из 3 фигур,
          совпадающих по одному из 3-х параметров.
        </Text>
        <Text style={styles.textBlock}>
          {'    '}Тот кто первый ставит 3-ю фигуру в какой либо победной линии и
          становится победителем
        </Text>
        {/* <TouchableOpacity style={styles.imageArrowContainer} onPress={handleArrowDownPress}>
          <Image style={styles.imageArrow} source={arrowDown} resizeMode='contain'/>
        </TouchableOpacity> */}
        <Text style={[styles.textBlock, styles.textBlockCenter]}>
          Примеры победных комбинаций
          (победная линия из 3-х фигур выделена)
        </Text>
        <Image style={styles.image} source={rule1} resizeMode='contain'/>
        <Image style={styles.image} source={rule2} resizeMode='contain'/>
        <Image style={styles.image} source={rule3} resizeMode='contain'/>
        <View style={styles.gameRulesFinishedButtonContainer}>
          {!redRules && <GameRulesFinishedButton onPress={handleFinishReadingRulesPress}/>}
        </View>
      </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'flex-start',
    display: 'flex',
    // borderWidth: 1
  },
  topBarContainer: {
    flexDirection: 'row',
    width: '100%',
    // borderWidth: 1
  },
  space: {
    flex: 1
  },
  gameButtonRulesContainer: {
    flex: 3
  },
  backButtonContainer: {
    flex: 1
  },
  textBlock: {
    color: 'white',
    fontSize: 18,
    // borderWidth: 1
  },
  textBlockCenter: {
    textAlign: "center",
    alignSelf: 'center',
    width: '80%',
    marginTop: 20
  },
  image: {
    height: 300,
    width: '100%',
    marginVertical: 20,
    // borderWidth: 1,
  },
  imageArrowContainer: {
    height: 20,
    alignSelf: 'center',
    marginTop: 20,
    // borderWidth: 1
  },
  imageArrow: {
    flex: 1
  },
  gameRulesFinishedButtonContainer: {
    height: 50,
    width: '100%',
    // borderWidth: 1
  }
})

export default Rules;
