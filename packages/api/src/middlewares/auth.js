const auth = io => {
  io.use((socket, next) => {
    const { nickname } = socket.handshake.auth

    if (!nickname) {
      return next(new Error('invalid nickname'))
    }

    socket.nickname = nickname

    next()
  })
}

export default auth
