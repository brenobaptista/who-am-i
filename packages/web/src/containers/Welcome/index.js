import { useState, useContext } from 'react'

import styles from './index.module.css'
import { SocketContext } from '../../contexts/socket'

const Welcome = ({ setHasUsernameBeenSelected }) => {
  const socket = useContext(SocketContext)

  const [username, setUsername] = useState('')

  const handleUsername = event => {
    event.preventDefault()

    setHasUsernameBeenSelected(true)

    socket.auth = { username }

    socket.connect()
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleUsername}>
        <div className={styles.title}>What is your username?</div>
        <input
          required
          type='text'
          placeholder='John Doe'
          value={username}
          onChange={event => setUsername(event.target.value)}
          className={styles.input}
        />
        <button type='submit' className={styles.button}>
          Enter →
        </button>
      </form>
    </div>
  )
}

export default Welcome
