## Task Description

We want to finish the implementation of the Minesweeper game, we already have the base engine to generate maps and bombs.

Now we want to add the last functionality of this program: Hiding the cells and revealing when users "click" on them.

Using the code below please finish the program:
- Add a fog of war, so the player cannot see the map and where the bombs are, you can modify the displayBoard() function to represent the fog as #.
    - Hint: You can add a new array to track the fog of war and show that instead.
- Add a function called reveal(x,y) that reveals the map where the fog of war is
   - If the x, y is the position of a bomb, it should display the message "You lost".
   - If there are no more spaces to reveal, besides bombs, output a message "You win"
   - Otherwise, reveal what is in the fog. If the space is empty, reveal all squares recursively until it reaches a number
- (Bonus) Add improvements to the code that you think is worth adding.

Source code: [source.js](./src/source.js)

## Solution

### Installation
`npm install`

### Run the app

Then, run as usual:

`npm run start`
