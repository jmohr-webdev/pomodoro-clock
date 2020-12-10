import React, { Component } from 'react';
import '../styles/Modal.css';

class Modal extends Component {
  render() {
    const { modalOpen, toggleModal } = this.props;
    return (
      <div
        className={modalOpen ? 'modal show-modal' : 'modal'}
        onClick={(evt) => toggleModal(evt)}
      >
        <div className='modal-container'>
          <h1>What is a Pomodoro Clock?</h1>
          <button onClick={toggleModal} className='close-btn'>
            <i className='fa fa-window-close fa-2x'></i>
          </button>
          <p>
            The pomodoro technique is a productivity hack developed by Francesco
            Cirillo, named for the tomato-shaped timer he initially used.
          </p>
          <p>
            Pick a task you want to focus on and concentrate for a set period of
            time (typically 25 minutes) and then take a short break (typically 5
            minutes).
          </p>
          <p>
            You may use the interval controls to set the lengths of your session
            and break intervals. <span className='godspeed'>Godspeed!</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Modal;
