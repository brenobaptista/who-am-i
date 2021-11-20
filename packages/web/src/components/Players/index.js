import { useState, useEffect, useContext } from 'react'

import styles from './index.module.css'
import { SocketContext } from '../../contexts/socket'

const Players = () => {
  const socket = useContext(SocketContext)

  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.on('users', users => {
      const modifiedUsers = [...users]

      modifiedUsers.forEach(user => {
        const isSelf = user.userId === socket.id

        user.self = isSelf
      })

      setUsers(modifiedUsers)
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
    <>
      <div className={styles.title}>Players</div>
      <ul>
        {users.map(user => (
          <li key={user.userId} className={user.self ? styles.self : undefined}>
            {user.username}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Players
