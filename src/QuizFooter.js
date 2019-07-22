import React, {Component} from 'react'

class QuizFooter extends Component{


    render(){
        const isQuizEnd = ((this.props.quiz_position ) > this.props.quiz.NumberOfQuestions)

        return(
            isQuizEnd ? null : 
            
            <div style={{marginLeft:10, marginRight:30, fontStyle:'italic', fontSize:'1em'}}>
                <div>
                 <div style={{fontWeight:'bold'}} >Question Source :</div>{this.props.quiz.Questions[this.props.quiz_position-1].question_source}</div>
                {this.props.quiz.Questions[this.props.quiz_position-1].exam_topics.length !== 0 ?
                <div style={{paddingTop: 10}}><div style={{fontWeight:'bold' }} >Exam Category :</div><div style={{paddingBottom:20}}>{this.props.quiz.Questions[this.props.quiz_position-1].exam_topics}</div></div>
                : null}
                        
            </div>
                
        )
    }

}

export default QuizFooter