import { useState, useEffect } from 'react'

import Selection from './containers/Selection'
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
        <Selection />
      ) : (
        <Welcome setHasNicknameBeenChosen={setHasNicknameBeenChosen} />
      )}
    </SocketContext.Provider>
  )
}

export default App
