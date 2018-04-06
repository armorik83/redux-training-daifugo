import * as React from 'react'
import { pure } from 'recompose'

import { Player } from '../models/player'
import { Card } from '../models/card/card'

interface Props {
  player: Player
  turn: number
  numOfPlayers: number
  onClickCard: (card: Card) => void
}

export default pure(function PlayerComponent({
  player,
  turn,
  numOfPlayers,
  onClickCard,
}: Props) {
  if (turn % numOfPlayers === player.order) {
    return (
      <div>
        {player.hand.toArray().map((card, i) => (
          <button key={i} onClick={() => onClickCard(card)}>
            {card.toString()}
          </button>
        ))}
      </div>
    )
  }

  return <p>{player.toString()}</p>
})
