import React, {Component} from 'react'

class QuizQuestionCheckBoxOption extends Component{
    constructor(props){
        super(props);
        console.log('constructor')
        this.state = { 
            checked :  this.props.quiz_question.chosen_options.indexOf(this.props.button_text) >=0,
            IsInReviewMode: this.props.quiz_question.IsInReviewMode   
        }
        console.log('constructor state: ' + this.state.checked)
    }

    
    toggleButton() {
        console.log('current state of button: ' + this.state.checked)
        var checkedValue = this.state.checked;
        var newCheckedValue = !checkedValue;
        console.log('newCheckedValue: ' + newCheckedValue)
        this.setState({ checked: newCheckedValue }) ;
        //this.state.checked = newCheckedValue;
        console.log('check option has changed to: ' + this.state.checked);
        console.log('now send to parent handler')
        this.props.selectionChangedHander(this.props.button_text, newCheckedValue)
}

    handleClick(){
        this.props.clickHandler(this.props.button_text)
    }




    checkmark() {
        const element = (
          <span style={{fontSize:22}}>
            &#10004;
          </span>
        );
        return element
      }

      emptyMark() {
        const element = (
          <span style={{fontSize:22}}>
            &nbsp;
          </span>
        );
        return element
      }

    getStyle(){
        console.log('quiz review mode: ' + this.props.quiz.IsInReviewMode)
        console.log('question review mode: ' + this.props.quiz_question.IsInReviewMode)

        if (! this.props.quiz.IsInReviewMode && !this.props.quiz_question.IsInReviewMode){
          return null
        }

        if (this.props.quiz_question.correct_options.indexOf(this.props.button_text) >=0 &&
            this.props.quiz_question.chosen_options.indexOf(this.props.button_text) >=0){
          return 'SelectedCorrectAnswer' 
        }else if (this.props.quiz_question.correct_options.indexOf(this.props.button_text) >=0 ){
          return 'CorrectAnswer' 
        }else if (this.props.quiz_question.chosen_options.indexOf(this.props.button_text) >=0 ){
          return 'InCorrectAnswer'
        }

        return 'button'
    }

    render(){
        console.log('render option')
        return(
            <span   >
             <button className={this.getStyle()} 
                      onClick={this.toggleButton.bind(this)}>
                      
                      { this.props.quiz_question.chosen_options.indexOf(this.props.button_text) >=0 ? this.checkmark() : this.emptyMark()  } {this.props.button_text}
                      </button>
             </span>

        )

    }

}

export default QuizQuestionCheckBoxOption