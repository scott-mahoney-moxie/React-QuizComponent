import React, {Component} from 'react'

class QuizFooter extends Component{


    render(){
        return(
            <div style={{marginLeft:10, marginRight:30, fontStyle:'italic', fontSize:'1em'}}>
                <div>
                 <div style={{fontWeight:'bold'}} >Question Source :</div>{this.props.quiz.Questions[this.props.quiz_position-1].question_source}</div>
                {this.props.quiz.Questions[this.props.quiz_position-1].exam_topics.length !== 0 ?
                <div><div style={{fontWeight:'bold'}} >Exam Category :</div><div>{this.props.quiz.Questions[this.props.quiz_position-1].exam_topics}</div></div>
                : null}
                        
            </div>
        )
    }

}

export default QuizFooter