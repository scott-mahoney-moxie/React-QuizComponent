import React, {Component} from 'react'

class QuizHeader extends Component{


    getResult(){
        return (
            (this.props.quiz_position <= this.props.quiz.NumberOfQuestions) ? 

            this.props.quiz.Questions[this.props.quiz_position-1].IsCorrect ?
            <span style={{color:'green'}}>Correct</span>
            :<span style={{color:'red'}}>Incorrect</span>
            : null
        )
    }

    render(){
        return(
            <div style={{marginLeft:10, marginRight:30}}>
                <h1>{this.props.quiz.quiz_name} - {this.props.quiz.TestType}</h1>
                {this.props.quiz_position <= this.props.quiz.NumberOfQuestions ?
                    <div>
                    <h2>Question # {this.props.quiz_position} out of {this.props.quiz.NumberOfQuestions} </h2>

                    {this.props.quiz.Questions[this.props.quiz_position-1].IsAnswered  && this.props.quiz.IsInReviewMode?
                        <h2>This question/response is : {this.getResult()}
                        </h2>
        
                        :null
                        
                        }
                    </div>
                : null}
            </div>
        )
    }

}

export default QuizHeader