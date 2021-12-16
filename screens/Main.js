import React, { useMemo, useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Layout from '../components/shared/Layout';
import GroupingSection from "../components/Main/GroupingSection";
import Board from "../components/Main/Board";
import TopBar from "../components/Main/TopBar";
import ScoreSection from "../components/Main/ScoreSection";
import { BOARD, WIN_LINES } from "../utils/consts";
import { Context } from "../App";
import { CoinButton } from "../components/shared/Buttons";

const Main = ({navigation, route}) => {
  const [context, setContext] = useContext(Context);
  const {player1, player2} = useMemo(() => context, [context])

  const [selectedPlayer, setSelectedPlayer] = useState(player1.key)
  const [groupingMode, setGroupingMode] = useState(1)
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [board, setBoard] = useState(BOARD())
  const [winLine, setWinLine] = useState([])
  const [isPlaying, setIsPlaying] = useState(true)


  const handleChangeGroupingMode = () => {
    setGroupingMode(prevMode => prevMode === 3 ? 1 : prevMode + 1)
  }

  const handlePlaceCoin = (i, j) => {
    if (selectedCoin) {
      const newBoard = [...board]
      newBoard[i][j] = selectedCoin
      setBoard(newBoard)
      setSelectedCoin(null)
      setSelectedPlayer(player => player === player1.key ? player2.key : player1.key)
    }
  }

  const newGameCheck = (line) => {
    const commonProperties = {...board[line[0][0]][line[0][1]]}
    if (commonProperties && (commonProperties.color || commonProperties.form || commonProperties.size)) {
      for (let i = 1; i < line.length; i++) {
        const cell = {...board[line[i][0]][line[i][1]]}
        if (cell && (cell.color || cell.form || cell.size)) {
          commonProperties.color !== cell.color && delete commonProperties.color
          commonProperties.form !== cell.form && delete commonProperties.form
          commonProperties.size !== cell.size && delete commonProperties.size
        } else {
          return false
        }
      }
      if (commonProperties && (commonProperties.color || commonProperties.form || commonProperties.size)) return true
    }
    return false
  }

  React.useEffect(() => {

    if (!winLine.length) {
      let newWinLine
      WIN_LINES.some(line => {
        const result = newGameCheck(line)
        if (result) newWinLine = line
        return result
      })
      if (newWinLine) {
        setWinLine(newWinLine);
        addScoreToWinner();
      }
    }
  }, [board]);

  const addScoreToWinner = () => {
    const winnerPlayer = selectedPlayer === player1.key ? player2.key : player1.key
    const newContext = {
      ...context,
      [winnerPlayer]: {
        ...context[winnerPlayer],
        score: context[winnerPlayer].score + 1
      }
    }
    setContext(newContext)
    setIsPlaying(false)

    setTimeout(() => navigation.navigate('Win', {name: context[winnerPlayer].name}), 1500)
  }

  const usedCoins = useMemo(() => {
    return [].concat(...board).filter(coin => coin)
  }, [board])

  const handleRestartGame = () => {
    setWinLine([])
    setIsPlaying(true)
    setBoard(BOARD())
    setGroupingMode(1)
    setSelectedCoin(null)
    setSelectedPlayer(player1.key)
  }

  const handleNewGame = () => {
    handleRestartGame()
    const newContext = {
      ...context,
      [player1.key]:
        {...context[player1.key], score: 0},
      [player2.key]:
        {...context[player2.key], score: 0}
    }
    setContext(newContext)
  }

  const handleGoToSettingsScreen = () => {
    navigation.navigate('Settings')
  }

  useFocusEffect(
    React.useCallback(() => {
      handleRestartGame()
    }, [route.params?.isPlaying])
  );


  return (

    <KeyboardAvoidingView
      behavior={"height"}
      style={styles.container}
      enabled={false}
    >
      <Layout>
        <View style={styles.topBarContainer}>
          <TopBar onRestart={handleRestartGame} onNewGame={handleNewGame} onGoToSettings={handleGoToSettingsScreen}/>
        </View>
        <View style={styles.scoreContainer}>
          <ScoreSection selectedPlayer={selectedPlayer} onTimeIsUp={addScoreToWinner}
                        isPlaying={isPlaying}/>
        </View>
        <View style={styles.boardContainer}>
          <Board board={board} onSelectCell={handlePlaceCoin} winLine={winLine}/>
        </View>
        <View style={styles.selectedCoinContainer}>
          {selectedCoin && <CoinButton color={selectedCoin.color} form={selectedCoin.form} size={selectedCoin.size}/>}
        </View>
        <View style={styles.groupingSectionContainer}>
          {isPlaying && <GroupingSection mode={groupingMode} onChangeMode={handleChangeGroupingMode}
                                         onSelectCoin={setSelectedCoin} usedCoins={usedCoins}/>}
        </View>
      </Layout>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBarContainer: {
    flex: 0.3,
    // borderWidth: 1
  },
  scoreContainer: {
    flex: 1,
    // borderWidth: 1
  },
  selectedCoinContainer: {
    flex: 0.5,
    alignItems: "center",
  },
  boardContainer: {
    flex: 3,
  },
  groupingSectionContainer: {
    flex: 0.8,

  },
});

export default Main;
