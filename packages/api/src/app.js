import events from './events/index.js'
import socketIOServer from './loaders/socket.io-server.js'
import middlewares from './middlewares/index.js'

const io = socketIOServer(8080, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

middlewares(io)

events(io)
