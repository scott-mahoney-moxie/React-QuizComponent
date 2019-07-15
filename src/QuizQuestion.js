import React, {Component} from 'react'
import QuizQuestionButton from './QuizQuestionButton'
import QuizQuestionCheckBoxOption from './QuizQuestionCheckBoxOption'


class QuizQuestion extends Component{

constructor(props){
    super(props);
    this.state =  {
        IsInReviewMode: this.props.quiz.TestType === "StudyGuide" ? true: false 
    }

}

handleClick(button_text){
    this.handleCheckAnswer(button_text);

    if(button_text === "Next"){ //this.props.quiz_question.correct_otions[0]
        this.props.quiz_question.IsInReviewMode = this.props.quiz.TestType === "StudyGuide" ? true: false;
        this.props.showNextQuestionHandler()
    }else{
        this.props.showPrevQuestionHandler()
        this.props.quiz_question.IsInReviewMode = this.props.quiz.TestType === "StudyGuide" ? true: false;
    }
}

handleCheckAnswer(button_text){
    console.log('Correct option(s): ' + this.props.quiz_question.correct_options);
    console.log('chosen options: ' + this.props.quiz_question.chosen_options);

    console.log('this.props.quiz_question.IsInReviewMode :  ' + this.props.quiz_question.IsInReviewMode );
    this.props.quiz_question.IsInReviewMode = true;
    this.setState({ IsInReviewMode: true });

    console.log('this.props.quiz_question.IsInReviewMode :  ' + this.props.quiz_question.IsInReviewMode );
    console.log('this.state.IsInReviewMode :  ' + this.state.IsInReviewMode );

    this.props.quiz_question.IsAnswered = this.props.quiz_question.chosen_options.length > 0 ? true: false;

    this.props.quiz_question.IsCorrect = this.props.quiz_question.correct_options.equals(this.props.quiz_question.chosen_options);
    console.log('Is ChosenOptions === CorrectOPtions ? ' + this.props.quiz_question.IsCorrect  );

    this.render();
    
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
    console.log('Question render....')
    const isQuiz = (this.props.quiz.TestType === "Quiz");
    this.props.quiz_question.IsInReviewMode = this.isStudyGuide || this.props.quiz_question.IsInReviewMode ;
    this.props.quiz.IsInReviewMode = this.isStudyGuide || this.props.quiz.IsInReviewMode ;

    return(
        <main>
            <section className='QuizQuestion'>
                <p>{this.props.quiz_question.question_text}</p>
            </section>
            <section>
                <ul>
                    {this.props.quiz_question.presented_options.map((presented_option, index) =>{
                        return <QuizQuestionCheckBoxOption quiz ={this.props.quiz}
                                    quiz_question={this.props.quiz_question} 
                                    key={this.props.quiz_question.id+'_'+index} button_text={presented_option}
                                    IsInReviewMode= {this.isStudyGuide || this.state.IsInReviewMode}
                                    selectionChangedHander={this.handleSelectionChanged.bind(this)}
                                   shouldBeChecked = {this.props.quiz_question.chosen_options.indexOf(presented_option) >= 0 ?true: false}
                                />
                    })}
                   
                </ul>
            </section>
            <div className='buttons'>
            <QuizQuestionButton button_text="Prev" clickHandler={this.handleClick.bind(this)} />
            <QuizQuestionButton button_text="Next" clickHandler={this.handleClick.bind(this)} />
            </div>
            <div className='buttons'>
            {isQuiz ? <QuizQuestionButton button_text="Show Answer" clickHandler={this.handleCheckAnswer.bind(this)} /> : null }
            </div>
        </main>
    )
}

}

export default QuizQuestion