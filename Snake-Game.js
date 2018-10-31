var numSegments = 10;
var direction = 'right';

var xStart = 0;
var yStart = 250;
var diff = 10;

var xCor = [];
var yCor = [];

var xFruit = 0;
var yFruit = 0;
var scoreElem;

var cnv;

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function setup() {

    cnv = createCanvas(700, 600);
    centerCanvas();

    scoreElem = createDiv('Score = 0');
    scoreElem.position(20, 50);
    scoreElem.id = 'score';
    scoreElem.style('color', 'white');

    frameRate(15);
    R = random(255);
    G = random(255);
    B = random(255);
    stroke(R, G, B);
    strokeWeight(10);
    updateFruitCoordinates();

    for (var i = 0; i < numSegments; i++) {
        xCor.push(xStart + (i * diff));
        yCor.push(yStart);
    }
}

function windowResized() {
    centerCanvas();
}

function draw() {
    background(0);
    for (var i = 0; i < numSegments - 1; i++) {
        line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
    }
    updateSnakeCoordinates();
    checkGameStatus();
    checkForFruit();
}

function updateSnakeCoordinates() {
    for (var i = 0; i < numSegments - 1; i++) {
        xCor[i] = xCor[i + 1];
        yCor[i] = yCor[i + 1];
    }
    switch (direction) {
        case 'right':
            xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
            yCor[numSegments - 1] = yCor[numSegments - 2];
            break;
        case 'up':
            xCor[numSegments - 1] = xCor[numSegments - 2];
            yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
            break;
        case 'left':
            xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
            yCor[numSegments - 1] = yCor[numSegments - 2];
            break;
        case 'down':
            xCor[numSegments - 1] = xCor[numSegments - 2];
            yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
            break;
    }
}

function checkGameStatus() {
    if (xCor[xCor.length - 1] > width ||
        xCor[xCor.length - 1] < 0 ||
        yCor[yCor.length - 1] > height ||
        yCor[yCor.length - 1] < 0 ||
        checkSnakeCollision()) {
        noLoop();
        var scoreVal = parseInt(scoreElem.html().substring(8));
        scoreElem.html('Game ended! Your score was : ' + scoreVal);
    }
}

function checkSnakeCollision() {
    var snakeHeadX = xCor[xCor.length - 1];
    var snakeHeadY = yCor[yCor.length - 1];
    for (var i = 0; i < xCor.length - 1; i++) {
        if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
            return true;
        }
    }
}

function checkForFruit() {
    point(xFruit, yFruit);
    if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
        var prevScore = parseInt(scoreElem.html().substring(8));
        scoreElem.html('Score = ' + (prevScore + 1));
        xCor.unshift(xCor[0]);
        yCor.unshift(yCor[0]);
        numSegments++;
        updateFruitCoordinates();
    }
}

function updateFruitCoordinates() {
    xFruit = floor(random(1, (width) / 10)) * 10;
    yFruit = floor(random(1, (height) / 10)) * 10;
}

function keyPressed() {
    switch (keyCode) {
        case 37:
            if (direction != 'right') {
                direction = 'left';
            }
            break;
        case 39:
            if (direction != 'left') {
                direction = 'right';
            }
            break;
        case 38:
            if (direction != 'down') {
                direction = 'up';
            }
            break;
        case 40:
            if (direction != 'up') {
                direction = 'down';
            }
            break;
    }
}