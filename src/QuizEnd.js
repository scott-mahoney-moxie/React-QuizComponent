import React, {Component} from 'react'
import QuizQuestionButton from './QuizQuestionButton'

class QuizEnd extends Component{


    CalculateNumberOfQuestionsAnswered(){
        var total = 0;
        console.log('Calc :' + this.props.quiz)
        for ( var i = 0, _len = this.props.quiz.NumberOfQuestions; i < _len; i++ ) {
          console.log('** ' + this.props.quiz.Questions[i]['IsAnswered'])
          total += this.props.quiz.Questions[i]['IsAnswered'] ? 1: 0;
        }
        return total;
    }

    CalculateCorrect(){
        var total = 0;
        console.log('Calc :' + this.props.quiz)
        for ( var i = 0, _len = this.props.quiz.NumberOfQuestions; i < _len; i++ ) {
          console.log('** ' + this.props.quiz.Questions[i]['IsCorrect'])
          total += this.props.quiz.Questions[i]['IsCorrect'] ? 1: 0;
        }
        return total;
    }

    CalcPercentageCorrect(){
        console.log(' in calc %')
        console.log('cacl Num Correct: ' + this.CalculateCorrect() )
        console.log ('this.props.quiz.NumberOfQuestions : ' + this.props.quiz.NumberOfQuestions )
        console.log('result is: ' +(this.CalculateCorrect() / this.props.quiz.NumberOfQuestions))
        console.log ('this.props.quiz.PercentageCorrectForPassingScore : ' + this.props.quiz.PercentageCorrectForPassingScore )
        return ((this.CalculateCorrect() / this.props.quiz.NumberOfQuestions) * 100).toFixed(0)
    }

    CalcPercentageCorrectOnlyForQuestionsAnswered(){

        return  this.CalculateNumberOfQuestionsAnswered() ==0? null : ((this.CalculateCorrect() / this.CalculateNumberOfQuestionsAnswered()) * 100).toFixed(0)
    }


    handleResetClick(){
        this.props.resetClickHandler()
    }


    handleTestReviewClick(){
        this.props.quiz.IsInReviewMode= true;
        this.props.reviewClickHandler()
    }



    render(){
        return(
            <div style={{marginLeft:10}}>
                <h1>{this.props.quiz.TestType} Results:</h1>
                
                <h2>Your score :{this.CalcPercentageCorrect()} %</h2>
                <h2>You {this.CalcPercentageCorrect() > this.props.quiz.PercentageCorrectForPassingScore ? 'Passed!': 'Failed' } </h2>

                <h3>Number of Questions: {this.props.quiz.NumberOfQuestions}</h3>
                <h3>Number of Correct Answers:  {this.CalculateCorrect()} </h3>

                { this.props.quiz.TestType != 'Test' ?
                    <div><h4>Number of Questions Answered : {this.CalculateNumberOfQuestionsAnswered()}</h4>
                    <h4>Percentage correct :{this.CalcPercentageCorrectOnlyForQuestionsAnswered()} % </h4> (based on Questions Answered )</div>
                   
                : null }


                <QuizQuestionButton button_text="Review Results" clickHandler={this.handleTestReviewClick.bind(this)} />
                <QuizQuestionButton button_text="Reset Quiz" clickHandler={this.handleResetClick.bind(this)}/>


            </div>
        )
    }

}

export default QuizEnd