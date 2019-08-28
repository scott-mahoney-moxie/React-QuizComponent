import React, {Component} from 'react'
import QuizQuestionButton from './QuizQuestionButton'

class QuizEnd extends Component{


    CalculateNumberOfQuestionsAnswered(){
        var total = 0;
        console.log('Calc :' + this.props.quiz)
        for ( var i = 0, _len = this.props.quiz.NumberOfQuestions; i < _len; i++ ) {
          console.log('** ' + this.props.quiz.Questions[i]['IsAnswered'])
          total += this.props.quiz.Questions[i]['IsAnswered'] ? 1: 0;
        }
        return total;
    }

    CalculateCorrect(){
        var total = 0;
        console.log('Calc :' + this.props.quiz)
        for ( var i = 0, _len = this.props.quiz.NumberOfQuestions; i < _len; i++ ) {
          console.log('** ' + this.props.quiz.Questions[i]['IsCorrect'])
          total += this.props.quiz.Questions[i]['IsCorrect'] ? 1: 0;
        }
        return total;
    }

    CalcPercentageCorrect(){
        console.log(' in calc %')
        console.log('cacl Num Correct: ' + this.CalculateCorrect() )
        console.log ('this.props.quiz.NumberOfQuestions : ' + this.props.quiz.NumberOfQuestions )
        console.log('result is: ' +(this.CalculateCorrect() / this.props.quiz.NumberOfQuestions))
        console.log ('this.props.quiz.PercentageCorrectForPassingScore : ' + this.props.quiz.PercentageCorrectForPassingScore )
        return ((this.CalculateCorrect() / this.props.quiz.NumberOfQuestions) * 100).toFixed(0)
    }

    CalcPercentageCorrectOnlyForQuestionsAnswered(){

        return  this.CalculateNumberOfQuestionsAnswered() === 0 ? null : ((this.CalculateCorrect() / this.CalculateNumberOfQuestionsAnswered()) * 100).toFixed(0)
    }


    handleResetClick(){
        this.props.resetClickHandler()
    }

    handleSetupClick(){
        this.props.setupClickHandler()
    }

    handleTestReviewClick(){
        this.props.quiz.IsInReviewMode= true;
        this.props.reviewClickHandler()
    }

    filterExamTopic(targetValue, arrItem){
        console.log('arrItem.exam_topics')
        return (arrItem.exam_topics !== null && arrItem.exam_topics.length>0 && arrItem.exam_topics[0] === targetValue);
      }

      filterCorrectAnswer(arrItem){
        console.log('arrItem.exam_topics')
        return ( arrItem.IsCorrect );
    }


    getNumberOfTopicQuestions(topic){
        var topicArr = this.props.quiz.Questions.filter(this.filterExamTopic.bind(this,  topic));
        return topicArr.length;
    }
    getNumberOfTopicQuestionsCorrect(topic){
        var topicArr = this.props.quiz.Questions.filter(this.filterExamTopic.bind(this,  topic));
        var correctArr = topicArr.filter(this.filterCorrectAnswer.bind(this));
        return correctArr.length;
    }




    render(){
        return(
            <div style={{marginLeft:10}}>

                { this.props.quiz.TestType !== 'StudyGuide' ?
                <div>
                    <h1>{this.props.quiz.TestType} Results:</h1>
                    
                    <h2>Your score :{this.CalcPercentageCorrect()} %</h2>
                    <h2>You {this.CalcPercentageCorrect() > this.props.quiz.PercentageCorrectForPassingScore ? 'Passed!': 'Failed' } </h2>

                    <h2>{this.CalculateCorrect()} correct out of Questions: {this.props.quiz.NumberOfQuestions}</h2>
                    <br/>                    
                    <h2>Exam Category Breakdown</h2>
                        <div>
                        {this.props.quiz.Topics.map((topic, index) =>{
                            return <div><h3>{topic.key}</h3> - {this.getNumberOfTopicQuestionsCorrect(topic.key)} out of : {this.getNumberOfTopicQuestions(topic.key)} Correct </div>
                            })
                        }
                        </div>
                    </div>
                : null }


                <QuizQuestionButton button_text="Review Results" clickHandler={this.handleTestReviewClick.bind(this)} />
                <QuizQuestionButton button_text="Retake Quiz" clickHandler={this.handleResetClick.bind(this)}/>
                <QuizQuestionButton button_text="Setup a new Quiz/Test" clickHandler={this.handleSetupClick.bind(this)}/>


            </div>
        )
    }

}

export default QuizEnd