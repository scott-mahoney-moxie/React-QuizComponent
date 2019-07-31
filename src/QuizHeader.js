import React, {Component} from 'react'

class QuizHeader extends Component{


    getResult(){
        return (
            (this.props.quiz_position <= this.props.quiz.NumberOfQuestions) ? 

            this.props.quiz.Questions[this.props.quiz_position-1].IsCorrect ?
            <span className="CorrectText">Correct</span>
            :<span className="InCorrectText">Incorrect</span>
            : null
        )
    }

    render(){
        return(
            <div className="QuizHeader" >
                <h1>{this.props.quiz.quiz_name} - {this.props.quiz.TestType}</h1>
                {this.props.quiz_position <= this.props.quiz.NumberOfQuestions ?
                    <div>
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