import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TourGuideZone } from 'rn-tourguide'

import { NewGame, RestartGame, Settings } from "../shared/GameButtons";

const TopBar = ({onRestart, onNewGame, onGoToSettings}) => {
  return (
    <View style={styles.container}>
      <View style={styles.newGameButtonContainer}>
        <TourGuideZone
          zone={1}
          text={'Кнопка начинает игру заново. Все очки игроков сбрасываются'}
        >
          <NewGame onPress={onNewGame}/>
        </TourGuideZone>
      </View>
      <View style={styles.restartButtonContainer}>
        <TourGuideZone
          zone={2}
          text={'Кнопка начинает текущую партию заново. Очки игроков за предыдущие раунды остаются'}
        >
          <RestartGame onPress={onRestart}/>
        </TourGuideZone>
      </View>
      <View style={styles.settingsButtonContainer}>
        <TourGuideZone
          zone={3}
          text={'Кнопка настроек. Нажмите, если хотите изменить время раунда или прочесть правила ещё раз'}
        >
          <Settings onPress={onGoToSettings}/>
        </TourGuideZone>
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
