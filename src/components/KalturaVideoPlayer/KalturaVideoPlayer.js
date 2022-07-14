import React from 'react';
import './style.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Template_1 from '../QuestionTemplates/Template_1/Template_1';
import Template_2 from '../QuestionTemplates/Template_2/Template_2';

class KalturaVideoPlayer extends React.Component {
    //https://developer.kaltura.com/player/web/getting-started-web
    //https://developer.kaltura.com/player/web/player-events-web
    //https://github.com/kaltura/playkit-js/blob/master/src/event/event-type.js


    constructor(props) {
      super(props);

      this.state = {
        currentQuestion: -1, 
        showOverlay: false,
        questions: [
          {
            "timestamp": 5,
            "question": "Which answer is correct?",
            "type": "TEMPLATE_1",
            "answers": [
              {
                "text": "Answer 1",
                "correct": true
              },
              {
                "text": "Answer 2",
                "correct": false
              }
            ]
          },
          {
            "timestamp": 10,
            "question": "Which answer is correct?",
            "type": "TEMPLATE_2",
            "answers": [
              {
                "text": "Answer 1",
                "correct": true
              },
              {
                "text": "Answer 2",
                "correct": false
              },
              {
                "text": "Answer 3",
                "correct": false
              }
            ]
          }
        ]
      };
    }

    componentDidMount() {
      var kalturaPlayer = window.KalturaPlayer.setup({
        targetId: "kaltura_player",
        provider: {
          partnerId: 2538842,
          uiConfId: 50262292
        },
        playback: {
            pictureInPicture: false,
        }
      });

      this.setState({
        kalturaPlayer: kalturaPlayer
      })
      
      kalturaPlayer.loadMedia({entryId: '1_5s64q0yh'});

      kalturaPlayer.addEventListener(kalturaPlayer.Event.Core.TIME_UPDATE, event => {
        for (let i = 0; i < this.state.questions.length; ++i) {
          let currentQuestion = this.state.questions[i];

          if (kalturaPlayer.currentTime >= currentQuestion.timestamp && this.state.currentQuestion < i) {
            this.loadQuestion(kalturaPlayer, i);
          }
        }
      });

      kalturaPlayer.addEventListener(kalturaPlayer.Event.Core.PLAY, event => {
        this.setState({
          showOverlay: false,
        })
      });
    }

    loadQuestion = (kalturaPlayer, questionIndex) => {
      kalturaPlayer.pause();

      this.setState({
        showOverlay: true,
        currentQuestion: questionIndex
      })
    }

    hideOverlay = () => {
      setTimeout(() => {
        this.setState({
          showOverlay: false,
        });
        this.state.kalturaPlayer.play();
      }, 1000)
    }

    answerQuestion = (isCorrect) => {
      if (isCorrect) {
        toast.success("Correct!");
      }
      else {
        toast.error("Wrong!");
      }

      this.hideOverlay();
    }

    render() {
      return <>
        <div className="flex-container">
          <div id="kaltura_player"></div>
        </div>

        <div className="overlay-container">
          {this.state.showOverlay && <div id="overlay">

            {this.state.questions[this.state.currentQuestion].type == 'TEMPLATE_1' &&
              <Template_1 data={this.state.questions[this.state.currentQuestion]} answerQuestion={this.answerQuestion} />
            }

            {this.state.questions[this.state.currentQuestion].type == 'TEMPLATE_2' &&
              <Template_2 data={this.state.questions[this.state.currentQuestion]} answerQuestion={this.answerQuestion} />
            }

          </div>}
        </div>
        <ToastContainer />
      </>;
    }
}

export default KalturaVideoPlayer