import React, {Component} from 'react'
import Quiz from './Quiz.js'
import QuizQuestionButton from './QuizQuestionButton'

class QuizStart extends Component{
    constructor(props){
        super(props)

        this.state = {
            quizQuestionLength: 65,
            testingType: 'Test'
        }
        this.handleTestTypeChange = this.handleTestTypeChange.bind(this);


    }

    handleTestTypeChange(event) {
        this.setState({testingType: event.target.value});
    }


    


    handleTestStartClick(){
        this.props.startClickHandler(this.state.testingType, this.state.quizQuestionLength)
    }

    handleTestResetClick(){
        this.props.resetClickHandler()
    }

    handleNumberOfQuestionsChange(event) {
        console.log('QuizStart: handleNumberOfQuestionsChange: ' +  event.target.value);
        this.setState({quizQuestionLength: event.target.value})
        this.props.numberOfQuestionsChangedHandler(event.target.value)
    }

 

    render(){
        return(
            <div style={{marginLeft:10}}>
                <h1>Quiz Maker - Start</h1>
                
                
                <form onSubmit={this.handleSubmit}>
                    <h3>
                    Testing Mode:
                    <select value={this.state.testingType} onChange={this.handleTestTypeChange}>
                        <option value="Test">Test</option>
                        <option value="Quiz">Quiz</option>
                        <option value="StudyGuide">Study Guide</option>
                    </select>
                    </h3>

                    <br/>
                    <br/>

                <h3>Number of Questions: <input type="text" name="numberOfQuestions" 
                                            value={this.state.quizQuestionLength}  
                                            onChange={this.handleNumberOfQuestionsChange.bind(this)}/>
                </h3>



                <QuizQuestionButton button_text="Start" clickHandler={this.handleTestStartClick.bind(this)} />
                <QuizQuestionButton button_text="Reset Quiz Options" clickHandler={this.handleTestResetClick.bind(this)} />


                </form>


            </div>
        )
    }



}





export default QuizStart