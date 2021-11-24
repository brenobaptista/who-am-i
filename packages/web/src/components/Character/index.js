import { useState, useContext } from 'react'

import styles from './index.module.css'
import { SocketContext } from '../../contexts/socket'

const Character = () => {
  const socket = useContext(SocketContext)

  const [character, setCharacter] = useState('')
  const [hasCharacterBeenChosen, setHasCharacterBeenChosen] = useState(false)

  const handleCharacter = event => {
    event.preventDefault()

    setHasCharacterBeenChosen(true)

    socket.emit('player ready', character)
  }

  return (
    <>
      {hasCharacterBeenChosen ? (
        <div className={styles.container}>
          <span className={styles.title}>You’ve chosen {character}</span>
        </div>
      ) : (
        <form onSubmit={handleCharacter} className={styles.container}>
          <div className={styles.title}>Choose a famous character</div>
          <input
            required
            type='text'
            placeholder='Albert Einstein'
            value={character}
            onChange={event => setCharacter(event.target.value)}
          />
          <button type='submit' className={styles.button}>
            Play
          </button>
        </form>
      )}
    </>
  )
}

export default Character
