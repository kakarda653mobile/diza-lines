import AsyncStorage from "@react-native-async-storage/async-storage";

export const SIZES = {
  S: 'S',
  M: 'M',
  L: 'L'
}

export const COLORS = {
  PINK: 'PINK',
  YELLOW: 'YELLOW',
  BLUE: 'BLUE'
}

export const FORMS = {
  CIRCLE: 'CIRCLE',
  SQUARE: 'SQUARE',
  HEXAGON: 'HEXAGON'
}


export const WIN_LINE_LENGTH = 3

export const FIELD_SIZE = 4

export const BOARD = () => Array(FIELD_SIZE).fill(null).map(() => Array(FIELD_SIZE).fill(null))

export const WIN_LINES = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[3, 0], [3, 1], [3, 2]],
  [[0, 1], [0, 2], [0, 3]],
  [[1, 1], [1, 2], [1, 3]],
  [[2, 1], [2, 2], [2, 3]],
  [[3, 1], [3, 2], [3, 3]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 3], [1, 3], [2, 3]],
  [[1, 0], [2, 0], [3, 0]],
  [[1, 1], [2, 1], [3, 1]],
  [[1, 2], [2, 2], [3, 2]],
  [[1, 3], [2, 3], [3, 3]],
  [[0, 0], [1, 1], [2, 2]],
  [[1, 1], [2, 2], [3, 3]],
  [[0, 3], [1, 2], [2, 1]],
  [[1, 2], [2, 1], [3, 0]],
  [[1, 0], [2, 1], [3, 2]],
  [[0, 1], [1, 2], [2, 3]],
  [[0, 2], [1, 1], [2, 0]],
  [[1, 3], [2, 2], [3, 1]]

]

export const PLAYERS_CONTEXT = {
  player1: {
    key: 'player1',
    name: 'Батат',
    score: 0
  },
  player2: {
    key: 'player2',
    name: 'Кирпич',
    score: 0
  },
  settings: {
    roundTime: 0
  },
  redRules: false
}


