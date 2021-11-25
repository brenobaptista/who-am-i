import Players from '../../components/Players'
import Gameplay from '../../components/Gameplay'
import Character from '../../components/Character'
import styles from './index.module.css'

const Game = ({ participantPlayers }) => (
  <div className={styles.container}>
    <div>
      {participantPlayers.length !== 0 ? (
        <Gameplay participantPlayers={participantPlayers} />
      ) : (
        <>
          <Character />
          <Players />
        </>
      )}
    </div>
  </div>
)

export default Game
