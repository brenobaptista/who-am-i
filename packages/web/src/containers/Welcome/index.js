import { useState, useContext } from 'react'

import styles from './index.module.css'
import { SocketContext } from '../../contexts/socket'

const Welcome = ({ setHasNicknameBeenChosen }) => {
  const socket = useContext(SocketContext)

  const [nickname, setNickname] = useState('')

  const handleNickname = event => {
    event.preventDefault()

    setHasNicknameBeenChosen(true)

    socket.auth = { nickname }

    socket.connect()
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleNickname}>
        <div className={styles.title}>What is your nickname?</div>
        <input
          required
          type='text'
          placeholder='John Doe'
          value={nickname}
          onChange={event => setNickname(event.target.value)}
        />
        <button type='submit'>Enter →</button>
      </form>
    </div>
  )
}

export default Welcome
