import { useState, useEffect } from 'react'

import Game from './containers/Game'
import Welcome from './containers/Welcome'
import { socket, SocketContext } from './contexts/socket'

const App = () => {
  const [hasNicknameBeenChosen, setHasNicknameBeenChosen] = useState(false)
  const [participantPlayers, setParticipantPlayers] = useState([])

  useEffect(() => {
    socket.on('connect_error', err => {
      if (err.message === 'invalid nickname') {
        setHasNicknameBeenChosen(false)
      }
    })

    socket.on('start game', players => {
      setParticipantPlayers(players)
    })

    return () => {
      socket.off('connect_error')
      socket.off('start game')
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {hasNicknameBeenChosen ? (
        <Game participantPlayers={participantPlayers} />
      ) : (
        <Welcome setHasNicknameBeenChosen={setHasNicknameBeenChosen} />
      )}
    </SocketContext.Provider>
  )
}

export default App
