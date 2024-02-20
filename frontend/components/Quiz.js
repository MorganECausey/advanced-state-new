import React from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';

function Quiz(props) {
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quizState ? (
          <>
            <h2>{props.quizState.question}</h2>

            <div id="quizAnswers">
              {props.quizState.answers.map(n => {
                return <div className={props.selectedAnswerState === n.answer_id ? "answer selected" : "answer"} 
                key={n.answer_id}>{n.text}
                <button onClick={() => props.selectAnswer(n.answer_id)}>
                  {props.selectedAnswerState === n.answer_id ? "SELECTED" : "select"}
                </button>
              </div>
              })}
            </div>

            <button id="submitAnswerBtn" disabled={!props.selectedAnswerState} onClick={() => props.postAnswer(props.quizState.quiz_id, props.selectedAnswerState)}>Submit answer</button>
          </>
        ) : <div>
          {props.fetchQuiz()}
        Loading next quiz...
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedAnswerState: state.selectedAnswer,
    quizState: state.quiz,
  }
}

export default connect(mapStateToProps, {fetchQuiz, selectAnswer, postAnswer})(Quiz)