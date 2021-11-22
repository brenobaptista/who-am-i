import { Server } from 'socket.io'

const socketIOServer = (server, options) => {
  const io = new Server(server, options)

  return io
}

export default socketIOServer
