const events = io => {
  io.on('connection', socket => {
    const players = []

    for (let [id, socket] of io.of('/').sockets) {
      players.push({
        id,
        nickname: socket.nickname
      })
    }

    socket.emit('players', players)

    socket.broadcast.emit('player connected', {
      id: socket.id,
      nickname: socket.nickname
    })

    socket.on('disconnect', () => {
      socket.broadcast.emit('player disconnected', socket.id)
    })
  })
}

export default events
