import React, {Component} from 'react'
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
            <div className="StartPage">
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
                    <div className="instructionalCopy">
                        <h4>Notes on Selecting a Testing Mode Options: </h4>
                        <b>Study Guide</b> - Will show correct answers highlighted for each question.<br/>
                        <b>Quiz</b> - For each question, 
                            <ul>
                                <li className="instructionText">Will show you Select correct X # of options as hint.</li>
                                <li className="instructionText">Will have a "Show Answer" button at the bottom to reveal correct answer</li>
                            </ul>
                        <b>Test</b> - For each question, will show you "Select correct option(s)" - will not reveal # of options you must select.
                    </div>
                    <br/>


                <h3>Number of Questions: <input type="text" name="numberOfQuestions" 
                                            value={this.state.quizQuestionLength}  
                                            onChange={this.handleNumberOfQuestionsChange.bind(this)}/>
                </h3><div className="instructionalCopy"> (Select from 1 - {this.props.quiz.Questions.length} )</div>
            <br/>
            <br/>


                <QuizQuestionButton button_text="Start" clickHandler={this.handleTestStartClick.bind(this)} />
                <QuizQuestionButton button_text="Reset Quiz Options" clickHandler={this.handleTestResetClick.bind(this)} />


                </form>


            </div>
        )
    }



}





export default QuizStart