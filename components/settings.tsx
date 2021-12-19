import { Dispatch, SetStateAction } from 'react'
import styles from './settings.module.css'

type Props = {
  running: boolean
  setRunning: Dispatch<SetStateAction<boolean>>
  setGrid: Dispatch<SetStateAction<(0 | 1)[][]>>
  generateGrid: (fn: () => 0 | 1) => (0 | 1)[][]
  rndPop: number
  setRndPop: Dispatch<SetStateAction<number>>
  delay: number
  setDelay: Dispatch<SetStateAction<number>>
  numRows: number
  setNumRows: Dispatch<SetStateAction<number>>
  numCols: number
  setNumCols: Dispatch<SetStateAction<number>>
  cellColor: string
  setCellColor: Dispatch<SetStateAction<string>>
}

const Settings = (props: Props) => {

  const {
    running,
    setRunning,
    setGrid,
    generateGrid,
    rndPop,
    setRndPop,
    delay,
    setDelay,
    numRows,
    setNumRows,
    numCols,
    setNumCols,
    cellColor,
    setCellColor
  } = props

  return (
    <div className={styles.settings}>
      <h1>Conway&apos;s Game Of Life</h1>

      <div className={styles.rules}>
        <h3>Rules</h3>
        <ol>
          <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
          <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
          <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
          <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
        </ol>
      </div>

      <div className={styles.buttons}>
        <button onClick={() => setRunning(prev => !prev)}>
          {running ? 'Stop Simulation' : 'Start Simulation'}
        </button>

        <button onClick={() => setGrid(generateGrid(() => Math.random() < rndPop ? 1 : 0))}>
          Randomly Populate Grid
        </button>

        <button onClick={() => setGrid(generateGrid(() => 0))}>
          Clear Grid
        </button>
      </div>

      <div className={styles.controls}>
        <div>
          <label>Speed: <span>{1000 / delay} cycles/s</span></label>
          <input type="range" min="1" max="10" step="1" value={1000 / delay} onChange={e => setDelay(1000 / +e.target.value)} />
        </div>
        <div>
          <label>Width: <span>{numRows} rows</span></label>
          <input type="range" min="20" max="40" step="5" value={numRows} onChange={e => setNumRows(+e.target.value)} />
        </div>
        <div>
          <label>Height: <span>{numCols} cols</span></label>
          <input type="range" min="20" max="40" step="5" value={numCols} onChange={e => setNumCols(+e.target.value)} />
        </div>
        <div>
          <label>Population: <span>{rndPop * 100}%</span></label>
          <input type="range" min="10" max="100" step="10" value={rndPop * 100} onChange={e => setRndPop(+e.target.value / 100)} />
        </div>
        <div>
          <label>Live Cell Color: </label>
          <input type="color" value={cellColor} onChange={e => setCellColor(e.target.value)} />
        </div>
      </div>

    </div>

  )
}

export default Settings
