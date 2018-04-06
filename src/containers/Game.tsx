import * as React from 'react'
import { lifecycle, pure } from 'recompose'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import PlayerComponent from '../components/PlayerComponent'
import { GameConfig, initGame, pullOutCard, State } from '../modules/game'
import { Player } from '../models/player'
import { Card } from '../models/card/card'

interface StateToProps {
  players: Player[]
  turn: number
  numOfPlayers: number
  board: Card[]
}

interface DispatchToProps {
  initGame: (config: GameConfig) => void
  pullOutCard: (player: Player, card: Card) => void
}

type Props = StateToProps & DispatchToProps

//
// Implementation
//

const mapStateToProps = (state: State) =>
  ({
    players: state.players,
    turn: state.turn,
    numOfPlayers: state.numOfPlayers,
    board: state.board,
  } as StateToProps)

const mapDispatchToProps = (dispatch: Dispatch<void>) =>
  ({
    initGame: config => dispatch(initGame(config)),
    pullOutCard: (player, card) => dispatch(pullOutCard({ player, card })),
  } as DispatchToProps)

const Game = lifecycle<DispatchToProps, State>({
  componentDidMount() {
    this.props.initGame({ numOfPlayers: 4 })
  },
})(
  pure(function Game({
    players,
    turn,
    numOfPlayers,
    board,
    pullOutCard,
  }: Props) {
    return (
      <div>
        <p>{turn}</p>
        <p>{JSON.stringify(board)}</p>
        {players.map(player => (
          <PlayerComponent
            key={player.id}
            turn={turn}
            numOfPlayers={numOfPlayers}
            player={player}
            onClickCard={card => pullOutCard(player, card)}
          />
        ))}
      </div>
    )
  }),
)

export default connect<StateToProps, DispatchToProps, void, State>(
  mapStateToProps,
  mapDispatchToProps,
)(Game)
