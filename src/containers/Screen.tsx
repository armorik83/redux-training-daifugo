import * as React from 'react'
import { pure } from 'recompose'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { playGame } from '../reducers/environment'
import { State } from '../reducers'

interface StateToProps {
  gameIsRunning: boolean
}

interface DispatchToProps {
  playGame: () => void
}

type Props = StateToProps & DispatchToProps

//
// Implementation
//

const mapStateToProps = (state: State) =>
  ({
    gameIsRunning: state.environment.gameIsRunning,
  } as StateToProps)

const mapDispatchToProps = (dispatch: Dispatch<void>) =>
  ({
    playGame: () => dispatch(playGame({})),
  } as DispatchToProps)

const Screen = pure(function Game({ gameIsRunning, playGame }: Props) {
  if (!gameIsRunning) {
    return <button onClick={() => playGame()}>playGame</button>
  }
  return <p>running!</p>
})

export default connect<StateToProps, DispatchToProps, void, State>(
  mapStateToProps,
  mapDispatchToProps,
)(Screen)
