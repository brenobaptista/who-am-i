import { useState, useEffect, useContext } from 'react'

import styles from './index.module.css'
import { SocketContext } from '../../contexts/socket'

const Gameplay = () => {
  const socket = useContext(SocketContext)

  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.on('users', users => {
      users.forEach(user => {
        const isSelf = user.userID === socket.id

        user.self = isSelf
      })

      const sortedUsers = users.sort((a, b) => {
        if (a.self) return -1
        if (b.self) return 1

        if (a.username < b.username) return -1

        return a.username > b.username ? 1 : 0
      })

      setUsers(sortedUsers)
    })

    socket.on('user connected', user => {
      setUsers(previousState => [...previousState, user])
    })

    return () => {
      socket.off('users')
      socket.off('user connected')
    }
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>
          <span>Gameplay</span>
          <ul>
            {users.map(user => (
              <li key={user.userId}>{user.username}</li>
            ))}
          </ul>
        </h1>
      </div>
    </div>
  )
}

export default Gameplay
