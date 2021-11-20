import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NewGame, RestartGame, Settings } from "../shared/GameButtons";

const TopBar = ({onRestart, onNewGame, onGoToSettings}) => {
  return (
    <View style={styles.container}>
      <View style={styles.newGameButtonContainer}>
        <NewGame onPress={onNewGame}/>
      </View>
      <View style={styles.restartButtonContainer}>
        <RestartGame onPress={onRestart}/>
      </View>
      <View style={styles.settingsButtonContainer}>
        <Settings onPress={onGoToSettings}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row'
    },
    newGameButtonContainer: {
      flex: 3
    },
    restartButtonContainer: {
      flex: 3
    },
    settingsButtonContainer: {
      flex: 1
    }
  }
)

export default TopBar;
