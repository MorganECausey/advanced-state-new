// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios"
import { MOVE_CLOCKWISE,
MOVE_COUNTERCLOCKWISE,
SET_QUIZ_INTO_STATE,
SET_SELECTED_ANSWER,
SET_INFO_MESSAGE,
INPUT_CHANGE,
RESET_FORM
} from "./action-types"

export function moveClockwise(currentPosition) {
  return(
    {type: MOVE_CLOCKWISE, payload: currentPosition}
  )
}

export function moveCounterClockwise(currentPosition) {
  return(
    {type: MOVE_COUNTERCLOCKWISE, payload: currentPosition}
  );
}

export function selectAnswer(id) {
  return{type: SET_SELECTED_ANSWER, payload: id}
}

export function setMessage(message) {
  return{type: SET_INFO_MESSAGE, payload: message}
}

export function setQuiz(status) {
  return{type: SET_QUIZ_INTO_STATE, payload: status}
}

export function inputChange(name, value) {
  return{type: INPUT_CHANGE, payload: [name, value]}
}

export function resetForm() {
  return{type: RESET_FORM}
}

// ❗ Async action creators
export const fetchQuiz = () => dispatch => {
  dispatch(setQuiz(null));
  axios.get(`http://localhost:9000/api/quiz/next`)
  .then(res => {
    dispatch(setQuiz(res.data))
  })
  .catch(err => console.error(err.message));
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }

export const postAnswer = (quizId, answerId) => dispatch => {
  const finalAnswer ={quiz_id: quizId, answer_id: answerId}
  axios.post(`http://localhost:9000/api/quiz/answer`, finalAnswer)
  .then(res => {
    dispatch(selectAnswer(null))
    dispatch(setMessage(res.data.message))
    dispatch(fetchQuiz())
  })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }

export const postQuiz = (quizValuesObj) => dispatch => {
  axios.post(`http://localhost:9000/api/quiz/new`, quizValuesObj)
  .then(res => {
    dispatch(setMessage(`Congrats "${res.data.question}" is a great question!`))
    dispatch(resetForm());
  })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state