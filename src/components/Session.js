import React, { Component } from 'react';

class Session extends Component {
  render() {
    const { sessionLength, increment, decrement, timerRunning } = this.props;
    return (
      <div className="session-buttons buttons">
        <button
          className="btn btn-left"
          onClick={() => decrement()}
          disabled={timerRunning}
        >
          -
        </button>
        <p className="interval-length">{sessionLength}</p>
        <button
          className="btn btn-right"
          onClick={() => increment()}
          disabled={timerRunning}
        >
          +
        </button>
      </div>
    );
  }
}

export default Session;
