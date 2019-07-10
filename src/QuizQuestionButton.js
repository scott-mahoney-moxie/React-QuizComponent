import React, {Component} from 'react'

class QuizQuestionButton extends Component{



    state = { checked: false }
    handleCheckboxChange = event => this.setState({ checked: event.target.checked })

    handleClick(){
        this.props.clickHandler(this.props.button_text)
    }

    render(){
        return(
            <div><button onClick={this.handleClick.bind(this)}>{this.props.button_text}</button></div>
        )

    }

}

export default QuizQuestionButton