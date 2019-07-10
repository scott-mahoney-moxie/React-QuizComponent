import React, {Component} from 'react'
import QuizQuestionButton from './QuizQuestionButton'
import QuizQuestionCheckBoxOption from './QuizQuestionCheckBoxOption'
import {AppConsumer} from './AppContext'


// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length){
        console.log('The chosen options contains different set of options than the correct set.');
        return false;
    }
    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        console.log('check for: ' + this[i]);
        console.log('indexOf Returned: '+ array.indexOf(this[i]));
        if (array.indexOf(this[i]) < 0 ){
            console.log(this[i] + ' was not found.');
            return false;          
        }
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});



class QuizQuestion extends Component{

constructor(props){
    super(props)
    this.state = {incorrectAnswer : false}
}

handleClick(button_text){
    if(button_text === "Next"){ //this.props.quiz_question.correct_otions[0]
        this.setState({incorrectAnswer:false})
        console.log('call increment....')
        this.props.showNextQuestionHandler()
    }else{
        this.setState({incorrectAnswer:true})
        this.props.showPrevQuestionHandler()
    }
}

handleCheckAnswer(button_text){
    console.log('Correct option(s): ' + this.props.quiz_question.correct_options);
    console.log('chosen options: ' + this.props.quiz_question.chosen_options);

    console.log('Is ChosenOptions === CorrectOPtions ? ' + this.props.quiz_question.correct_options.equals(this.props.quiz_question.chosen_options));

    
}

handleSelectionChanged(chosenOption, isChosen){
    console.log('Selected option is: ' + chosenOption);
    console.log('Is Chosen: ' + isChosen );
    console.log('Before: ' + this.props.quiz_question.chosen_options);
    var optionIndex = this.props.quiz_question.chosen_options.indexOf(chosenOption);
    if (isChosen){
        optionIndex === -1 ? this.props.quiz_question.chosen_options.push(chosenOption) : console.log("This item already exists");
        console.log("check if Added");
        console.log(this.props.quiz_question.chosen_options);
    }else{
        optionIndex === -1 ? console.log('not in chosen list, so ignore') : this.props.quiz_question.chosen_options.splice(optionIndex, 1)
        console.log("check if removed");
        console.log(this.props.quiz_question.chosen_options);
    }
    
}

render(){
    return(
        <main>
            <section>
                <p>{this.props.quiz_question.question_text}</p>
            </section>
            <section>
                <ul>
                    {this.props.quiz_question.presented_options.map((presented_option, index) =>{
                        return <QuizQuestionCheckBoxOption key={index} button_text={presented_option}
                                    clickHandler={this.handleClick.bind(this)}
                                    selectionChangedHander={this.handleSelectionChanged.bind(this)}
                                />
                    })}
                   
                </ul>
            </section>
            <div >
            <QuizQuestionButton button_text="Prev" clickHandler={this.handleClick.bind(this)} />
            <QuizQuestionButton button_text="Check my Answer" clickHandler={this.handleCheckAnswer.bind(this)} />
            <QuizQuestionButton button_text="Next" clickHandler={this.handleClick.bind(this)} />
            </div>
            {this.state.incorrectAnswer ? <p className='error'>Sorry, that's not right</p> : null}

        </main>
    )
}

}

export default QuizQuestion