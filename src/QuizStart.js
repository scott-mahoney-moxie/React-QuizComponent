import React, {Component} from 'react'
import Quiz from './Quiz.js'
import QuizQuestionButton from './QuizQuestionButton'

class QuizStart extends Component{
    constructor(props){
        super(props)

        this.state = {
            quizQuestionLength: 65
        }
    }


    handleTestStartClick(){
        this.props.startClickHandler()
    }

    handleTestResetClick(){
        this.props.resetClickHandler()
    }

    handleNumberOfQuestionsChange(event) {
        console.log('QuizStart: handleNumberOfQuestionsChange: ' +  event.target.value);
        this.setState({quizQuestionLength: event.target.value})
        this.props.numberOfQuestionsChangedHandler(event.target.value)
    }

    handleQuizFormSubmit(event){
        
    }

    render(){
        return(
            <div style={{marginLeft:10}}>
                <h1>Quiz Maker - Start</h1>
                
                
                <div>Number of Questions: <input type="text" name="numberOfQuestions" 
                                            value={this.state.quizQuestionLength}  
                                            onChange={this.handleNumberOfQuestionsChange.bind(this)}/>
                </div>
                <h3>Quiz Mode:   </h3>


                <QuizQuestionButton button_text="Start" clickHandler={this.handleTestStartClick.bind(this)} />
                <QuizQuestionButton button_text="Reset Quiz Options" clickHandler={this.handleTestResetClick.bind(this)} />


            </div>
        )
    }



}





export default QuizStart