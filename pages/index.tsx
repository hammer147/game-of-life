import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { produce } from 'immer' // see README.md
import styles from '../styles/Home.module.css'
import Settings from '../components/settings'
import Grid from '../components/grid'

// neighbors: start North an go clockwise
const operations = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]

const Home: NextPage = () => {

  const [numRows, setNumRows] = useState(40)
  const [numCols, setNumCols] = useState(40)
  const [cellColor, setCellColor] = useState('#DE4F4F')
  const [delay, setDelay] = useState(1000 / 7)
  const [rndPop, setRndPop] = useState(0.3)
  const [grid, setGrid] = useState<(0 | 1)[][]>([])
  const [running, setRunning] = useState(false)

  // functions that are used in a dep arr need to be memoized
  // otherwise they are regenerated each render and would trigger the useEffect
  // generateGrid is a function that takes a function fn that returns 0 or 1
  // generateGrid returns a grid based on the function it received
  const generateGrid = useCallback((fn: () => 0 | 1): (0 | 1)[][] => {
    const rows = []
    for (let i = 0; i < numRows; i++) {
      // populate the rows with columns
      // the 2nd arg of Array.from is a mapping function
      rows.push(Array.from(Array(numCols), () => fn()))
    }
    return rows
  }, [numCols, numRows])

  // generate a grid with all cells 0
  useEffect(() => {
    setGrid(generateGrid(() => 0))
  }, [generateGrid, numCols, numRows])

  const runSimulation = useCallback((): void => {
    setGrid(prevGrid => produce(prevGrid, gridCopy => {
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          let neighbors = 0
          operations.forEach(([x, y]) => {
            const newI = i + x
            const newJ = j + y
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += prevGrid[newI][newJ]
            }
          })
          if (neighbors < 2 || neighbors > 3) { // rules 1 and 3 (rule 2 does not change anything)
            gridCopy[i][j] = 0
          } else if (prevGrid[i][j] === 0 && neighbors === 3) { // rule 4 (rules are in README.md)
            gridCopy[i][j] = 1
          }
        }
      }
    })
    )
  }, [numCols, numRows])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (running) {
      interval = setInterval(runSimulation, delay)
    }
    return () => {
      clearInterval(interval)
    }
  }, [delay, runSimulation, running])

  return (
    <div className={styles.container}>
      <Settings
        running={running}
        setRunning={setRunning}
        setGrid={setGrid}
        generateGrid={generateGrid}
        rndPop={rndPop}
        setRndPop={setRndPop}
        delay={delay}
        setDelay={setDelay}
        numRows={numRows}
        setNumRows={setNumRows}
        numCols={numCols}
        setNumCols={setNumCols}
        cellColor={cellColor}
        setCellColor={setCellColor}
      />
      <Grid
        numCols={numCols}
        grid={grid}
        setGrid={setGrid}
        cellColor={cellColor}
      />
    </div>
  )
}

export default Home
