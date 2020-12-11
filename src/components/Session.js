import React, { Component } from 'react';

class Session extends Component {
  constructor(props) {
    super(props);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    this.props.decrement('session');
  }

  handleIncrement() {
    this.props.increment('session');
  }

  render() {
    let { sessionLength, timerRunning } = this.props;
    return (
      <div className='session-buttons buttons'>
        <button
          className='btn btn-left'
          onClick={this.handleDecrement}
          enabled={!timerRunning}
          disabled={timerRunning}
        >
          -
        </button>
        <p className='interval-length'>{sessionLength}</p>
        <button
          className='btn btn-right'
          onClick={this.handleIncrement}
          disabled={timerRunning}
        >
          +
        </button>
      </div>
    );
  }
}

export default Session;
