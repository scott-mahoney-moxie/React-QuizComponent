import React, { Component } from 'react'
import Quiz from './Quiz.js'
import './App.css'
import {AppProvider} from './AppContext'

let quizData = require('./quiz_target_bp.json')

class App extends Component {

  state = {
    TestType : 'Quiz', // 'Quiz',Timed-Test','StudyGuide'
    PercentageCorrectForPassingScore: 70,
    IsTimedTest: false,
    SecondsAllotedPerQuestion: 60,
    TimeStarted: null,
    TimeRemaining: null,
    IsStarted: false,
    IsCompleted: false,
    IsInReviewMode: false,
    Questions: quizData.quiz_questions,
    NumberOfQuestions: quizData.quiz_questions.length,
    NumberOfQuestionsAnswered: 0,
    NumberOfQuesionsCorrect:0,
    PercentageOfCorrectAnswers: this.NumberOfQuestions == 0? 0 : (this.NumberOfQuesionsCorrect / this.NumberOfQuestions) * 100
  };

  render() {
    return (
      <AppProvider>
        <Quiz quiz={this.state} />
      </AppProvider>
    )
  }
}

export default App