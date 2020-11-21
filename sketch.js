
var monkey , monkey_running,monkey_stopped
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, foodCount
var ground, groundInv
var randomFrame

var Play = 1;
var End = 0;
var gameState = Play;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_stopped = loadImage("sprite_0.png");
 
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  ground = createSprite(350,500,800,24);
  
  groundInv = createSprite(350,510,800,12);
  groundInv.visible = false;
  
  monkey = createSprite(100,450,10,10);
  monkey.addAnimation("hi", monkey_running);
   monkey.addAnimation("stop", monkey_stopped);
  monkey.scale=0.2
  monkey.debug = true;
  
  FoodGroup =  createGroup();
  obstacleGroup = createGroup();
  
  score = 1;
  foodCount = 0;
  
}


function draw() {
  background("white");
  text("Score: "+ score, 600,50);
  text("Bananas: "+foodCount, 600,100)
  console.log(gameState)
  if(gameState===Play){
    score = score + Math.round(getFrameRate()/60);
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      FooodCount = foodCount+1;
    }
    
    randomFrame = Math.random(10,30);
    
  
      
    if(keyDown("space")&&monkey.y>=440){
      monkey.velocityY=-25;
    }
      monkey.velocityY = monkey.velocityY + 0.8

    bananafunc(); 
    obstaclefunc();
      
    if(monkey.isTouching(obstacleGroup)){
      gameState = End;
    
    }
   
  }
  
  if(gameState === End){
   monkey.changeAnimation("stop", monkey_stopped);
      obstacleGroup.setVelocityXEach(0);
    //  score = score;
      FoodGroup.setVelocityXEach(0);
    monkey.velocityY = 0;
  }
  monkey.collide(groundInv)
   drawSprites()
}

function bananafunc(){
  if(frameCount%50 === 0){
    var banana = createSprite(620,200);
    banana.addImage(bananaImage);
    
    banana.velocityX = -5;
    banana.lifetime = windowWidth/banana.velocityX;
    
    banana.y = Math.round(random(0,(windowHeight/5)*2.5))
    
    banana.scale = 0.15;
    FoodGroup.add(banana)
  }
}

function obstaclefunc(){
  if(frameCount%100===0&&gameState === Play){
    var obstacle = createSprite(600,465)
    obstacle.addImage(obstacleImage);
    
    obstacle.debug= true;
    
    obstacle.scale = 0.25
    
    obstacle.velocityX = -8;
    obstacle.lifetime = windowWidth/obstacle.velocityX
    
    obstacleGroup.add(obstacle)
  }

}






