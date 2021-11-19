import { useState, useEffect } from 'react'

import Gameplay from './containers/Gameplay'
import Welcome from './containers/Welcome'
import { socket, SocketContext } from './contexts/socket'

const App = () => {
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false)

  useEffect(() => {
    socket.on('connect_error', err => {
      if (err.message === 'invalid username') {
        setUsernameAlreadySelected(false)
      }
    })

    return () => {
      socket.off('connect_error')
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {usernameAlreadySelected ? (
        <Gameplay />
      ) : (
        <Welcome setUsernameAlreadySelected={setUsernameAlreadySelected} />
      )}
    </SocketContext.Provider>
  )
}

export default App
