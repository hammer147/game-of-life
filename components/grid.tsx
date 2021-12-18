import { produce } from 'immer' // see README.md
import { Dispatch, SetStateAction } from 'react'
import styles from './grid.module.css'

type Props = {
  numCols: number
  grid: (0 | 1)[][]
  setGrid: Dispatch<SetStateAction<(0 | 1)[][]>>
  cellColor: string
}

const Grid = ({ numCols, grid, setGrid, cellColor }: Props) => {
  return (
    <div>
      <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}>
        {grid.map((rows, i) => rows.map((col, j) => (
          <div
            key={`${i}-${j}`}

            /* With immer */
            onClick={() => {
              setGrid(prevGrid => produce(prevGrid, gridCopy => {
                gridCopy[i][j] = prevGrid[i][j] ? 0 : 1
              }))
            }}

            /* Without immer */
            // onClick={() => {
            //   setGrid((prevGrid) => {
            //     const clone = (items: any[]):any[] => items.map((item) => Array.isArray(item) ? clone(item) : item)
            //     const gridCopy = clone(prevGrid)
            //     gridCopy[i][j] = prevGrid[i][j] ? 0 : 1
            //     return gridCopy
            //   })
            // }}

            style={{
              backgroundColor: grid[i][j] ? cellColor : 'white'
            }}
          />
        )))
        }
      </div>
    </div>
  )
}

export default Grid
