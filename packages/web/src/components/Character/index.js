import { useState } from 'react'

import styles from './index.module.css'

const Character = () => {
  const [character, setCharacter] = useState('')
  const [hasCharacterBeenSelected, setHasCharacterBeenSelected] =
    useState(false)

  const handleCharacter = event => {
    event.preventDefault()

    setHasCharacterBeenSelected(true)
  }

  return (
    <>
      {hasCharacterBeenSelected ? (
        <div className={styles.container}>
          <span className={styles.title}>You’ve selected {character}</span>
        </div>
      ) : (
        <form onSubmit={handleCharacter} className={styles.container}>
          <div className={styles.title}>Select a famous character</div>
          <input
            required
            type='text'
            placeholder='Albert Einstein'
            value={character}
            onChange={event => setCharacter(event.target.value)}
            className={styles.input}
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
