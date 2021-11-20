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
}

