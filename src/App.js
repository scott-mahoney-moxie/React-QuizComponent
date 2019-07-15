import React, { Component } from 'react'
import Quiz from './Quiz.js'
import './App.css'
import {AppProvider} from './AppContext'
import './Quiz-Utils.js'

let quizData = require('./quiz_target_bp.json')

class App extends Component {



  constructor(props){
    super(props)
    this.state = {
 
      TestType : 'Test', // 'Quiz',  'Test','StudyGuide'
      quiz_name: quizData.quiz_name,
      PercentageCorrectForPassingScore: 70,
      IsTimedTest: false,
      SecondsAllotedPerQuestion: 60,
      TimeStarted: null,
      TimeRemaining: null,
      IsStarted: false,
      IsCompleted: false,
      IsInReviewMode: this.TestType === 'StudyGuide'? true : false,
      CurrentQuestionNumber: 0,
      Questions: quizData.quiz_questions,
      NumberOfQuestions: quizData.quiz_questions.length,
      NumberOfQuestionsAnswered: 0,
      NumberOfQuesionsCorrect:  0,
      PercentageOfCorrectAnswers: this.NumberOfQuestions === 0? 0 : (this.NumberOfQuesionsCorrect / this.NumberOfQuestions) * 100
    };

    this.state.IsInReviewMode = this.state.TestType === 'StudyGuide';
    this.state.Questions = this.state.Questions.shuffle();
    this.state.Questions.map( (arr) => {arr.presented_options =  arr.presented_options.shuffle()});
    
} ;


 

  render() {
    return (
      <AppProvider>
        <Quiz quiz={this.state} />
      </AppProvider>
    )
  }
}

export default App