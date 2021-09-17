// select elements on page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d'); // see three.js for examples of 3D
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 5;

// set up our canvas for drawing
//const width = canvas.width;
//const height = canvas.height;
//Destructuring
const { width, height } = canvas;

// stylize the line
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let X = getRandomInt(width);
let Y = getRandomInt(height);
ctx.beginPath();  
ctx.moveTo(X, Y);
ctx.lineTo(X, Y);
ctx.stroke();

// HOISTED FUNCTIONS
// create random x and y for the starting point
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function draw({ keyPressed }) {
    // console.log(keyPressed, Y, X);
    // start the path
    ctx.beginPath();
    ctx.moveTo(X, Y);
    
    switch(keyPressed) {
        case 'ArrowUp':
            ctx.lineTo(X, Y -= MOVE_AMOUNT);
            break;
        case 'ArrowDown':
            ctx.lineTo(X, Y += MOVE_AMOUNT);
            break;
        case 'ArrowRight':
            ctx.lineTo(X += MOVE_AMOUNT, Y);
            break;
        case 'ArrowLeft':
            ctx.lineTo(X -= MOVE_AMOUNT, Y);
            break; 
        default:
            ctx.lineTo(X, Y);
    }
    ctx.strokeStyle = `hsl(${++hue}, 100%, 50%)`;
    ctx.stroke();
}

// write a handler for the keys
function handleKey(e) {
// respond to arrow keys
    if (e.key.includes('Arrow')) { 
        e.preventDefault();        // stop the default action
        draw({keyPressed: e.key }); // instead draw on the etch-a-sketch
    }
}
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener('animationend', function() {
        canvas.classList.remove('shake');
    }, {once: true}
    );
}

// listen for any key press 
window.addEventListener('keydown', handleKey);

// clear / shake function
shakebutton.addEventListener('click', clearCanvas);