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
  notFirstGame: false,

  userName: '',
  mode: null,

  cells: getEmptyCells(),

  winners: []
};

function rootReducer(state = initialState, action) {
  let stateCopy = {...state};
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
      stateCopy.gameEnded = true;
      stateCopy.activeCell = null;
      stateCopy.winners = newWinners;
      stateCopy.notFirstGame = true;
      postWinners(state.userName, state.date)
      return stateCopy;
    }break;
    default: return state;
  }
}

function postWinners(name, date) {
  fetch(window.location.href + 'winners', {
    method: 'POST',
    headers: {
      'Accept': 'winner/json',
      'Content-Type': 'winner/json',
    },
    body: JSON.stringify({
      name: name,
      date: date,
    })
  })
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
