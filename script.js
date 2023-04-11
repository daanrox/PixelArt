const color = document.getElementsByClassName('color');
const btnRandom = document.getElementById('button-random-color');
const canvas = document.getElementById('pixel-board');
const pixels = document.getElementsByClassName('pixel');
const btnClearBoard = document.getElementById('clear-board');
const pixelBoard = JSON.parse(localStorage.getItem('pixelBoard'));
const userBoardSize = document.getElementById('board-size');
const generateBoard = document.getElementById('generate-board');
const output = document.getElementById("slider-value");

const defaultColors = color => {
    if (localStorage.getItem('colorPalette') === null) {
        color[0].style.backgroundColor = 'black';
        color[1].style.backgroundColor = 'orangered';
        color[2].style.backgroundColor = '#1EB720';
        color[3].style.backgroundColor = '#022C16';
    } else {
        lastPalette = JSON.parse(localStorage.getItem('colorPalette'));
        color[0].style.backgroundColor = lastPalette[0];
        color[1].style.backgroundColor = lastPalette[1];
        color[2].style.backgroundColor = lastPalette[2];
        color[3].style.backgroundColor = lastPalette[3];
    }
} 
defaultColors(color);

for (let index = 0; index < color.length; index += 1) {
    color[index].addEventListener('click', (event) => {
        const selectedColor = document.querySelector('.selected');
        if (selectedColor) {
            selectedColor.classList.remove('selected');
        }
        event.target.classList.add('selected');
    })
}

btnRandom.addEventListener('click', () => {
    const currentPalette = ['black',];
    for (let index = 1; index < color.length; index += 1) {
        const r = parseInt(Math.random() * 255);
        const g = parseInt(Math.random() * 255);
        const b = parseInt(Math.random() * 255);
        color[index].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        currentPalette.push(color[index].style.backgroundColor);
    }
    localStorage.setItem('colorPalette', JSON.stringify(currentPalette));
});

const defaultCanvas = size => {
    if (localStorage.getItem('boardSize') === null) {
        makeCanvas(5);
    } else {
        makeCanvas(localStorage.getItem('boardSize'));
    }
}
defaultCanvas();

generateBoard.addEventListener('click', () => {
        removeCanvas();
        makeCanvas(userBoardSize.value);
        clearBoard();
})

function makeCanvas(size) {
    for (let index = 0; index < size * size; index += 1) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        canvas.appendChild(pixel);
    }
    canvas.style = `grid-template-columns: repeat(${size}, 40px);`;
    localStorage.setItem('boardSize', size);
    paintCanvas();
}

function removeCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function clearBoard() {
    for (let index = 0; index < pixels.length; index += 1) {
        if (pixels[index].style.backgroundColor !== 'white') {
            pixels[index].style.backgroundColor = 'white';
            lastArt[index] = [];
        }
    }
}

let lastArt = pixelBoard ? pixelBoard : [];

btnClearBoard.addEventListener('click', clearBoard);

function paintCanvas() {
    for (let index = 0; index < pixels.length; index += 1) {
        pixels[index].addEventListener('click', (event) => {
            const selectedColor = document.querySelector('.selected');
            event.target.style.backgroundColor = selectedColor.style.backgroundColor;
            lastArt[index] = selectedColor.style.backgroundColor;
            localStorage.setItem('pixelBoard', JSON.stringify(lastArt));
        });
    }
}

const savedCanvas = () => {
    if (localStorage.getItem('pixelBoard') !== null) {
        for (let index = 0; index < pixels.length; index += 1) {
            pixels[index].style.backgroundColor = pixelBoard[index];
        }
    }
}
savedCanvas();

output.innerHTML = userBoardSize.value;
userBoardSize.oninput = function() {
  output.innerHTML = this.value;
}