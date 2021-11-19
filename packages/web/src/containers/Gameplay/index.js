import { useState } from 'react'

import Players from '../../components/Players'
import Character from '../../components/Character'
import styles from './index.module.css'

const Gameplay = () => {
  const [hasCharacterBeenSelected, setHasCharacterBeenSelected] =
    useState(false)

  return (
    <div className={styles.container}>
      <div>
        {!hasCharacterBeenSelected && (
          <Character
            setHasCharacterBeenSelected={setHasCharacterBeenSelected}
          />
        )}
        <Players />
      </div>
    </div>
  )
}

export default Gameplay
