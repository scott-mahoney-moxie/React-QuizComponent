import React, {Component} from 'react'

import QuizHeader from './QuizHeader.js'
import QuizFooter from './QuizFooter.js'
import QuizQuestion from './QuizQuestion.js'
import QuizEnd from './QuizEnd.js'

//let quizData = require('./quiz_data.json')


class Quiz extends Component {

    constructor(props){
        super(props)
        this.state = {
                        quiz_position:1
                    }

    }

    handleResetClick(){
        this.props.quiz.Questions.forEach((item) => {
            item.IsAnswered = false;
            item.IsCorrect = false;
            item.chosen_options = [];
          })
        
        this.props.quiz.Questions = this.props.quiz.Questions.shuffle();
        this.props.quiz.Questions.map( (arr) => {arr.presented_options =  arr.presented_options.shuffle()});


        this.props.quiz.IsInReviewMode = false;

        this.setState({
                quiz_position: 1,
                 questions_correct: 0, 
                 number_of_questions: this.props.quiz.Questions.length,
                 IsInReviewMode:  false
                })

    }

    handleTestReviewClick(){
        this.setState({
                quiz_position: 1,
                 number_of_questions: this.props.quiz.Questions.length,
                 IsInReviewMode: true
                })

    }


    handleSetupClick(){

        this.props.resetClickHandler();
    }


    showNextQuestion(){
        this.setState((state)=>{
            return {quiz_position:state.quiz_position + 1}
        })
    }
    showPrevQuestion(){
        this.setState((state)=>{
            return {quiz_position:state.quiz_position === 1 ? 1 : state.quiz_position - 1}
        })
    }


    render(){
        const isQuizEnd = ((this.state.quiz_position ) > this.props.quiz.NumberOfQuestions)

        return (
                <div>
                     <QuizHeader quiz={this.props.quiz} quiz_position={this.state.quiz_position} />
                    {isQuizEnd ?   
                    <QuizEnd quiz={this.props.quiz} resetClickHandler={this.handleResetClick.bind(this)}
                    reviewClickHandler={this.handleTestReviewClick.bind(this)}
                    setupClickHandler={this.handleSetupClick.bind(this)}
                    /> :

                    <QuizQuestion quiz={this.props.quiz}  
                        quiz_position={this.state.quiz_position}
                        quiz_question={this.props.quiz.Questions[this.state.quiz_position -1]} 
                        showNextQuestionHandler={this.showNextQuestion.bind(this)} 
                        showPrevQuestionHandler={this.showPrevQuestion.bind(this)}
                        />
                    }
                    <QuizFooter quiz={this.props.quiz} quiz_position={this.state.quiz_position} />
                </div>
        )
    }
}


export default Quiz
