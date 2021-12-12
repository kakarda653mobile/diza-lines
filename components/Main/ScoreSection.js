import React, { useMemo, useState, useContext, useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Context } from "../../App";

const ScoreSection = ({selectedPlayer, onTimeIsUp, isPlaying}) => {

  const [{player1, player2, settings: {roundTime}}] = useContext(Context);

  const [myWidth, setMyWidth] = useState(0)
  const [timeLeft, setTimeLeft] = useState(roundTime)
  const [intervalId, setIntervalId] = useState(null)

  useEffect(() => {
    intervalId && clearInterval(intervalId)
    if (isPlaying && roundTime > 0) {
      setTimeLeft(roundTime)
      const id = setInterval(() => setTimeLeft(time => {
        if (time > 0) {
          return time - 1
        } else {
          clearInterval(intervalId)
          onTimeIsUp()
          return 0
        }
      }), 1000)
      setIntervalId(id)
    }
    return () => intervalId && clearInterval(intervalId)
  }, [selectedPlayer, isPlaying])

  const percentPassedCount = () => {
    const result = 100 - timeLeft / roundTime * 100
    return `${result}%`
  }

  const countMinSec = useMemo(() => {
    let s = timeLeft
    // I don't know how it works, but it does
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
  }, [timeLeft])

  const onLayout = event => {
    const {width} = event.nativeEvent.layout;
    setMyWidth(width);
  };

  return (
    <ImageBackground source={require('../../assets/images/green_background.png')} resizeMode='contain'
                     style={styles.backgroundImage}>
      <View style={styles.playersContainer}>
        <Text style={[styles.player, selectedPlayer === player1.key && styles.selectedPlayer]}>{player1.name}</Text>
        <View style={styles.playerScore}>
          <Text style={styles.playerScoreText}>
            {player1.score}
          </Text>
        </View>
        <Image style={styles.vs} source={require('../../assets/images/vs.png')}/>
        <Text style={[styles.player, selectedPlayer === player2.key && styles.selectedPlayer]}>{player2.name}</Text>
        <View style={styles.playerScore}>
          <Text style={styles.playerScoreText}>
            {player2.score}
          </Text>
        </View>
      </View>
      {roundTime > 0 && <View style={styles.timeContainer}>
        <View style={styles.timeLine}>
          <View style={[styles.timePassedLine, {width: percentPassedCount()}]}/>
        </View>
        <Text onLayout={onLayout}
              style={[styles.timeLeftTextContainer, {transform: [{translateX: -myWidth / 2}]}]}>{countMinSec}</Text>
      </View>}

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    color: 'white',
    fontFamily: 'Calibri-Bold',
    fontSize: 20,
    letterSpacing: 1,
    // marginTop: 5,
    textTransform: 'uppercase',
    // borderWidth: 1
  },
  selectedPlayer: {
    color: '#fae33e',
    fontSize: 25,
  },
  playersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1
  },
  playerScore: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 5
  },
  playerScoreText: {
    fontFamily: 'Calibri-Bold',
    fontSize: 20,
    color: 'black',
    margin: 3,
    marginTop: 5
  },
  vs: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginHorizontal: 5
  },
  timeContainer: {
    height: 30,
    width: '80%',
    // borderWidth: 1,
    justifyContent: 'center',
    position: 'relative'
  },
  timeLine: {
    backgroundColor: '#fae33e',
    height: 4,
    borderWidth: 1,
    borderColor: '#32392d'
  },
  timePassedLine: {
    backgroundColor: '#bc3d3f',
    flex: 1,
    marginLeft: 'auto',
    borderLeftWidth: 1,
  },
  timeLeftTextContainer: {
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
    // borderWidth: 1,
    fontFamily: 'Calibri-Bold',
    color: 'white',
    fontSize: 25,
    textShadowRadius: 3,
    textShadowColor: '#32392d'
  }
})

export default ScoreSection;
