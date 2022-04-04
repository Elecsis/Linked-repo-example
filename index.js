const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');




let gameSpeed = 5;// controls the game speed
let tileCount = 30;//canvas is 600x600 (600/20=30)
let tileSize = canvas.width / tileCount - 2;// sets snake and food size to 18px
let startX = 10;
let startY = 10;

let snakeYVcty = 0;//variable that allows to move snake asset on y axis
let snakeXVcty = 0;//variable that allows to move snake asset on x axis

//game loop to run all canvas functions
function drawGameloop(){
    clearGameWindow();
    moveSnakeHead();
    drawSnake();
    setTimeout(drawGameloop, 1000/ gameSpeed);
}

// clears game window
function clearGameWindow(){
    
   // gameBackgroundImg.onload = ()=> {
   //     ctx.drawImage(gameBackgroundImg,0,0,canvas.width,canvas.height);
    //}
    let gameBackgroundImg = new Image();
    gameBackgroundImg.src = "./imgs/sand.png";
    ctx.drawImage(gameBackgroundImg,0,0,canvas.width,canvas.height);


    //ctx.fillStyle = "brown";
    //ctx.fillRect(0,0,canvas.width,canvas.height);
}




//Moves the snake position
function moveSnakeHead(){
     startX = startX + snakeXVcty;
     startY = startY + snakeYVcty;
}

//draws snake onto canvas
function drawSnake(){
    ctx.fillStyle = 'black';// colors center tile of snake
    ctx.fillRect(startX * tileCount, startY * tileCount, tileSize, tileSize);
    ctx.strokeStyle = "red";// colors borber tile of snake
    ctx.strokeRect(startX * tileCount, startY * tileCount, tileSize, tileSize);
}


document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    if(event.keyCode == 38){//Up 
        snakeYVcty = -1;
        snakeXVcty = 0;
    } 
    if(event.keyCode == 40){//Down 
        snakeYVcty = 1;
        snakeXVcty = 0;
    }
    if(event.keyCode == 37){//Left 
        snakeYVcty = 0;
        snakeXVcty = -1;
    }
    if(event.keyCode == 39){//Right 
        snakeYVcty = 0;
        snakeXVcty = 1;
    }
}



drawGameloop();