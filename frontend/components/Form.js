import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {inputChange, postQuiz} from '../state/action-creators'

export function Form(props) {

  const formData = useSelector(state => state.form);
  const dispatch = useDispatch();

  const onChange = evt => {
    const {name, value} = evt.target;
    dispatch(inputChange(name, value));
    localStorage.setItem('formData', JSON.stringify({...formData, [name]: value}));
  }

  const onSubmit = evt => {
    evt.preventDefault();
    const quizObj = {
      newQuestion: props.formData.newQuestion,
      newTrueAnswer: props.formData.newTrueAnswer,
      newFalseAnswer: props.formData.newFalseAnswer,
    }
    props.postQuiz(quizObj)
  }

  const condition = Object.values(formData).some(value => value.trim().length <= 0);

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input name="newQuestion" maxLength={50} onChange={(evt) => onChange(evt)} id="newQuestion" placeholder="Enter question" value={props.formData.newQuestion}/>
      <input name="newTrueAnswer" maxLength={50} onChange={(evt) => onChange(evt)} id="newTrueAnswer" placeholder="Enter true answer" value={props.formData.newTrueAnswer}/>
      <input name="newFalseAnswer" maxLength={50} onChange={(evt) => onChange(evt)} id="newFalseAnswer" placeholder="Enter false answer" value={props.formData.newFalseAnswer}/>
      <button id="submitNewQuizBtn" disabled={condition}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    formData: state.form,
  }
}

export default connect(mapStateToProps, {inputChange, postQuiz})(Form)
