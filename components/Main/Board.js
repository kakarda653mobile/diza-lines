import React from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity } from 'react-native';

import { CoinButton } from "../shared/Buttons";


const Board = ({board, onSelectCell, winLine}) => {

  const handleCellPress = (i, j) => () => {
    onSelectCell(i, j)
  }

  return (
    <ImageBackground source={require('../../assets/images/field.png')} resizeMode="contain"
                     style={styles.backgroundFieldImage}>
      {board.map((row, i) => {
        return <View key={i} style={styles.row}>{row.map((cell, j) => {
          const isWinCell = winLine.some(winCell => winCell[0] === i && winCell[1] === j)
          return <TouchableOpacity key={`${i}_${j}`}
                                   style={[styles.cell, isWinCell && {backgroundColor: 'rgba(255,255,0, 0.3)'}]}
                                   onPress={handleCellPress(i, j)}>
            {cell && <CoinButton color={cell.color} form={cell.form} size={cell.size}/>}
          </TouchableOpacity>
        })}</View>
      })}
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  backgroundFieldImage: {
    flex: 1,
    padding: 20,
    paddingTop: 50
  },
  row: {
    flexDirection: 'row',
    height: 90
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  }
});

export default Board;
