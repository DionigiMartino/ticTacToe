// Here I Take the reference at the chooser of game Type, a choice between Computer or Player

let playersOrComputer = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice-computer-person]'));

playersOrComputer.forEach(choice => {
    choice.addEventListener('click', decidePlayerOrComputer, false)
})

// Here i Store the Value of the choice, which would be Computer or Player

function decidePlayerOrComputer() {
    choiceComputerPlayer = this.value;
}

let choiceComputerPlayer;
const grid = document.getElementById('grid');
const msg = document.querySelector('.message')
let mark;
let cells;

// I give the value of the choosen Sign to mark
// After that, the gridBuilder function will start.

function setPlayer() {
    mark = this.value;
    // this.checked = false;
    gridBuilder();
}

// This function decides how the game is set, against the computer or a Player

function playerMoves() {
    if(choiceComputerPlayer == 'Computer'){
        if(this.textContent == ''){
            this.textContent = mark;
            checkRows();
            switchPlayer();
            computerMove();
        }
    } else {
        if(this.textContent == ''){
            this.textContent = mark;
            checkRows();
            switchPlayer();
        }
    }
}

// Here I switch between the marks, after every moves

const switchPlayer = () => {
    if(mark == 'X'){
        mark = 'O';
    } else {
        mark = 'X'
    }
}

// This Function is for the computer moves
// where i made an empty array for the empty cells
// For every empty cell, i push it inside the array

const computerMove = () => {
    let emptyCells = [];
    let random;

    cells.forEach(cell => {
        if(cell.textContent == ''){
            emptyCells.push(cell)
        }
    })

    // Now the computer will randomly put his sign for every empty cells inside the array

    random = Math.ceil(Math.random() * emptyCells.length) - 1;
    emptyCells[random].textContent = mark;
    checkRows();
    switchPlayer();
}

// This is the win's condition, where I check if the three cells are good for a win

const checkRowsForWinner = (tile1, tile2, tile3) => {
    if(tile1.textContent == mark && tile2.textContent == mark && tile3.textContent == mark){
        msg.textContent = mark + ' is the winner'
        return true;
    } else {
        return false;
    }
}

const checkRows = () => {
    checkRowsForWinner(document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3'));
    checkRowsForWinner(document.getElementById('c4'), document.getElementById('c5'), document.getElementById('c6'));
    checkRowsForWinner(document.getElementById('c7'), document.getElementById('c8'), document.getElementById('c9'));
    checkRowsForWinner(document.getElementById('c1'), document.getElementById('c4'), document.getElementById('c7'));
    checkRowsForWinner(document.getElementById('c2'), document.getElementById('c5'), document.getElementById('c8'));
    checkRowsForWinner(document.getElementById('c3'), document.getElementById('c6'), document.getElementById('c9'));
    checkRowsForWinner(document.getElementById('c1'), document.getElementById('c5'), document.getElementById('c9'));
    checkRowsForWinner(document.getElementById('c3'), document.getElementById('c5'), document.getElementById('c7'));
}

const resetGame = () => {
    mark = 'X';

    cells.forEach(cell => {
        cell.textContent = '';
    })

    grid.innerHTML = '';
    gridBuilder();
}

// Here I'm creating the grid, where the value can't surpass nine cells
// the id will be equal c + i(index) of the for loop

const gridBuilder = () => {
    for(let i = 1; i <= 9; i++){
        var cell = document.createElement('li');
        cell.id = 'c' + i;
        cell.addEventListener('click', playerMoves, false);
        grid.appendChild(cell)

        cells = Array.prototype.slice.call(grid.getElementsByTagName('li'))
    }
}

// This is made for the initial choice of the sign
// looking for the choosen option, between X or O

let players = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice]'));

players.forEach(choice => {
    choice.addEventListener('click', setPlayer, false);
})

let resetButton = document.querySelector('button');

// This is the reset button, when I click on it, I prevent the reload of the page

resetButton.addEventListener('click', e => {
    e.preventDefault();
    resetGame();
})
