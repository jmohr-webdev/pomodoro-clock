import React, { Component } from 'react';
import Session from './Session';
import Break from './Break';
import Timer from './Timer';
import Modal from './Modal';

import Chime from '../assets/Chime.mp3';

import '../styles/pomodoroclock.css';

class PomodoroClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerMinutes: 25,
      timerSeconds: 0,
      phase: 'session',
      timerRunning: false,
      timerId: 0,
      sound: true,
      modalOpen: false,
    };
    this.audio = new Audio(Chime);

    this.incrementSession = this.incrementSession.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.phaseChange = this.phaseChange.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
    this.reset = this.reset.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  incrementSession() {
    // Won't allow session length to go above 99 minutes
    if (this.state.sessionLength < 99) {
      this.setState((state) => ({
        sessionLength: state.sessionLength + 1,
      }));

      // Adjusts timer if in session phase
      if (this.state.phase === 'session') {
        this.setState((state) => ({
          timerMinutes: this.state.timerMinutes + 1,
        }));
      }
    }
  }

  incrementBreak() {
    // Won't allow break length to go above 99 minutes
    if (this.state.breakLength < 99) {
      this.setState((state) => ({
        breakLength: state.breakLength + 1,
      }));

      // Adjusts timer if in break phase
      if (this.state.phase === 'break') {
        this.setState((state) => ({
          timerMinutes: this.state.timerMinutes + 1,
        }));
      }
    }
  }

  decrementSession() {
    // Won't allow session length to go below 1 minutes
    if (this.state.sessionLength > 1) {
      this.setState((state) => ({
        sessionLength: state.sessionLength - 1,
      }));

      // Adjusts timer if in session phase
      if (this.state.phase === 'session') {
        this.setState((state) => ({
          timerMinutes: this.state.timerMinutes - 1,
        }));
      }
    }
  }

  decrementBreak() {
    // Won't allow break length to go below 1 minutes
    if (this.state.breakLength > 1) {
      this.setState((state) => ({
        breakLength: state.breakLength - 1,
      }));

      // Adjusts timer if in break phase
      if (this.state.phase === 'break') {
        this.setState((state) => ({
          timerMinutes: this.state.timerMinutes - 1,
        }));
      }
    }
  }

  phaseChange() {
    let minutes, phase;
    if (this.state.phase === 'session') {
      phase = 'break';
      minutes = this.state.breakLength;
    } else {
      phase = 'session';
      minutes = this.state.sessionLength;
    }
    this.setState({
      phase,
      timerMinutes: minutes,
      timerSeconds: 0,
    });
    this.runTimer();
  }

  runTimer() {
    let runningTimer = setInterval(() => {
      this.setState({ timerId: runningTimer });
      switch (this.state.timerSeconds) {
        case 0:
          this.setState((state) => ({
            timerSeconds: 59,
            timerMinutes: state.timerMinutes - 1,
          }));
          break;
        default:
          this.setState((state) => ({ timerSeconds: state.timerSeconds - 1 }));
          break;
      }
      if (this.state.timerSeconds === 0 && this.state.timerMinutes === 0) {
        clearInterval(this.state.timerId);
        if (this.state.sound) this.audio.play();
        this.phaseChange();
      }
    }, 1000);
  }

  togglePlay() {
    this.setState(
      (state) => ({ timerRunning: !state.timerRunning }),
      () => {
        if (this.state.timerRunning) {
          this.runTimer();
        } else {
          clearInterval(this.state.timerId);
        }
      }
    );
  }

  toggleSound() {
    this.setState((state) => ({ sound: !this.state.sound }));
  }

  reset() {
    clearInterval(this.state.timerId);
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerMinutes: 25,
      timerSeconds: 0,
      phase: 'session',
      timerRunning: false,
    });
  }

  toggleModal(evt) {
    console.log(evt.target);
    if (evt.target.className !== 'modal-contaner') {
      this.setState({ modalOpen: !this.state.modalOpen });
    }
  }

  render() {
    const {
      breakLength,
      sessionLength,
      timerMinutes,
      timerSeconds,
      timerRunning,
      phase,
      sound,
      modalOpen,
    } = this.state;
    return (
      <div
        className={`container ${
          phase === 'session' ? 'container-session' : 'container-break'
        }`}
      >
        <h1 className="title">Pomodoro Clock</h1>
        <i
          className="fa fa-info-circle fa-3x modal-open"
          onClick={this.toggleModal}
        ></i>
        <div className="timer-container">
          <div className="intervals">
            <div className="session">
              <h3 className="session-title">Session Length</h3>
              <Session
                sessionLength={sessionLength}
                increment={this.incrementSession}
                decrement={this.decrementSession}
                timerRunning={timerRunning}
              />
            </div>
            <div className="break">
              <h3 className="break-title">Break Length</h3>
              <Break
                breakLength={breakLength}
                increment={this.incrementBreak}
                decrement={this.decrementBreak}
                timerRunning={timerRunning}
              />
            </div>
          </div>
          <Timer
            timerMinutes={timerMinutes}
            timerSeconds={timerSeconds}
            timerRunning={timerRunning}
            sound={sound}
            phase={phase}
            togglePlay={this.togglePlay}
            toggleSound={this.toggleSound}
            reset={this.reset}
          />
        </div>
        <Modal modalOpen={modalOpen} toggleModal={this.toggleModal} />
      </div>
    );
  }
}

export default PomodoroClock;
