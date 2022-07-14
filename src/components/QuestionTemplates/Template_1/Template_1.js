import React from 'react';
import './style.css';

class Template_1 extends React.Component {

    answerQuestion = (answerIndex) => {
        this.props.answerQuestion(this.props.data.answers[answerIndex].correct);
    }

    render() {
        return <>
            <div>{this.props.data.question}</div>
            <div className="button-container">
                <div onClick={() => {this.answerQuestion(0)}}>{this.props.data.answers[0].text}</div>
                <div onClick={() => {this.answerQuestion(1)}}>{this.props.data.answers[1].text}</div>
            </div>
        </>
    }

}

export default Template_1