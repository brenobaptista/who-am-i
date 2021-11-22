const auth = io => {
  io.use((socket, next) => {
    const { username } = socket.handshake.auth

    if (!username) {
      return next(new Error('invalid username'))
    }

    socket.username = username

    next()
  })
}

export default auth
