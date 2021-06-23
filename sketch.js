const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const constraint = Matter.Constraint

var engine, world;
var ground;
var b1,b2,b3,b4,b5;
var l1,l2,l3,l4;
var pig1, pig2, bird, bg="sprites/bg.png";
var slingshot;
var ground2;
var gamestate="start";

function preload(){
getTime();    
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(600,400,1200,20);
    b1=new Box1(700,320,70,70);
    b2=new Box1(920,320,70,70);
    pig1=new Pig(810,350,50,50);
    l1=new Log(810,260,20,300,PI/2);
    b3=new Box1(700,240,70,70);
    b4=new Box1(920,240,70,70);
    pig2=new Pig(810,220,50,50);
    l2=new Log(810,180,20,300,PI/2);
    b5=new Box1(810,160,70,70);
    l3=new Log(760,120,20,150,PI/7);
    l4=new Log(870,120,20,150,-PI/7);
    bird=new Bird(200,50,50,50);
    slingshot=new Slingshot(bird.body,{x:200,y:50})
    ground2=new Ground(150,305,300,170);
    getTime(); 
}

function draw(){
    if(bg){
        background(bg);
    }
    Engine.update(engine);
    ground.display();
    b1.display();
    b2.display();
    pig1.display();
    l1.display();
    b3.display();
    b4.display();
    pig2.display();
    l2.display();
    b5.display();
    l3.display();
    l4.display();
    bird.display();
    slingshot.display()
    ground2.display()  
}

function mouseDragged(){
  if(gamestate!=="launch"){
Matter.Body.setPosition(bird.body,{x:mouseX, y:mouseY})
  }
}
function mouseReleased(){
 slingshot.fly();
 gamestate="launch";
}

function keyPressed(){
  if(keyCode===32){
    gamestate="start"
    bird.trajectory=[]
    slingshot.attatch(bird.body);

  }
}

async function getTime(){
  var res= await fetch("http://worldtimeapi.org/api/timezone/Asia/kolkata")
  var resj= await res.json()
  var datetime=resj.datetime;
  var storingHour=datetime.slice(11, 13);
  var bgimg;
 
  if(storingHour>=06 && storingHour<=19){
  bgimg="sprites/bg.png"
  }
  else{

    bgimg="sprites/bg2.jpg"
  }
bg=loadImage(bgimg);
}