import React, { Component } from 'react';

class Break extends Component {
  render() {
    let { breakLength, increment, decrement, timerRunning } = this.props;
    return (
      <div className='break buttons'>
        <button
          className='btn btn-left'
          onClick={() => decrement('break')}
          disabled={timerRunning}
        >
          -
        </button>
        <p className='interval-length'>{breakLength}</p>
        <button
          className='btn btn-right'
          onClick={() => increment('break')}
          disabled={timerRunning}
        >
          +
        </button>
      </div>
    );
  }
}

export default Break;
