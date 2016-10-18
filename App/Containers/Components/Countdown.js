import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

const style = {
  timer: {
    fontSize: 20,
    color: '#d4f8f5',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default class Countdown extends Component {
  constructor(props) {
    super(props);

    if (this.props.hours) {
      let { hours } = this.props;

      this.state = {
        hoursLeft: Math.floor(((hours - Date.now()) / 1000 / 60 / 60) % 60),
        minutesLeft: Math.floor(((hours - Date.now()) / 1000 / 60) % 60),
        secondsLeft: Math.floor(((hours - Date.now()) / 1000) % 60)
      }
    } else {
      this.state = {hoursLeft: 0, minutesLeft: 0, secondsLeft: 0}
    }

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    if (this.props.hours) {
      let { hours } = this.props;
      this.setState({
        hoursLeft: Math.floor(((hours - Date.now()) / 1000 / 60 / 60) % 60),
        minutesLeft: Math.floor(((hours - Date.now()) / 1000 / 60) % 60),
        secondsLeft: Math.floor(((hours - Date.now()) / 1000) % 60)
      });
      this.timer = window.setInterval(this.tick, 1000);
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  tick() {
    if (this.props.hours) {
      if (this.state.minutesLeft === 0) {
        this.setState({
          minutesLeft: 60,
          hoursLeft: this.state.hoursLeft - 1
        });
      }
      if (this.state.secondsLeft === 0) {
        this.setState({
          secondsLeft: 60,
          minutesLeft: this.state.minutesLeft - 1
        });
      }
      this.setState({
        secondsLeft: this.state.secondsLeft - 1
      });
    } else {
      this.setState({
        hoursLeft: this.state.hoursLeft,
        minutesLeft: this.state.minutesLeft,
        secondsLeft: this.state.secondsLeft
      });
    }
  }

  render() {
    if (this.props.hours > Date.now()) {
      return (
        <Text style={style.timer}>{`${String('0' + this.state.hoursLeft).slice(-2)}:${String('0' + this.state.minutesLeft).slice(-2)}:${String('0' + this.state.secondsLeft).slice(-2)} until closing.`}</Text>
      )
    } else {
      return <Text style={style.timer}>CLOSED</Text>
    }
  }

}
