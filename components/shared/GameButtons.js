import React from 'react';
import { ImageBackground, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Button = ({source, text, icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground source={source} resizeMode='contain' style={styles.backgroundImage}>
        {text && <Text style={styles.text}>
          {text}
        </Text>}
        {icon && <Image style={styles.icon} source={icon}/>}
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    paddingBottom: 6,
    paddingHorizontal: 15,
    minHeight: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Calibri-Bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 19,
    textTransform: 'uppercase',
    marginHorizontal: 5,
    paddingTop: 3,

  },
  icon: {
    height: 17,
    width: 17,
    resizeMode: 'contain',
  }
})

const NewGame = ({onPress}) => Button({
  source: require('../../assets/images/blue_background.png'),
  text: 'Новая игра',
  onPress
})
const Next = ({onPress}) => Button({
  source: require('../../assets/images/blue_background.png'),
  text: 'Далее',
  icon: require('../../assets/images/right_arrow.png'),
  onPress
})
const RoundTimeLimit = () => Button({
  source: require('../../assets/images/blue_long_background.png'),
  text: 'Лимит времени на ход',
})
const Rules = ({onPress}) => Button({
  source: require('../../assets/images/green_long_background.png'),
  text: 'Правила игры',
  onPress
})
const RestartGame = ({onPress}) => Button({
  source: require('../../assets/images/red_background.png'),
  text: 'Рестарт',
  icon: require('../../assets/images/restart_icon.png'),
  onPress
})
const Settings = ({onPress}) => Button({
  source: require('../../assets/images/gear.png'),
  onPress
})
const Back = ({onPress}) => Button({
  source: require('../../assets/images/back_button.png'),
  onPress
})

export { NewGame, RestartGame, Settings, Next, RoundTimeLimit, Rules, Back };
