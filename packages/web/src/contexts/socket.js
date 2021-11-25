import { createContext } from 'react'
import io from 'socket.io-client'

// eslint-disable-next-line no-undef
const url = `${process.env.REACT_APP_SERVER_URL || 'http://localhost:8080'}`
export const socket = io(url, { autoConnect: false })

export const SocketContext = createContext()
