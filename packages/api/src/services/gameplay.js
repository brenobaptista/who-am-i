export const shouldStartGame = io => {
  if (io.of('/').sockets.size < 2) {
    return false
  }

  for (let socket of io.of('/').sockets) {
    const isDataEmpty = Object.entries(socket[1].data).length === 0

    if (isDataEmpty) {
      return false
    }
  }

  return true
}

export const shufflePlayersAndCharacters = io => {
  const players = []
  const characters = []

  for (let [id, socket] of io.of('/').sockets) {
    players.push({
      id,
      nickname: socket.nickname,
      characterAssigned: ''
    })

    characters.push(socket.data.characterChosen)
  }

  for (let i = 0; i < characters.length; i++) {
    players[i].characterAssigned =
      i !== characters.length - 1 ? characters[i + 1] : characters[0]
  }

  return players
}
