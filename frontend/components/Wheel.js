import React from 'react'
import { connect } from 'react-redux' 
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

function Wheel(props) {
  return (
    <div id="wrapper">
      <div id="wheel">
        {[0,1,2,3,4,5].map(n => {
          return <div className={props.clockwisePosition === n ? 'cog active' : 'cog'}
          style={{"--i":n}} key={n}>{props.clockwisePosition === n ? "B" : ""}</div>
        })}
      </div>

      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => props.moveCounterClockwise(props.clockwisePosition)}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() => props.moveClockwise(props.clockwisePosition)}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    clockwisePosition: state.wheel,
  }
}
export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel)