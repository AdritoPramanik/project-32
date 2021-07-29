const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var gameState =1;
var enemyTanks, enemyInfantry;
var canon, canonImg, cannonBall, cannonBallImg;
var ground;
var commander, commanderImg;
var slin,backgroundImg, backgroun;
var score = 0;
var gameover, gameoverImg;

function preload(){
  canonImg = loadImage("canon.png")
  cannonBallImg = loadImage("cannon ball.png")
  backgroundImg = loadImage("war.jpg")
  commanderImg = loadImage("commander img.png")
  gameoverImg = loadImage("gameover.png")
}

function setup() {
  var canvas = createCanvas(displayWidth,625);
  engine = Engine.create();
  world = engine.world;
  background(0); 
  backgroun = createSprite(displayWidth/2, 285, displayWidth, displayHeight);
  backgroun.scale = 5;
  backgroun.addImage(backgroundImg)
  canon = createSprite(150, 500, 300, 300);
  enemyTanks = new EnemyTank(900, 400, 40, 40)
  canon.addImage(canonImg)
  canon.scale = 1;
  ground = new Ground(displayWidth/2, 500, displayWidth, 20)
  cannonBall=  new CannonBall(500, 300)
  slin = new SlingShot(cannonBall.body, {x:250, y:400})
  commander = createSprite(380, 70, 20, 20)
  commander.addImage(commanderImg)
  commander.scale= 0.4

}

function draw() {
 
  Engine.update(engine);
  drawSprites();
  if(gameState == 1){
    textSize(30)
    fill("red")
    text("We cannot afford to lose this battle", 450, 60)
    fill("white")
    text("Press 'space' to continue", 520, 120)
  }
  if(keyDown("space")){
    gameState = 2
  }
  if(gameState == 2){
    textSize(30)
    fill("red")
    text("Commander, Please help", 450, 80)
    fill("white")
    text("Press 'r' to continue", 470, 130);
  }
  if(keyDown('r')){
    gameState = 3;
  }
  if(gameState === 3){
    cannonBall.display()
    enemyTanks.display()
  }
  if(enemyTanks.Visiblity <0){
    score = 400;
    gameState = 4;
  }
  if(gameState == 4){
    textSize(100)
    fill("white")
    text("VICTORY", 500 ,300)
    textSize(30)
    text("Press 'ctrl + r' to play again and again", 500, 130)
  }
  // ground.display()

  // canon.display()
  textSize(30)
  fill("white")
  text("Score  : "+score, 1200, 50)
  console.log(score)
  console.log("visibility "+enemyTanks.Visiblity)
}
function mouseDragged(){
  if (gameState == 3){
      Matter.Body.setPosition(cannonBall.body, {x: mouseX , y: mouseY});
  }
}
function mouseReleased(){
  if(gameState == 3){
    slin.fly();
  }
}