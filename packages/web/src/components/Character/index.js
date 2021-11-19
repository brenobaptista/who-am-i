import { useState } from 'react'

import styles from './index.module.css'

const Character = ({ setHasCharacterBeenSelected }) => {
  const [character, setCharacter] = useState('')

  const handleCharacter = event => {
    event.preventDefault()

    setHasCharacterBeenSelected(true)
  }

  return (
    <form onSubmit={handleCharacter} className={styles.form}>
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
  )
}

export default Character
