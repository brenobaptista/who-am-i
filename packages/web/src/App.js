import { useState, useEffect } from 'react'

import Gameplay from './containers/Gameplay'
import Welcome from './containers/Welcome'
import { socket, SocketContext } from './contexts/socket'

const App = () => {
  const [hasUsernameBeenSelected, setHasUsernameBeenSelected] = useState(false)

  useEffect(() => {
    socket.on('connect_error', err => {
      if (err.message === 'invalid username') {
        setHasUsernameBeenSelected(false)
      }
    })

    return () => {
      socket.off('connect_error')
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {hasUsernameBeenSelected ? (
        <Gameplay />
      ) : (
        <Welcome setHasUsernameBeenSelected={setHasUsernameBeenSelected} />
      )}
    </SocketContext.Provider>
  )
}

export default App
