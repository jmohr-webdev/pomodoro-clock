import React, { Component } from 'react';

class Break extends Component {
  render() {
    const { breakLength, increment, decrement, timerRunning } = this.props;
    return (
      <div className="break-buttons buttons">
        <button
          className="btn btn-left"
          onClick={() => decrement()}
          disabled={timerRunning}
        >
          -
        </button>
        <p className="interval-length">{breakLength}</p>
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

export default Break;
