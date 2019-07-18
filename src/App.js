import React, { Component } from 'react'
import Quiz from './Quiz.js'
import QuizStart from './QuizStart.js'
import './App.css'
import './Quiz-Utils.js'
import { exec } from 'child_process';

let quizData = require('./quiz_target_bp.json')

class App extends Component {



  constructor(props){
    super(props)
    this.state = {
 
      TestType : 'StudyGuide', // 'Quiz',  'Test','StudyGuide'
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
      PercentageOfCorrectAnswers: this.NumberOfQuestions === 0? 0 : (this.NumberOfQuesionsCorrect / this.NumberOfQuestions) * 100,
      Topics :[
        {key: 'Planning and Configuring', percent:  29}, //29
        {key: 'Executing and Managing', percent: 34}, //34
        {key: 'Analyzing and Reporting', percent:  28}, //28
        {key: 'Troubleshooting', percent: 9} //9
      ]
    };

    this.state.IsInReviewMode = this.state.TestType === 'StudyGuide';
    this.state.Questions = this.state.Questions.shuffle();
    
    this.state.Questions.map( (arr) => {arr.presented_options =  arr.presented_options.shuffle()});
    
} ;

matchExamTopic(targetValue, arrItem){
  console.log('arrItem.exam_topics')
  return (arrItem.exam_topics !== null && arrItem.exam_topics.length>0 && arrItem.exam_topics[0] === targetValue);
}

handleNumberOfQuestionsChanged(inputNumberOfQuestions){
  console.log('App: handleNumberOfQuestionsChanged: ' + inputNumberOfQuestions);
  this.setState({ NumberOfQuestions : inputNumberOfQuestions});
}

generateQuestionsBasedOnTopics(numberOfQuestions){

  var fullArr = [];
  this.state.Topics.forEach(topic =>{
    console.log('TOPIC: ' + topic.key + ' % ' + topic.percent);
    var numTopicQuestions;
    numTopicQuestions = (parseInt(numberOfQuestions) * (topic.percent/100)).toFixed(0);
    var topicArr = this.state.Questions.filter(this.matchExamTopic.bind(this,  topic.key)).shuffle().slice(0, numTopicQuestions);

    fullArr = fullArr.concat(topicArr);

  })

  // based on # of questions in topic or rounding, grab random questions to fill as needed.
  if (fullArr.length < numberOfQuestions){
    var numQuestionsNeededToFill = numberOfQuestions - fullArr.length;

    var fillerArr = quizData.quiz_questions.shuffle().slice(0,numQuestionsNeededToFill);
    fullArr = fullArr.concat(fillerArr);

  }


  return fullArr;

}

handleTestStartClick(testType, numberOfQuestions){
  console.log(this.state.IsStarted);
  console.log('Set Test Type to: ' + testType);
  console.log('number of questions set to: ' + numberOfQuestions);
  
  var fullArr = this.generateQuestionsBasedOnTopics(numberOfQuestions);

    this.setState({
      IsStarted: true,
      TestType: testType,
      NumberOfQuestions: numberOfQuestions,
      Questions: fullArr
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