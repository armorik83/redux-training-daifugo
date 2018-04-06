import * as React from 'react'
import { lifecycle, pure } from 'recompose'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { GameConfig, initGame, State } from '../modules/game'
import { Player } from '../models/player'
import PlayerComponent from '../components/PlayerComponent'

interface StateToProps {
  players: Player[]
  turn: number
}

interface DispatchToProps {
  initGame: (config: GameConfig) => void
}

type Props = StateToProps & DispatchToProps

//
// Implementation
//

const mapStateToProps = (state: State) =>
  ({
    players: state.players,
    turn: state.turn,
  } as StateToProps)

const mapDispatchToProps = (dispatch: Dispatch<void>) =>
  ({
    initGame: config => dispatch(initGame(config)),
  } as DispatchToProps)

const Game = lifecycle<DispatchToProps, State>({
  componentDidMount() {
    this.props.initGame({ numOfPlayers: 4 })
  },
})(
  pure(function Game({ players, turn }: Props) {
    return (
      <div>
        <p>{turn}</p>
        {players.map(player => (
          <PlayerComponent key={player.id} player={player} />
        ))}
      </div>
    )
  }),
)

export default connect<StateToProps, DispatchToProps, void, State>(
  mapStateToProps,
  mapDispatchToProps,
)(Game)
