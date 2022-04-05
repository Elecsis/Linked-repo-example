const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');


// class for snake body tile array
class snakeBody{
    constructor(x,y){
        this.xPosSnakeBody = x;
        this.yPosSnakeBody = y;
    }
}

let gameSpeed = 5;// controls the game speed
let tileCount = 30;//canvas is 600x600 (600/20=30)
let tileSize = canvas.width / tileCount;// sets snake and food size to 18px
let startX = 10;
let startY = 10;

let gameBackgroundImg = new Image();
    gameBackgroundImg.src = "./imgs/sand.png";

let snakeXVcty = 0;//variable that allows to move snake asset on y axis
let snakeYVcty = 0;//variable that allows to move snake asset on x axis

let foodXVcty = 5;//variable that allows to move food asset on x axis
let foodYVcty = 5;//variable that allows to move food asset on y axis

const snakeBodyTiles = [];
let snakeTail = 1 ;




//game loop to run all canvas functions
function drawGameloop(){
    moveSnakeHead();
    clearGameWindow();
    foodCollision()
    drawFood();
    drawSnake();
    setTimeout(drawGameloop, 1000/ gameSpeed);
}

// clears game window
function clearGameWindow(){
    
   // gameBackgroundImg.onload = ()=> {
   //     ctx.drawImage(gameBackgroundImg,0,0,canvas.width,canvas.height);
    //}
    
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
    ctx.strokeStyle = "green";// colors border tile of snake
    for(let i = 0; i <snakeBodyTiles.length; i++){// loop that draws snake body tiles
        let snakeTiles = snakeBodyTiles[i];
        ctx.fillRect(snakeTiles.xPosSnakeBody * tileCount, snakeTiles.yPosSnakeBody * tileCount, tileSize, tileSize);
        ctx.strokeRect(snakeTiles.xPosSnakeBody * tileCount, snakeTiles.yPosSnakeBody * tileCount, tileSize,tileSize);
    }

    snakeBodyTiles.push(new snakeBody(startX, startY));//adds previous snake head x&y position to array
    if(snakeBodyTiles.length > snakeTail){
        snakeBodyTiles.shift();// takes off lass array element if longer than tail & array length
    }
    // snake head must be drawn last to avoid starting position with wrong color
    ctx.fillStyle = 'black';// colors center tile of snake
    ctx.fillRect(startX * tileCount, startY * tileCount, tileSize, tileSize);
    ctx.strokeStyle = "red";// colors border tile of snake
    ctx.strokeRect(startX * tileCount, startY * tileCount, tileSize, tileSize);
    
}

//draw food on canavs
function drawFood(){
    ctx.fillStyle = 'green';// colors center tile of food
    ctx.fillRect(foodXVcty * 30, foodYVcty * 30, tileSize, tileSize);
    ctx.strokeStyle = 'white';// colors border of food
    ctx.strokeRect(foodXVcty* tileCount, foodYVcty* tileCount, tileSize, tileSize);
}
// collision dectection function for food
function foodCollision(){
    if(foodXVcty === startX && foodYVcty === startY){// verifies if snake hits food
        foodXVcty = Math.floor(Math.random() * tileSize);//creates new poistion for 
        foodYVcty = Math.floor(Math.random() * tileSize);
        snakeTail++;
    }
}


document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(snakeYVcty == 1)// prevents from going down after pressing up
        return ;
        snakeYVcty = -1;
        snakeXVcty = 0;
    } 
    //Down
    if(event.keyCode == 40){ 
        if(snakeYVcty == -1)// prevents from going up after pressing down
        return ;
        snakeYVcty = 1;
        snakeXVcty = 0;
    }
    //Left
    if(event.keyCode == 37){// prevents from going right after pressing left
        if(snakeXVcty == 1)
        return ;
        snakeYVcty = 0;
        snakeXVcty = -1;
    }
    //Right
    if(event.keyCode == 39){// prevents from going left after pressing right
        if(snakeXVcty == -1)
        return ;
        snakeYVcty = 0;
        snakeXVcty = 1;
    }
}



drawGameloop();