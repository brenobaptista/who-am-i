import socketIOServer from './loaders/socket.io-server.js'
import middlewares from './middlewares/index.js'

const io = socketIOServer(8080, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

middlewares(io)

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
