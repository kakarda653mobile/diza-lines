import React, { useContext, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

import Layout from './Layout'
import { RoundTimeLimit, Rules, Back } from '../components/shared/GameButtons'

import clock from '../assets/images/clock.png'
import leftArrow from '../assets/images/left_arrow_selected_time.png'
import rules from '../assets/images/rules_background.png'
import { Context } from "../App";

// TODO make a calculation of center
const CLOCK_CENTER = {x: 125, y: 360}

const Settings = ({navigation}) => {

  const [context, setContext] = useContext(Context);
  const {settings: {roundTime}} = useMemo(() => context, [context])


  const [selectedTime, setSelectedTime] = useState(roundTime / 60)

  const handleSelectionMove = (x, y) => {
    // TODO rewrite with a shorter logic

    if (y < CLOCK_CENTER.y && Math.abs(x - CLOCK_CENTER.x) < 20) {
      return setSelectedTime(0)
    }
    if (x > CLOCK_CENTER.x) {
      if (y > CLOCK_CENTER.y) {
        if (y - CLOCK_CENTER.y > x - CLOCK_CENTER.x) {
          setSelectedTime(4)
        } else {
          setSelectedTime(3)
        }
      } else {
        if (CLOCK_CENTER.y - y > x - CLOCK_CENTER.x) {
          setSelectedTime(1)
        } else {
          setSelectedTime(2)
        }
      }
    } else {
      if (y > CLOCK_CENTER.y) {
        if (y - CLOCK_CENTER.y > CLOCK_CENTER.x - x) {
          setSelectedTime(5)
        } else {
          setSelectedTime(6)
        }
      } else {
        if (CLOCK_CENTER.y - y > CLOCK_CENTER.x - x) {
          setSelectedTime(8)
        } else {
          setSelectedTime(7)
        }
      }
    }
  }

  const handleSelectionFinished = () => {
    const newContext = {
      ...context,
      settings: {
        roundTime: selectedTime * 60
      }
    }
    setContext(newContext)
  }

  const handleBackButtonTouch = () => {
    navigation.goBack()
  }

  return (
    <Layout style={styles.layout}>
      <View style={styles.topBarContainer}>
        <Back onPress={handleBackButtonTouch}/>
      </View>
      <View style={styles.blockContainer}>
        <RoundTimeLimit/>
        <View style={styles.container}
              onStartShouldSetResponder={() => true}
              onResponderMove={(event) => {
                handleSelectionMove(event.nativeEvent.locationX, event.nativeEvent.locationY)
              }}
              onResponderRelease={handleSelectionFinished}
        >
          <Image source={clock} style={styles.clock} resizeMode='contain'/>
        </View>
        <View style={styles.selectedTimeContainer}>
          <View style={styles.arrowContainer}>
            <Image source={leftArrow} style={styles.arrow} resizeMode='cover'/>
          </View>
          <Text style={styles.selectedTimeText}>{selectedTime || 'Безлимит'}</Text>
          <View style={styles.arrowContainer}>
            <Image source={leftArrow} style={[styles.arrow, styles.rightArrow]} resizeMode='cover'/>
          </View>
        </View>
      </View>
      <View style={styles.space}/>
      <View style={styles.blockContainer}>
        <Rules/>
        <TouchableOpacity style={styles.container}>
          <Image source={rules} style={styles.clock} resizeMode='contain'/>
        </TouchableOpacity>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarContainer: {
    height: 50,
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 30
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  space: {
    height: 40
  },
  clock: {
    width: '100%'
  },
  blockContainer: {
    flex: 1,
    width: '70%',
    // borderWidth: 2
  },
  selectedTimeContainer: {
    flexDirection: "row",
    height: 30,
  },
  selectedTimeText: {
    color: '#af1010',
    fontFamily: 'Calibri-Bold',
    textAlign: 'center',
    fontSize: 30,
    textTransform: 'uppercase',
    marginHorizontal: 10
  },
  arrowContainer: {
    flex: 1
  },
  arrow: {
    width: undefined,
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'flex-end',
  },
  rightArrow: {
    transform: [{rotate: '180deg'}],
    alignSelf: 'flex-start'
  }
})

export default Settings;
