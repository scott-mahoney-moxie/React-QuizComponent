import React, {Component} from 'react'

class QuizEnd extends Component{

    constructor(props){
        super(props)

    }

    CalculateNumberOfQuestionsAnswered(){
        var total = 0;
        console.log('Calc :' + this.props.quiz)
        for ( var i = 0, _len = this.props.quiz.Questions.length; i < _len; i++ ) {
          console.log('** ' + this.props.quiz.Questions[i]['IsAnswered'])
          total += this.props.quiz.Questions[i]['IsAnswered'] ? 1: 0;
        }
        return total;
    }

    CalculateCorrect(){
        var total = 0;
        console.log('Calc :' + this.props.quiz)
        for ( var i = 0, _len = this.props.quiz.Questions.length; i < _len; i++ ) {
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
        return (this.CalculateCorrect() / this.props.quiz.NumberOfQuestions) * 100
    }

    CalcPercentageCorrectOnlyForQuestionsAnswered(){

        return  ((this.CalculateCorrect() / this.CalculateNumberOfQuestionsAnswered()) * 100).toFixed(0)
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
            <div>
                <h1>{this.props.quiz.TestType} Results:</h1>
                
                <h2>Your score :{this.CalcPercentageCorrect()} %</h2>
                <h2>You {this.CalcPercentageCorrect() > this.props.quiz.PercentageCorrectForPassingScore ? 'Passed!': 'Failed' } </h2>

                <h3>Number of Questions: {this.props.quiz.NumberOfQuestions}</h3>
                <h3>Number of Correct Answers:  {this.CalculateCorrect()} </h3>

                { this.props.quiz.TestType != 'Test' ?
                    <div><h4>Number of Questions Answered : {this.CalculateNumberOfQuestionsAnswered()}</h4>
                    <h4>Percentage correct, based on Questions Answered :{this.CalcPercentageCorrectOnlyForQuestionsAnswered()} %</h4></div>
                : null }

                <a href='#' onClick={this.handleTestReviewClick.bind(this)}>Review Results</a>
                <br/>

                <a href='#' onClick={this.handleResetClick.bind(this)}>Reset Quiz</a>

            </div>
        )
    }

}

export default QuizEnd