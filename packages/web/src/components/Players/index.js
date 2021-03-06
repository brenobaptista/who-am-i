import { useState, useEffect, useContext } from 'react'

import styles from './index.module.css'
import { SocketContext } from '../../contexts/socket'

const Players = () => {
  const socket = useContext(SocketContext)

  const [players, setPlayers] = useState([])

  useEffect(() => {
    socket.on('players online', players => {
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

    socket.on('player ready', id => {
      setPlayers(previousState =>
        previousState.map(player =>
          player.id === id ? { ...player, ready: true } : { ...player }
        )
      )
    })

    socket.on('player disconnected', id => {
      setPlayers(previousState =>
        previousState.filter(player => player.id !== id)
      )
    })

    return () => {
      socket.off('players online')
      socket.off('player connected')
      socket.off('player ready')
      socket.off('player disconnected')
    }
  }, [])

  return (
    <>
      <div className={styles.title}>Players</div>
      {players.map(player => (
        <div key={player.id} className={player.self ? styles.bold : undefined}>
          <label>
            <input type='checkbox' checked={player.ready} readOnly />
            <span>{player.nickname}</span>
          </label>
        </div>
      ))}
    </>
  )
}

export default Players
