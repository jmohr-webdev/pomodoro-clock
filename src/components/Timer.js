import React, { Component } from 'react';

class Timer extends Component {
  render() {
    let {
      timerMinutes,
      timerSeconds,
      timerRunning,
      sound,
      phase,
      togglePlay,
      toggleSound,
      reset
    } = this.props;
    return (
      <div className='clock-container'>
        <div className='timer'>
          <span className='timer-countdown'>
            {timerMinutes}:
            {timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
          </span>
          <p className='flavor-text'>
            {phase === 'session' ? 'Stay Focused' : 'Have Fun'}
          </p>
        </div>

        <div className='buttons button-container'>
          <button className='btn btn-left btn-sound' onClick={toggleSound}>
            {sound ? (
              <i className='fas fa-volume-up fa-lg' />
            ) : (
              <i className='fas fa-volume-mute fa-lg' />
            )}
          </button>
          <button className='btn btn-play' onClick={togglePlay}>
            {timerRunning ? (
              <i className='fas fa-pause fa-lg' />
            ) : (
              <i className='fas fa-play fa-lg' />
            )}
          </button>
          <button className='btn btn-right btn-reset' onClick={reset}>
            <i className='fas fa-undo fa-lg' />
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;
