import React from 'react';
import { connect } from 'react-redux';
import store from '../store/store';

const mapStateToProps = state => {
  return { winners: state.winners };
};

function ConnectedLeaderboard(props) {
  return (<div className="game-wrapper__list">
    <h2 className="game-wrapper__list-title">Leader Board</h2>
    {(props.winners).map((winner, i) => {
      return (<div className="game-wrapper__list-winner" key={i}><span>{winner.user}</span> <span>{winner.date}</span></div>)
    })}
  </div>)
}

const Leaderboard = connect(mapStateToProps)(ConnectedLeaderboard);
export default Leaderboard;
