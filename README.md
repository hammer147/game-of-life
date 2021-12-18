# Notes

[Conway's Game of Life - Wiki](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

Rules:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## immer

[immer](https://immerjs.github.io/immer/docs/introduction)

When we have complex state (nested arrays or nested objects), and we need to update that state based on the previous state it can be handy to use immer (to avoid having to deep clone the previous state ourselves)

```js
setState(prevState => produce(prevState, stateCopy => { /* modify stateCopy, it will become the next state */ }))
```
