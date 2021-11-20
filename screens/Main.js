import React, { useMemo, useState, useContext } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Layout from './Layout';
import GroupingSection from "../components/Main/GroupingSection";
import Board from "../components/Main/Board";
import TopBar from "../components/Main/TopBar";
import ScoreSection from "../components/Main/ScoreSection";
import { FIELD_SIZE, BOARD, WIN_LINE_LENGTH } from "../utils/consts";
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

  const gameCheck = (
    i = 0,
    j = 0,
    prevProperties = {},
    direction = '',
    step = 1
  ) => {
    let foundProperties = {};
    let nextStep = 1;
    let nextProperties = {};
    if (board[i][j]) {
      if (prevProperties) {
        foundProperties.color = prevProperties.color === board[i][j].color && prevProperties.color
        foundProperties.form = prevProperties.form === board[i][j].form && prevProperties.form
        foundProperties.size = prevProperties.size === board[i][j].size && prevProperties.size
      }
      if ((foundProperties.color || foundProperties.form || foundProperties.size) && step === WIN_LINE_LENGTH) {
        return {status: 'WIN', cells: [[i, j]]};
      }
    } else {
      return {status: 'NOT YET'};
    }

    const goNextStep = (x, y, d) => {
      if (board[i][j]) {
        if (foundProperties.color || foundProperties.form || foundProperties.size) {
          nextProperties = {...foundProperties};
          if (direction === d) {
            nextStep = step + 1;
            const result = gameCheck(x, y, nextProperties, d, nextStep);
            if (result?.status === 'WIN') {
              return {...result, cells: [...result.cells, [i, j]]};
            }
          } else {
            nextStep = 2;
            const result = gameCheck(x, y, nextProperties, d, nextStep);
            if (result?.status === 'WIN') {
              return {...result, cells: [...result.cells, [i, j]]};
            }
          }
        } else {
          nextProperties = {...board[i][j]};
          nextStep = 2;
          const result = gameCheck(x, y, nextProperties, d, nextStep);
          if (result?.status === 'WIN') {
            return {...result, cells: [...result.cells, [i, j]]};
          }
        }
      } else {
        nextStep = 1;
        const result = gameCheck(x, y, nextProperties, '', nextStep);
        if (result?.status === 'WIN') {
          return {...result, cells: [...result.cells, [i, j]]};
        }
      }
    };

    if (i + 1 < FIELD_SIZE) {
      const result = goNextStep(i + 1, j, 'v');
      if (result?.status === 'WIN') {
        return result;
      }
    }
    if (j + 1 < FIELD_SIZE) {
      const result = goNextStep(i, j + 1, 'h');
      if (result?.status === 'WIN') {
        return result;
      }
    }
    if (i + 1 < board.length && j + 1 < board.length) {
      const result = goNextStep(i + 1, j + 1, 'db');
      if (result?.status === 'WIN') {
        return result;
      }
    }
    if (i - 1 >= 0 && j + 1 < board.length) {
      const result = goNextStep(i - 1, j + 1, 'dt');
      if (result?.status === 'WIN') {
        return result;
      }
    }

    return {status: 'NOT YET'};
  };

  React.useEffect(() => {
    board.some((row, i) =>
      row.some((cell, j) => {
        const res = gameCheck(i, j);
        if (res.status === 'WIN') {
          setWinLine(res.cells);
          addScoreToWinner();
          // setSelectedPlayer(player => player === player1.key ? player2.key : player1.key)
          return true;
        }
        return false;
      })
    );
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
    <Layout>
      <View style={styles.topBarContainer}>
        <TopBar onRestart={handleRestartGame} onNewGame={handleNewGame} onGoToSettings={handleGoToSettingsScreen}/>
      </View>
      <View style={styles.scoreContainer}>
        <ScoreSection selectedPlayer={selectedPlayer} onTimeIsUp={addScoreToWinner}
                      isPlaying={isPlaying}/>
      </View>
      <View style={styles.fieldContainer}>
        <Board board={board} onSelectCell={handlePlaceCoin} winLine={winLine}/>
      </View>
      <View style={styles.selectedCoinContainer}>
        {selectedCoin && <CoinButton color={selectedCoin.color} form={selectedCoin.form} size={selectedCoin.size}/>}
      </View>
      <View style={styles.boardContainer}>
        {isPlaying && <GroupingSection mode={groupingMode} onChangeMode={handleChangeGroupingMode}
                                       onSelectCoin={setSelectedCoin} usedCoins={usedCoins}/>}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    flex: 0.3,
  },
  scoreContainer: {
    flex: 0.5,
  },
  selectedCoinContainer: {
    flex: 0.5,
    alignItems:"center",
  },
  fieldContainer: {
    flex: 3,
  },
  boardContainer: {
    flex: 0.8,
  },
});

export default Main;
