import React from 'react';
import './style.css';

class Template_2 extends React.Component {

    answerQuestion = (answerIndex) => {
        this.props.answerQuestion(this.props.data.answers[answerIndex].correct);
    }

    render() {
        return <>
            <div>{this.props.data.question}</div>
            <div className="button-container">
                {this.props.data.answers.map((answer, index) => (
                    <div key={index}>
                        <label>{answer.text}</label>
                        <input type="checkbox" value={answer.text} />
                    </div>
                ))}
            </div>
            <div className="submit-btn" onClick={() => {this.answerQuestion(0)}}>
                <span>Submit</span>
            </div>
        </>
    }

}

export default Template_2