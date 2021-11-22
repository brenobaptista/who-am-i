import { Server } from 'socket.io'

const socketIO = (server, options) => {
  const io = new Server(server, options)

  return io
}

export default socketIO
