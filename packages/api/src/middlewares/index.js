import auth from './auth.js'

const middlewares = io => {
  auth(io)
}

export default middlewares
