import { useState, useEffect } from 'react'

import Gameplay from './containers/Gameplay'
import Welcome from './containers/Welcome'
import { socket, SocketContext } from './contexts/socket'

const App = () => {
  const [hasNicknameBeenChosen, setHasNicknameBeenChosen] = useState(false)

  useEffect(() => {
    socket.on('connect_error', err => {
      if (err.message === 'invalid nickname') {
        setHasNicknameBeenChosen(false)
      }
    })

    return () => {
      socket.off('connect_error')
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {hasNicknameBeenChosen ? (
        <Gameplay />
      ) : (
        <Welcome setHasNicknameBeenChosen={setHasNicknameBeenChosen} />
      )}
    </SocketContext.Provider>
  )
}

export default App
