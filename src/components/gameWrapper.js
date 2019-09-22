import React, { PureComponent } from 'react';
import Game from './game';
import Leaderboard from './leaderboard';

export default class GameWrapper extends PureComponent{
  render(){
    return (<div className="game-wrapper">
      <Game />
      <Leaderboard />
    </div>);
  }
}
