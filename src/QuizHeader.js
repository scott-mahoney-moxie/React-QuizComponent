import React, {Component} from 'react'

class QuizHeader extends Component{

    constructor(props){
        super(props)

    }


    render(){
        return(
            <div>
                <h1>{this.props.quiz.quiz_name} - {this.props.quiz.TestType}</h1>
                {this.props.quiz_position <= this.props.quiz.NumberOfQuestions ?
                    <h2>Question # {this.props.quiz_position} out of {this.props.quiz.NumberOfQuestions} </h2>
                : null}
            </div>
        )
    }

}

export default QuizHeader