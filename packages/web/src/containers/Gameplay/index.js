import { useState, useEffect, useContext } from 'react'

import styles from './index.module.css'
import { SocketContext } from '../../contexts/socket'

const Gameplay = () => {
  const socket = useContext(SocketContext)

  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.on('users', users => {
      users.forEach(user => {
        const isSelf = user.userId === socket.id

        user.self = isSelf
      })

      setUsers(users)
    })

    socket.on('user connected', user => {
      setUsers(previousState => [...previousState, user])
    })

    socket.on('user disconnected', id => {
      setUsers(previousState =>
        previousState.filter(user => user.userId !== id)
      )
    })

    return () => {
      socket.off('users')
      socket.off('user connected')
      socket.off('user disconnected')
    }
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>
          <span>Gameplay</span>
        </h1>
        <ul>
          {users.map(user => (
            <li
              key={user.userId}
              className={user.self ? styles.self : undefined}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Gameplay
