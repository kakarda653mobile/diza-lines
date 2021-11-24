import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity } from 'react-native';

import { CoinButton } from "../shared/Buttons";

const PADDING = 15

const Board = ({board, onSelectCell, winLine}) => {

  const [cellSize, setCellSize] = useState(0)
  const [boardPaddingTop, setBoardPaddingTop] = useState(0)

  const handleCellPress = (i, j) => () => {
    onSelectCell(i, j)
  }

  const getBoardSize = (event) => {
    const {width, height} = event.nativeEvent.layout
    const cell = (width - PADDING * 2) / 4
    const paddingTop = (height - width + PADDING) / 2
    setBoardPaddingTop(paddingTop)
    setCellSize(cell)
  }

  return (
    <ImageBackground source={require('../../assets/images/field.png')} resizeMode="contain"
                     style={styles.backgroundFieldImage(boardPaddingTop)} onLayout={getBoardSize}>
      {board.map((row, i) => {
        return <View key={i} style={styles.row(cellSize)}>{row.map((cell, j) => {
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
  backgroundFieldImage: paddingTop => ({
    flex: 1,
    paddingHorizontal: PADDING,
    paddingTop
  }),
  row: height => ({
    flexDirection: 'row',
    height
  }),
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    // borderWidth: 1
  }
});

export default Board;
