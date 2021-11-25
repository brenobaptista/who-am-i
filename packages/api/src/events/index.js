const events = io => {
  io.on('connection', socket => {
    const players = []

    for (let [id, socket] of io.of('/').sockets) {
      players.push({
        id,
        nickname: socket.nickname,
        ready: !!socket.data.characterChosen
      })
    }

    socket.emit('players online', players)

    socket.broadcast.emit('player connected', {
      id: socket.id,
      nickname: socket.nickname
    })

    socket.on('player ready', character => {
      if (character) {
        socket.data.characterChosen = character

        io.emit('player ready', socket.id)

        if (shouldStartGame(io)) {
          const playersWithCharactersAssigned = shufflePlayersAndCharacters(io)

          io.emit('start game', playersWithCharactersAssigned)
        }
      }
    })

    socket.on('disconnect', () => {
      socket.broadcast.emit('player disconnected', socket.id)

      if (shouldStartGame(io)) {
        const playersWithCharactersAssigned = shufflePlayersAndCharacters(io)

        io.emit('start game', playersWithCharactersAssigned)
      }
    })
  })
}

export default events
