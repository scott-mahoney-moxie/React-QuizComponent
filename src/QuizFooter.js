import React, {Component} from 'react'

class QuizFooter extends Component{


    render(){
        const isQuizEnd = ((this.props.quiz_position ) > this.props.quiz.NumberOfQuestions)

        return(
            isQuizEnd ? null : 
            
            <div className="QuizFooter">
                <div>
                 <div className="QuizFooterQuestionSourceHeader">Question Source :</div>{this.props.quiz.Questions[this.props.quiz_position-1].question_source}</div>
                {this.props.quiz.Questions[this.props.quiz_position-1].exam_topics.length !== 0 ?
                <div className="QuizFooterExamCategorySpacer"><div className="QuizFooterExamCategoryHeader" >Exam Category :</div><div className="QuizFooterPageBottomPad" >{this.props.quiz.Questions[this.props.quiz_position-1].exam_topics}</div></div>
                : null}
                        
            </div>
                
        )
    }

}

export default QuizFooter