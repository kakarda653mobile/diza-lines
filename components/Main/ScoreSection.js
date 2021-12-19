import React, { useMemo, useState, useContext, useEffect, useRef } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { TourGuideZone } from 'rn-tourguide'

import { Context } from "../../App";

const ScoreSection = ({selectedPlayer, onTimeIsUp, isPlaying}) => {

  const [context, setContext] = useContext(Context);
  const {player1, player2, settings: {roundTime}} = useMemo(() => context, [context])

  const [myWidth, setMyWidth] = useState(0)
  const [timeLeft, setTimeLeft] = useState(roundTime)
  const [intervalId, setIntervalId] = useState(null)
  const [editingPlayer, setEditingPlayer] = useState('')

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

  const handlePlayerPress = (key) => {
    setEditingPlayer(key)
  }

  const applyPlayerNameChanges = (value) => {
    setContext({...context, [editingPlayer]: {...context[editingPlayer], name: value}})
  }

  return (
    <ImageBackground source={require('../../assets/images/green_background.png')} resizeMode='contain'
                     style={styles.backgroundImage}>
      <View style={styles.playersContainer}>

        <Player editingPlayer={editingPlayer} selectedPlayer={selectedPlayer} player={player1}
                applyPlayerNameChanges={applyPlayerNameChanges} onPlayerPress={handlePlayerPress}/>

        <Image style={styles.vs} source={require('../../assets/images/vs.png')}/>
        <Player editingPlayer={editingPlayer} selectedPlayer={selectedPlayer} player={player2}
                applyPlayerNameChanges={applyPlayerNameChanges} onPlayerPress={handlePlayerPress}/>
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

const Player = ({editingPlayer, selectedPlayer, player, applyPlayerNameChanges, onPlayerPress}) => {
  const inputEl = useRef(null);

  useEffect(() => {
    if (editingPlayer === player.key) {
      console.log('useEffect', {player})
      inputEl.current.focus()
    }
  }, [editingPlayer, player.key])

  const handlePlayerPress = (key) => () => {
    onPlayerPress(key)
  }

  return (
    <View style={styles.playerContainer}>
      <View style={{flex: 1}}>
        {editingPlayer === player.key ?
          <TextInput
            style={[styles.player, selectedPlayer === player.key && styles.selectedPlayer]}
            autoCapitalize={"characters"}
            onChangeText={applyPlayerNameChanges}
            value={player.name}
            ref={inputEl}
          /> :
          <TourGuideZone
            zone={4}
            text={'Имя игрока. Нажав на него, можно изменить'}
          >
            <TouchableOpacity onPress={handlePlayerPress(player.key)}>
              <Text numberOfLines={1}
                    style={[styles.player, selectedPlayer === player.key && styles.selectedPlayer]}>{player.name}</Text>
            </TouchableOpacity>
          </TourGuideZone>}
      </View>
      <TourGuideZone
        zone={5}
        text={'Счёт игрока. Увеличивается на один при поебеде в раунде'}
      >
        <View style={styles.playerScore}>
          <Text style={styles.playerScoreText}>
            {player.score}
          </Text>
        </View>
      </TourGuideZone>
    </View>

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
    textTransform: 'uppercase',
    paddingHorizontal: 10,
    flexShrink: 1,
    textAlign: 'center',
    // borderWidth: 1,
  },
  selectedPlayer: {
    color: '#fae33e',
    fontSize: 35,
  },
  playersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1
  },
  playerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 30,
    borderRadius: 3
  },
  playerScore: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 5,
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
