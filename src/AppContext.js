import React, { Component } from 'react';

let quizData = require('./quiz_data.json')

const AppContext = React.createContext({
  isInProgress: false,
  isInReview: false,
  NumberOfQuestions: quizData.quiz_questions.length,
  NumberOfQuestionsAnswered: 0,
  NumberOfQuestionsAnsweredCorrectly : 3,
  startQuiz:()=>{},
  answeredCorrect:()=>{},
  answeredInCorrect:(msg)=>{},
  scoreQuiz:(msg)=>{},
  
});

export class AppProvider extends Component {
 

    answeredCorrect = NumberOfQuestionsAnsweredCorrectly  => {
      console.log('in provider, answeredCorrect()')
      this.setState({ NumberOfQuestionsAnsweredCorrectly: NumberOfQuestionsAnsweredCorrectly + 1 });
    };

    state = {
      isInProgress: false,
      isInReview: false,
      NumberOfQuestions: quizData.quiz_questions.length,
      NumberOfQuestionsAnswered: 0,
      NumberOfQuestionsAnsweredCorrectly : 3,
      message: ''
    };

    render() {
    return (
        <AppContext.Provider value={this.state} >
          {this.props.children}
        </AppContext.Provider>
      );
    }
}

export const AppConsumer = AppContext.Consumer;