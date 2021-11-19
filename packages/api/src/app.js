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
  console.log(`user ${socket.id} connected`)

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`)
  })
})
