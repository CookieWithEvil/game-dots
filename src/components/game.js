import React, { PureComponent } from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import { connect } from 'react-redux';
import Settings from './settings';
import {fillCell, gameOver} from '../store/store';

function mapDispatchToProps(dispatch) {
  return {
    fillCell: (cell, cellType) => dispatch(fillCell(cell, cellType)),
    gameOver: (winner) => dispatch(gameOver(winner))
  };
}

const mapStateToProps = state => {
  return { gameStarted: state.gameStarted,
           gameEnded: state.gameEnded,
           activeCell: state.activeCell,
           mode: state.mode,
           cells: state.cells };
};

class ConnectedGame extends PureComponent{
  constructor(props){
    super(props);
    this.state = {currCell: null};
  }

  componentDidUpdate(prevProps){
    if(!_.isEqual(this.props.cells, prevProps.cells)){
      this.setState({cells: this.props.cells})
    }
  }

  handleClick = (event) => {
    clearTimeout(this.cellTimeout);
    this.props.fillCell(event.target.id, 'user');
    this.cellTimeout = setTimeout(this.chooseNextCell, 500);
  }

  chooseNextCell = () => {
    const {cells} = this.props;
    let randomId;
    let avaliableCells = cells.filter(cell => cell === 'empty');
    if(avaliableCells.length === 0){
      this.determineWinner();
    }else if(avaliableCells.length > 0){
      do{
        randomId = Math.floor(Math.random() * 25);
      }while(cells[randomId] !== 'empty');
      this.props.fillCell(randomId, 'next');
      this.computerFill();
    }
  }

  computerFill(){
    this.cellTimeout = setTimeout(()=> {
      this.props.fillCell(this.props.activeCell, 'computer');
      clearTimeout(this.cellTimeout);
      this.cellTimeout = setTimeout(this.chooseNextCell, 500);
    }, this.props.mode);
  }

  determineWinner = () => {
    let userCount = 0, computerCount = 0;
    for (var i = 0; i < 25; i++) {
      if(this.props.cells[i] === 'user'){
        userCount++;
      }else computerCount++;
    }
    this.props.gameOver((userCount > computerCount) ? 'user' : 'computer');
  }

  render() {
    if(this.props.gameStarted){
      this.chooseNextCell();
    }

    let cells = (this.props.cells).map((cell, i) => {
      if(cell === 'next'){
        return <button className="cell cell-next" id={i} key={uuid('v4')}></button>
      }else if(cell === 'user'){
        return <button className="cell cell-user" id={i} key={uuid('v4')} disabled={true}></button>
      }else if(cell === 'computer'){
        return <button className="cell cell-computer" id={i} key={uuid('v4')} disabled={true}></button>
      }else{
        return <button className="cell cell-empty" id={i} key={uuid('v4')} disabled={true}></button>
      }
    })

    return (
      <div className="game-wrapper__game">
        <Settings />
        <div className="game-wrapper__game-field" onClick={(event) => this.handleClick(event)} >
          {cells}
        </div>
      </div>
    );
  }
}
const Game = connect(mapStateToProps, mapDispatchToProps)(ConnectedGame);
export default Game;
