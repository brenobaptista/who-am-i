import Players from '../../components/Players'
import Character from '../../components/Character'
import styles from './index.module.css'

const Gameplay = () => (
  <div className={styles.container}>
    <div>
      <Character />
      <Players />
    </div>
  </div>
)

export default Gameplay
