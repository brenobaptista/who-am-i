import { useState, useEffect, useContext } from 'react'

import styles from './index.module.css'
import { SocketContext } from '../../contexts/socket'

const Gameplay = ({ participantPlayers }) => {
  const socket = useContext(SocketContext)

  const [players, setPlayers] = useState([])
  const [characterAssigned, setCharacterAssigned] = useState('')
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    const playersWithSelf = participantPlayers.map(player => {
      const isSelf = player.id === socket.id

      const playerWithSelf = { ...player, self: isSelf }

      return playerWithSelf
    })

    const index = playersWithSelf.findIndex(player => player.id === socket.id)

    setCharacterAssigned(playersWithSelf[index].characterAssigned)

    playersWithSelf[index].characterAssigned = ''

    setPlayers(playersWithSelf)
  }, [])

  useEffect(() => {
    socket.on('game over', id => {
      setPlayers(previousState =>
        previousState.map(player =>
          player.id === id ? { ...player, gameOver: true } : { ...player }
        )
      )
    })

    return () => {
      socket.off('game over')
    }
  }, [])

  const handleGameOver = () => {
    setIsGameOver(true)

    socket.emit('game over')
  }

  return (
    <>
      <div className={styles.title}>Now, who am I?</div>
      {players.map(player => (
        <div key={player.id} className={player.self ? styles.bold : undefined}>
          <span className={player.gameOver ? styles.lineThrough : undefined}>
            {player.nickname}
            {player.characterAssigned && ` (${player.characterAssigned})`}
          </span>
        </div>
      ))}
      <button type='button' className={styles.button} onClick={handleGameOver}>
        Game Over
      </button>
      {isGameOver && (
        <p>
          You are <span className={styles.bold}>{characterAssigned}</span>
        </p>
      )}
    </>
  )
}

export default Gameplay
