var dog, happyDog, database, foodS , foodStock , position;
var backgroundImg, dogImg;
var fedTime,lastFed
var feed,addFood,foodObj

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");  
  
}


function setup(){
    createCanvas(900,500);
    database= firebase.database();

    dog=createSprite(800,200,150,150);
    dog.addImage("dog",dogImg);
    dog.scale=0.15  ;
     foodStock =  database.ref('food');
    foodStock.on("value",readStock)

    foodObj = new Food();

    feed=createButton("feed Dog")
    feed.position(700,95)
    feed.mousePressed(feedDog)

    addFood=createButton("add food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)
}

function draw(){
    background(46,139,87);
    foodObj.display();

    fedTime=database.ref('feedTime')
    fedTime.on("value",function(data){
        lastFed=data.val();
    })
    fill("white");
    textSize(15);
    if(lastFed >= 12){
        text("LastFed Time: "+lastFed%12+ " PM", 700, 50);
    }
    else if (lastFed == 0){
        text("LastFed Time: 12AM", 800, 50);
    }
    else {
        text("LastFed Time: "+lastFed+" AM", 700, 50);
    }
    
   
    /*if(keyWentDown(UP_ARROW)){
        
       WriteStock(foodS)
       dog.addImage("happyDog",happyDog);   
    }*/
   
    

   
    
    drawSprites();
  /*   textSize(25);
    fill("black");
    text("food remaining:"+ foodS,170,80);
    text("press up to feed the dog!" ,170 , 120 ) */
    
}

/* function WriteStock(petFOOD){
    if(petFOOD<=0){
        petFOOD=0
    }
    else{
        petFOOD=petFOOD-1;
    }
    database.ref('/').update({
        food:petFOOD
    })
} */
function readStock(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);  // i have added this command to save this value in database
    
}
function addFoods(){
    foodS++;
    database.ref('/').update({
        food:foodS

    })


}
function feedDog(){
    dog.addImage("dog",happyDog);
    var foodLeft = foodObj.getFoodstock();

    if(foodLeft <=0){
        foodObj.updateFoodStock(foodLeft*0)
    }
    else {
        foodObj.updateFoodStock(foodLeft - 1)
    }

    foodLeft = foodObj.getFoodstock();

    var currentTime = hour()
    database.ref('/').update({
        feedTime:currentTime,
        food:foodLeft
    })
       }