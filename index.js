const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');




let gameSpeed = 5;// controls the game speed
let tileCount = 30;//canvas is 600x600 (600/20=30)
let tileSize = canvas.width / tileCount;// sets snake and food size to 18px
let startX = 10;
let startY = 10;

let gameBackgroundImg = new Image();
    gameBackgroundImg.src = "./imgs/sand.png";

let snakeXVcty = 0;//variable that allows to move snake asset on y axis
let snakeYVcty = 0;//variable that allows to move snake asset on x axis

let foodXVcty = 0;//variable that allows to move food asset on x axis
let foodYVcty = 0;//variable that allows to move food asset on y axis

//const snakeBodyTiles = [];
//let snakeTail = 1 ;


// class for snake body tile array
class snakeBody{
    constructor(x,y){
        this.xPosBody = x;
        this.yPosBody= y;
    }
}

//game loop to run all canvas functions
function drawGameloop(){
    clearGameWindow();
    moveSnakeHead();
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
    ctx.fillRect(startX * tileCount, startY * tileCount, tileSize, tileSize);
    ctx.strokeStyle = "red";// colors border tile of snake
    ctx.strokeRect(startX * tileCount, startY * tileCount, tileSize, tileSize);

    //ctx.fillStyle = 'black';// colors center tile of snake
        //ctx.strokeStyle = "red";// colors border tile of snake
    //for(let i = 0; i<snakeBodyTiles.length; i++){
    //    let snakeTiles = snakeBodyTiles[i];
    //    ctx.fillRect(snakeTiles.xPosBody * tileCount, snakeTiles.yPosBody * tileCount, tileSize,tileSize);
        //ctx.strokeRect(snakeTiles.xPosBody * tileCount, snakeTiles.yPosBody * tileCount, tileSize,tileSize);
    //}

    //snakeBodyTiles.push(new snakeBodyTiles(snakeXVcty, snakeYVcty));
    //while(snakeBodyTiles.length > snakeTail){
    //    snakeBodyTiles.shift();
    //}
    
}

//draw food on canavs
function drawFood(){
    ctx.fillStyle = 'green';// colors center tile of food
    ctx.fillRect(foodXVcty * tileCount, foodYVcty * tileCount, tileSize, tileSize);
    //ctx.strokeStyle = 'white';// colors border of food
    //ctx.strokeRect(foodXVcty* tileCount, foodYVcty* tileCount, tileSize, tileSize);
}

function foodCollision(){
    if(foodXVcty === startX && foodYVcty === startY){
        foodXVcty = Math.floor((Math.random() * 30)+1);
        console.log(foodXVcty);
        foodYVcty = Math.floor((Math.random() * 30)+1);
        console.log(foodYVcty);
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