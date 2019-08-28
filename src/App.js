import React, { Component } from 'react'
import Quiz from './Quiz.js'
import QuizStart from './QuizStart.js'
import './App.css'
import './Quiz-Utils.js'

let quizData = require('./quiz_aem_bp.json')

class App extends Component {



  constructor(props){
    super(props)
    this.state = {
 
      TestType : 'StudyGuide', // 'Quiz',  'Test','StudyGuide'
      quiz_name: quizData.quiz_name,
      PercentageCorrectForPassingScore: quizData.percentageCorrectForPassingScore, // Passing score:(550) All Adobe exams are reported on a scale of 300 to 700. The passing score for each exam is 550
      IsTimedTest: false,
      SecondsAllotedPerQuestion: 75, // 80 minutes total
      TimeStarted: null,
      TimeRemaining: null,
      IsStarted: false,
      IsCompleted: false,
      IsInReviewMode: false,
      CurrentQuestionNumber: 0,
      Questions: quizData.quiz_questions,
      NumberOfQuestions: quizData.quiz_questions.length,
      NumberOfQuestionsAnswered: 0,
      NumberOfQuesionsCorrect:  0,
      PercentageOfCorrectAnswers: this.NumberOfQuestions === 0? 0 : (this.NumberOfQuesionsCorrect / this.NumberOfQuestions) * 100,
      Topics :  quizData.topics
    };

    this.state.IsInReviewMode = this.state.TestType === 'StudyGuide';
    this.state.Questions = this.state.Questions.shuffle();
    
    this.state.Questions.map( (arr) =>  { return arr.presented_options =  arr.presented_options.shuffle()});
    
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
    numTopicQuestions = (parseInt(numberOfQuestions, 10) * (topic.percent/100)).toFixed(0);
    var topicArr = quizData.quiz_questions.filter(this.matchExamTopic.bind(this,  topic.key)).shuffle().slice(0, numTopicQuestions);

    fullArr = fullArr.concat(topicArr).shuffle();

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
      Questions: fullArr,
      IsInReviewMode: testType === 'StudyGuide'? true : false,      
      })
      console.log(this.state.isStarted);

  };
 
  handleTestResetClick(){
    var fullArr = this.generateQuestionsBasedOnTopics(this.state.NumberOfQuestions);
    this.setState({
      IsStarted: false,
      IsCompleted: false,
      IsInReviewMode: false,
      CurrentQuestionNumber: 0,
      NumberOfQuestions:fullArr.length,
      NumberOfQuestionsAnswered: 0,
      NumberOfQuesionsCorrect:  0,
      Questions: fullArr,
    })
  }


  render() {
    return (

        this.state.IsStarted ? 
          <Quiz quiz={this.state} resetClickHandler={this.handleTestResetClick.bind(this)} /> :          
          <QuizStart quiz={this.state} 
            numberOfQuestionsChangedHandler={this.handleNumberOfQuestionsChanged.bind(this)}
            startClickHandler={this.handleTestStartClick.bind(this)}  
            resetClickHandler={this.handleTestResetClick.bind(this)} /> 

    )
  }
}

export default App