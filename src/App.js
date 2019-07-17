import React, { Component } from 'react'
import Quiz from './Quiz.js'
import QuizStart from './QuizStart.js'
import './App.css'
import './Quiz-Utils.js'

let quizData = require('./quiz_target_bp.json')

class App extends Component {



  constructor(props){
    super(props)
    this.state = {
 
      TestType : 'Quiz', // 'Quiz',  'Test','StudyGuide'
      quiz_name: quizData.quiz_name,
      PercentageCorrectForPassingScore: 68, // Passing score:(550) All Adobe exams are reported on a scale of 300 to 700. The passing score for each exam is 550
      IsTimedTest: false,
      SecondsAllotedPerQuestion: 75, // 80 minutes total
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

handleNumberOfQuestionsChanged(inputNumberOfQuestions){
  console.log('App: handleNumberOfQuestionsChanged: ' + inputNumberOfQuestions);
  this.setState({ NumberOfQuestions : inputNumberOfQuestions});
}


  handleTestStartClick(){
    console.log(this.state.IsStarted);
    this.setState({
      IsStarted: true
            })
            console.log(this.state.isStarted);

  };
 
  handleTestResetClick(){
    this.setState({
      IsStarted: false
    })
  }


  render() {
    return (

        this.state.IsStarted ? 
          <Quiz quiz={this.state} /> :          
          <QuizStart quiz={this.state} 
            numberOfQuestionsChangedHandler={this.handleNumberOfQuestionsChanged.bind(this)}
            startClickHandler={this.handleTestStartClick.bind(this)}  
            resetClickHandler={this.handleTestResetClick.bind(this)} /> 

    )
  }
}

export default App