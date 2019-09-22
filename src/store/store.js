import {createStore} from 'redux';
import {CELLS_AMOUNT, MODES} from '../constants/constants'

function getEmptyCells() {
  let emptyCells = [];
  for(let i = 0; i < CELLS_AMOUNT; i++){
    emptyCells.push('empty')
  }
  return emptyCells;
}

const initialState = {
  gameStarted: false,
  gameEnded: false,
  isPlaying: false,
  activeCell: null,

  userName: '',
  mode: null,

  cells: getEmptyCells(),

  winners: []
};

function rootReducer(state = initialState, action) {
  let stateCopy = {...state};
  console.log('called store', action.type);
  switch (action.type) {
    case 'FILL_CELL': {
      let cellsCopy = [].concat(state.cells);
      cellsCopy[action.id] = action.cellType;
      stateCopy.cells = cellsCopy;
      stateCopy.activeCell = (action.cellType === 'next') ? action.id : null;
      stateCopy.gameStarted = false;
      stateCopy.gameEnded = false;
      return stateCopy;
    }break;
    case 'START_GAME': {
      stateCopy.cells = getEmptyCells();
      stateCopy.gameStarted = true;
      stateCopy.userName = action.userName;
      stateCopy.date = action.date;
      stateCopy.mode = MODES[action.mode];
      return stateCopy;
    }break;
    case 'GAME_OVER': {
      let newWinners = [].concat(stateCopy.winners).concat([{user: (action.winner === 'user') ? state.userName : 'Computer', date: state.date}])
      console.log('newWinners, state.winners',newWinners, state.winners);
      stateCopy.gameEnded = true;
      stateCopy.activeCell = null;
      stateCopy.winners = newWinners;
      return stateCopy;
    }break;
    default: return state;
  }
}

export function fillCell(id, cellType) {
  return {type: 'FILL_CELL', id, cellType}
}

export function startGame(userName, date, mode){
  return {type: 'START_GAME', userName, date, mode};
}

export function gameOver(winner){
  return {type: 'GAME_OVER', winner};
}

const store = createStore(rootReducer);
export default store;
