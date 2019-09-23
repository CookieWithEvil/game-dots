import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import {startGame} from '../store/store';

function mapDispatchToProps(dispatch) {
  return {
    startGame: (userName, date, chosenMode) => dispatch(startGame(userName, date, chosenMode))
  };
}

const mapStateToProps = state => {
  return {notFirstGame: state.notFirstGame};
}

class ConnectedSettings extends PureComponent{
  constructor(props){
    super(props);

    this.state = {
      chosenMode: '',
      userName: '',
      isChangeStyle: false
    }
  }

  handleModeChange = (event) => {
    this.setState({chosenMode: event.target.value});
  }

  handleInputChange = (event) => {
    this.setState({userName: event.target.value});
  }

  startGame = (event) => {
    const {userName, chosenMode} = this.state;
    event.preventDefault();
    if(userName && chosenMode){
      let startDate = new Date();
      let formatedDate = startDate.getDate()+'-'+(startDate.getMonth() + 1)+'-'+startDate.getFullYear()+' '+startDate.getHours()+':'+startDate.getMinutes();
      this.props.startGame(userName, formatedDate, chosenMode);
      this.setState({isChangeStyle: false});
    }else{
      this.setState({isChangeStyle: true});
    }
  }

  render() {
    return (
      <form className="game-wrapper__game-settings" onSubmit={(event) => this.startGame(event)}>
        <select className={`game-wrapper__game-settings_mode game-wrapper__game-settings_setting ${this.state.isChangeStyle ? "fill-input" : ""}`} onChange={(event) => this.handleModeChange(event)}>
          <option value="">Pick game mode</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <input type="text" name="name" placeholder="Enter your name" className={`game-wrapper__game-settings_name game-wrapper__game-settings_setting ${this.state.isChangeStyle ? "fill-input" : ""}`} value={this.state.userName} onChange={(event) => this.handleInputChange(event)}/>
        <button type="submit" className="game-wrapper__game-settings_submit game-wrapper__game-settings_setting">PLAY {this.props.notFirstGame && 'AGAIN'}</button>
      </form>
    );
  }
}

const Settings = connect(mapStateToProps, mapDispatchToProps)(ConnectedSettings);
export default Settings;
