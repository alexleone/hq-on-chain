import React, { Component } from 'react';
import _ from 'lodash';

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameName: '',
      questionOne: '',
      questionTwo: '',
      questionThree: '',
      answerOne: '',
      answerTwo: '',
      answerThree: '',
    };

    _.bindAll(this, ['createGame']);
  }

  createGame (event) {
    event.preventDefault()

    const questions = [
      this.state.questionOne,
      this.state.questionTwo,
      this.state.questionThree,
    ];

    const answers = [
      this.state.answerOne,
      this.state.answerTwo,
      this.state.answerThree,
    ];

  }

  render() {
    return (
      <div className='container game-all'>
        <h1 className='row text-center'>
          Create New Game
        </h1>
        <form
         className='form-horizontal'
         onSubmit={this.createGame.bind(this)}>
          <button type='sumbit' className='btn btn-default'>Finish!</button>
          <div className='form-group'>
            <label>Name</label>
            <input type='text'
                   className='form-control'
                   placeholder='Game Name'
                   value={this.state.gameName}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({gameName: e.target.value});
                   }}>
            </input>
          </div>

          <div className='form-group'>
            <h2>Add Triva Questions</h2>
          </div>

          <div className='form-group'>
            <h3>Question One</h3>
          </div>

          <div className='form-group'>
            <label>Question</label>
            <input type='text'
                   className='form-control'
                   placeholder='Question'
                   value={this.state.questionOne}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({questionOne: e.target.value});
                   }}>
            </input>
          </div>
          <div className='form-group'>
            <label>Answer</label>
            <input type='text'
                   className='form-control'
                   placeholder='Answer'
                   value={this.state.answerOne}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({answerOne: e.target.value});
                   }}>
            </input>
          </div>

          <div className='form-group'>
            <h3>Question Two</h3>
          </div>

          <div className='form-group'>
            <label>Question</label>
            <input type='text'
                   className='form-control'
                   placeholder='Question'
                   value={this.state.questionTwo}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({questionTwo: e.target.value});
                   }}>
            </input>
          </div>
          <div className='form-group'>
            <label>Answer</label>
            <input type='text'
                   className='form-control'
                   placeholder='Answer'
                   value={this.state.answerTwo}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({answerTwo: e.target.value});
                   }}>
            </input>
          </div>

          <div className='form-group'>
            <h3>Question Three</h3>
          </div>

          <div className='form-group'>
            <label>Question</label>
            <input type='text'
                   className='form-control'
                   placeholder='Question'
                   value={this.state.questionThree}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({questionThree: e.target.value});
                   }}>
            </input>
          </div>
          <div className='form-group'>
            <label>Answer</label>
            <input type='text'
                   className='form-control'
                   placeholder='Answer'
                   value={this.state.answerTwo}
                   onChange={(e) => {
                     e.preventDefault();
                     this.setState({answerTwo: e.target.value});
                   }}>
            </input>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateGame
