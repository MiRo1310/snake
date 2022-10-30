const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");
const counter = document.getElementById("Count");
const list = document.getElementById("valueGame")


// Background
canvas.height = 800;
canvas.width = 800;
list.style.height = "800px";

let cols = 30;
let rows = 30;
let colsWidth = canvas.width / cols;
let rowsHeight = canvas.height / rows;
let direction;
let intervallTime;
let foodCollected;
let interval;

let jsonSnake;
let food = {}
let count;


start()

function start() {
    if (true) {
        foodCollected = false;
        intervallTime = 220;
        jsonSnake = [{ x: 19, y: 6 }]
        direction = "LEFT";
        count = 1;        
        placeFood()
        draw()
        gameLoop(intervallTime)

    }
}



document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
        direction = "RIGHT"
    }
    if (e.key == "ArrowLeft") {
        direction = "LEFT"
    }
    if (e.key == "ArrowDown") {
        direction = "DOWN"
    }
    if (e.key == "ArrowUp") {
        direction = "UP"
    }
})


function placeFood() {
    console.log
    food.x = Math.floor(Math.random() * cols)
    food.y = Math.floor(Math.random() * rows)
}

function gameLoop(intervallTime) {
    interval = setInterval(() => {
        gameOver();
        if (!foodCollected) {
            for (let i = jsonSnake.length - 1; i > 0; i--) {
                jsonSnake[i].x = jsonSnake[i - 1].x
                jsonSnake[i].y = jsonSnake[i - 1].y
            }
        }
        foodCollected = false;


        switch (direction) {
            case "LEFT":
                jsonSnake[0].x--
                break;
            case "RIGHT":
                jsonSnake[0].x++
                break;
            case "DOWN":
                jsonSnake[0].y++
                break;
            case "UP":
                jsonSnake[0].y--

        }

    }, intervallTime)
}

function gameOver() {
    let firstPart = jsonSnake[0];
    let otherParts = jsonSnake.slice(1);

    let dublicatedParts = otherParts.find(e => e.x == firstPart.x && e.y == firstPart.y && !foodCollected)
    if (jsonSnake[0].x < 0 ||
        jsonSnake[0].x > rows-1 ||
        jsonSnake[0].y < 0 ||
        jsonSnake[0].y > cols-1 ||
        dublicatedParts) {
            clearInterval(interval);
        start()
        
    }

}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    jsonSnake.forEach((element) => {
        addElement(element.x, element.y, "white");
    })
    addElement(food.x, food.y, "yellow");

    eatFood()


    requestAnimationFrame(draw)
}

function eatFood() {
    if (jsonSnake[0].x == food.x && jsonSnake[0].y == food.y) {
        changeSpeed();
        placeFood();
        jsonSnake.splice(1, 0, { x: jsonSnake[0].x, y: jsonSnake[0].y })
        foodCollected = true;

        count += 1;
    }
    counter.innerText = count
}

function changeSpeed(){    
    if(intervallTime > 90){
        intervallTime -= 5;
    }else{
        intervallTime --;
    }
    
    clearInterval(interval);
    gameLoop(intervallTime);

}


function addElement(x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect((x * colsWidth) + 1, (y * rowsHeight) + 1, colsWidth - 2, rowsHeight - 2)
}