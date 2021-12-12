import React, { useContext, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Layout from '../components/shared/Layout'
import {
  RoundTimeLimit as RoundTimeLimitButton,
  GameRules as GameRulesButton,
  Back as BackButton
} from '../components/shared/GameButtons'

import clock from '../assets/images/clock_original.png'
import clock1 from '../assets/images/segment_original_1.png'
import clock2 from '../assets/images/segment_original_2.png'
import clock3 from '../assets/images/segment_original_3.png'
import clock4 from '../assets/images/segment_original_4.png'
import clock5 from '../assets/images/segment_original_5.png'
import clock6 from '../assets/images/segment_original_6.png'
import clock7 from '../assets/images/segment_original_7.png'
import clock8 from '../assets/images/segment_original_8.png'
import leftArrow from '../assets/images/left_arrow_selected_time.png'
import rules from '../assets/images/rules_background.png'
import { Context } from "../App";

const Settings = ({navigation}) => {

  const [context, setContext] = useContext(Context);
  const {settings: {roundTime}} = useMemo(() => context, [context])


  const [selectedTime, setSelectedTime] = useState(roundTime / 60)
  const [layout, setLayout] = useState({height: 0, width: 0})

  const handleSelectionMove = (x, y) => {
    // TODO rewrite with a shorter logic

    const clockCenter = {x: layout.width / 2, y: layout.height / 2}

    if (y < clockCenter.y && Math.abs(x - clockCenter.x) < 20) {
      return setSelectedTime(0)
    }
    if (x > clockCenter.x) {
      if (y > clockCenter.y) {
        if (y - clockCenter.y > x - clockCenter.x) {
          setSelectedTime(4)
        } else {
          setSelectedTime(3)
        }
      } else {
        if (clockCenter.y - y > x - clockCenter.x) {
          setSelectedTime(1)
        } else {
          setSelectedTime(2)
        }
      }
    } else {
      if (y > clockCenter.y) {
        if (y - clockCenter.y > clockCenter.x - x) {
          setSelectedTime(5)
        } else {
          setSelectedTime(6)
        }
      } else {
        if (clockCenter.y - y > clockCenter.x - x) {
          setSelectedTime(8)
        } else {
          setSelectedTime(7)
        }
      }
    }
  }

  const onLayout = (event) => {
    const {height, width} = event.nativeEvent.layout
    setLayout({height, width})
  }

  const selectClock = useMemo(() => {
    switch (selectedTime) {
      case 0:
        return clock
      case 1:
        return clock1
      case 2:
        return clock2
      case 3:
        return clock3
      case 4:
        return clock4
      case 5:
        return clock5
      case 6:
        return clock6
      case 7:
        return clock7
      case 8:
        return clock8
    }
  }, [selectedTime])

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

  const handleGameRulesPress = () => {
    navigation.navigate('Rules')
  }

  return (
    <Layout style={styles.layout}>
      <View style={styles.topBarContainer}>
        <BackButton onPress={handleBackButtonTouch}/>
      </View>
      <View style={styles.blockContainer}>
        <View style={styles.buttonContainer}>
          <RoundTimeLimitButton/>
        </View>
        <View style={styles.container}
              onLayout={onLayout}
              onStartShouldSetResponder={() => true}
              onResponderMove={(event) => {
                handleSelectionMove(event.nativeEvent.locationX, event.nativeEvent.locationY)
              }}
              onResponderRelease={handleSelectionFinished}
        >
          <Image source={selectClock} style={styles.clock} resizeMode='contain'/>
        </View>
        <View style={styles.selectedTimeContainer}>
          <View style={styles.arrowContainer}>
            <Image source={leftArrow} style={styles.arrow} resizeMode='contain'/>
          </View>
          <Text style={styles.selectedTimeText}>{selectedTime || 'Безлимит'}</Text>
          <View style={styles.arrowContainer}>
            <Image source={leftArrow} style={[styles.arrow, styles.rightArrow]} resizeMode='contain'/>
          </View>
        </View>
      </View>
      <View style={styles.space}/>
      <View style={styles.blockContainer}>
        <GameRulesButton onPress={handleGameRulesPress}/>
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
    display: 'flex',
    // borderWidth: 1
  },
  topBarContainer: {
    width: '20%',
    alignSelf: 'flex-end',
    // borderWidth: 1
  },
  blockContainer: {
    flex: 1,
    width: '70%',
    flexDirection: 'column',
    // borderWidth: 1
  },
  buttonContainer: {
    height: 50,
    // borderWidth: 1
  },
  container: {
    flex: 1,
    // borderWidth: 1

  },
  space: {
    height: 40
  },
  clock: {
    width: '100%',
    height: '100%',
    // borderWidth: 1
  },
  selectedTimeContainer: {
    flexDirection: "row",
    height: 30,
    // borderWidth: 1
  },
  selectedTimeText: {
    color: '#af1010',
    fontFamily: 'Calibri-Bold',
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 30,
    textTransform: 'uppercase',
    marginHorizontal: 10,
  },
  arrowContainer: {
    flex: 1,
    // borderWidth: 1
  },
  arrow: {
    width: undefined,
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'flex-start',
  },
  rightArrow: {
    transform: [{rotate: '180deg'}],
    alignSelf: 'flex-end'
  }
})

export default Settings;
