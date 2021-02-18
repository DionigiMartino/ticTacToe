let playersOrComputer = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice-computer-person]'));

playersOrComputer.forEach(choice => {
    choice.addEventListener('click', decidePlayerOrComputer, false)
})

function decidePlayerOrComputer() {
    choiceComputerPlayer = this.value;
    this.checked = false;

    console.log(choiceComputerPlayer)
}

let choiceComputerPlayer;
const grid = document.getElementById('grid');
const msg = document.querySelector('.message')
let mark;
let cells;

const letTheGameBegins = () => {
    initialName()
}

function setPlayer() {
    mark = this.value;
    this.checked = false;
    gridBuilder();
}

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

const switchPlayer = () => {
    if(mark == 'X'){
        mark = 'O';
    } else {
        mark = 'X'
    }
}

const computerMove = () => {
    let emptyCells = [];
    let random;

    cells.forEach(cell => {
        if(cell.textContent == ''){
            emptyCells.push(cell)
        }
    })

    random = Math.ceil(Math.random() * emptyCells.length) - 1;
    emptyCells[random].textContent = mark;
    checkRows();
    switchPlayer();
}

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
}

const gridBuilder = () => {
    for(let i = 1; i <= 9; i++){
        var cell = document.createElement('li');
        cell.id = 'c' + i;
        cell.addEventListener('click', playerMoves, false);
        grid.appendChild(cell)

        cells = Array.prototype.slice.call(grid.getElementsByTagName('li'))
    }
}

let players = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice]'));

players.forEach(choice => {
    choice.addEventListener('click', setPlayer, false);
})

let resetButton = document.querySelector('button');

resetButton.addEventListener('click', e => {
    e.preventDefault();
    resetGame();
})
