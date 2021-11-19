import { Server } from 'socket.io'

const io = new Server(8080, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.use((socket, next) => {
  const { username } = socket.handshake.auth

  if (!username) {
    return next(new Error('invalid username'))
  }

  socket.username = username

  next()
})

io.on('connection', socket => {
  const users = []

  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userId: id,
      username: socket.username
    })
  }

  socket.emit('users', users)

  socket.broadcast.emit('user connected', {
    userId: socket.id,
    username: socket.username
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user disconnected', socket.id)
  })
})
