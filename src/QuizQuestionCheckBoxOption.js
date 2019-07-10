import React, {Component} from 'react'

class QuizQuestionCheckBoxOption extends Component{



    state = { checked: false }
    handleCheckboxChange = event => {
            this.setState({ checked: event.target.checked }) ;
            console.log('check option has changed');
            console.log(event.target.value);
            console.log(this.props);
            this.props.selectionChangedHander(event.target.value, event.target.checked)
    }

    handleClick(){
        this.props.clickHandler(this.props.button_text)
    }

    render(){
        const Checkbox = props => (
            <input type="checkbox" {...props} value={this.props.button_text} >
            </input>
          )

        return(
            <li><Checkbox  checked={this.state.checked} onChange={this.handleCheckboxChange} /> <label>{this.props.button_text}</label></li>


        )

    }

}

export default QuizQuestionCheckBoxOption