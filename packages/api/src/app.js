import socketIO from './loaders/socket-io.js'
import middlewares from './middlewares/index.js'

const io = socketIO(8080, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

middlewares(io)

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
