import { useState, useEffect, useContext } from 'react'

import styles from './index.module.css'
import { SocketContext } from '../../contexts/socket'

const Players = () => {
  const socket = useContext(SocketContext)

  const [players, setPlayers] = useState([])

  useEffect(() => {
    socket.on('players', players => {
      const modifiedPlayers = players.map(player => {
        const isSelf = player.id === socket.id

        const modifiedPlayer = { ...player, self: isSelf }

        return modifiedPlayer
      })

      setPlayers(modifiedPlayers)
    })

    socket.on('player connected', player => {
      setPlayers(previousState => [...previousState, player])
    })

    socket.on('player disconnected', id => {
      setPlayers(previousState =>
        previousState.filter(player => player.id !== id)
      )
    })

    return () => {
      socket.off('players')
      socket.off('player connected')
      socket.off('player disconnected')
    }
  }, [])

  return (
    <>
      <div className={styles.title}>Players</div>
      <ul>
        {players.map(player => (
          <li key={player.id} className={player.self ? styles.self : undefined}>
            {player.nickname}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Players
