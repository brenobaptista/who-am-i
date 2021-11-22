import { useState, useEffect } from 'react'

import Gameplay from './containers/Gameplay'
import Welcome from './containers/Welcome'
import { socket, SocketContext } from './contexts/socket'

const App = () => {
  const [hasNicknameBeenSelected, setHasNicknameBeenSelected] = useState(false)

  useEffect(() => {
    socket.on('connect_error', err => {
      if (err.message === 'invalid nickname') {
        setHasNicknameBeenSelected(false)
      }
    })

    return () => {
      socket.off('connect_error')
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {hasNicknameBeenSelected ? (
        <Gameplay />
      ) : (
        <Welcome setHasNicknameBeenSelected={setHasNicknameBeenSelected} />
      )}
    </SocketContext.Provider>
  )
}

export default App
