var canvas_width = 600;
var canvas_height = 300;
var canvasX = 0;
var canvas = null;
var ctx = null;
var game1 = null;
var timeOut = null;

$(document).ready(function() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    Focusable = "True";
	gameScreen();
	
    canvas.addEventListener("mousemove", movingPaddle_temp, false);
    window.addEventListener("keydown", startGame, false);
});
var Game = function(){
	this.ball = new Ball(10, 0, 2 * Math.PI, false);
	this.paddle = new Paddle(300, 290, 100, 10);
	this.walls = new Walls();
	this.level1 =[];
	this.level2 = [];
	this.objects = [];
	this.objects.push(this.walls.top);
	this.objects.push(this.walls.right);
	this.objects.push(this.walls.left);
	this.lives = 0;

	//this.objects.push(this.paddle);

};

function levelMap1(){

//var width = (canvas_width - game1.walls.left.width - game1.walls.right.width)/7; 
//var height = (canvas_height - game1.walls.top.height)/15; 
	
	for (var y = 0; y < 4; y++)
	{
		for (var x = 0; x < 7; x++)
		{
			game1.level1.push({
				x: x,
				y: y,
				//console.log(x,y);
			})
			console.log(x,y);
		}
	}
	return game1.level1;
		};

function levelMap2(){

//var width = (canvas_width - game1.walls.left.width - game1.walls.right.width)/7; 
//var height = (canvas_height - game1.walls.top.height)/15; 
	
	for (var y = 0; y < 5; y++)
	{
		for (var x = 0; x < 7; x++)
		{
			if(x%2===0 || y === 0 || y > 3){
			game1.level2.push({
				
				x: x,
				y: y,
				//console.log(x,y);
			
			})
			console.log(x,y);
		}
	}
	}
	return game1.level2;
		};

function createBricks(level){
	var width = (canvas_width - game1.walls.left.width - game1.walls.right.width)/7; 
	var height = (canvas_height - game1.walls.top.height)/15; 
	for (var i = 0; i < level.length; i++)
	{
			game1.objects.push(new boundingBox(game1.walls.left.width + level[i].x*width, game1.walls.top.height + (canvas_height*0.15) + level[i].y*height, width, height, true));
}
};


// make all your bricks

// collect your bricks


// render function
Game.prototype.renderBricks  = function () {
 for (var i = 0; i < this.objects.length; i++) {
  var brick = this.objects[i];
  if (brick.isDisappearing === true){
	 ctx.clearRect(brick.x,brick.y,brick.width,brick.height);
	 game1.objects.splice(i,1);
	 console.log("brick");
  }
  else{
  brick.drawBox(brick.x, brick.y, brick.width, brick.height);
  }
 }
};

	
	
	
Game.prototype.drawStartScreen = function(){

	this.ball.drawBall_start(this.ball);
	
	this.paddle.drawPaddle_start();
	
	this.walls.drawWalls(this.walls);
	
	this.renderBricks();
};

Game.prototype.drawScreen = function() {
    //loop before ball has hit the paddle
    var unitsPerFrameX = game1.ball.velocity.x * 0.2; //200 milliseconds per frame
    var unitsPerFrameY = game1.ball.velocity.y * 0.2;

    ctx.clearRect(0, 0, canvas_width, canvas_height);

    game1.ball.center.x += unitsPerFrameX;
    game1.ball.center.y += unitsPerFrameY;

    game1.ball.boundingCircle.x += unitsPerFrameX;
    game1.ball.boundingCircle.y += unitsPerFrameY;

    game1.walls.drawWalls(this.walls);
    game1.ball.drawBall_start(this.ball);
    game1.paddle.draw();
	game1.renderBricks();
	
	timeOut = window.setTimeout(game1.gameLoop,20);
};

Game.prototype.gameLoop = function() {
    //detects when the ball hits the paddle
	
	
    if (detect_collide(game1.paddle)){
		var paddleExtension = 1.6;
		var distance = game1.ball.center.x - (game1.paddle.x-((game1.paddle.width*paddleExtension-game1.paddle.width)/2));
		var rotationFactor = distance / (game1.paddle.width*paddleExtension);
		var newVelocity = game1.ball.reverseOriginalVelocity;
		newVelocity = newVelocity.rotate(rotationFactor*(180));
		game1.ball.velocity = newVelocity;
		      
	}
	for(var i = 0; i<game1.objects.length;i++){
		var collidableObject = game1.objects[i];
		var collisionDirection = detect_collide(collidableObject);
		if(collisionDirection==="top"){
			handle_collision(game1.ball,collidableObject,collidableObject.planeTop);
		}
		if(collisionDirection==="bottom"){
			handle_collision(game1.ball,collidableObject,collidableObject.planeBottom);
		}
		if(collisionDirection==="left"){
			handle_collision(game1.ball,collidableObject,collidableObject.planeLeft);
		}
		if(collisionDirection==="right"){
			handle_collision(game1.ball,collidableObject,collidableObject.planeRight);
		}
	}
	game1.drawScreen();

	
//lose one life and start from where player lost 
	if (game1.ball.boundingCircle.y > canvas.height){
		game1.lives++;
		//game over and start again from current level
		if(game1.lives > 2){
			console.log("game over");
			window.clearTimeout(timeOut);
			game1.ball.center = new Vector(200, 250);
			game1.ball.boundingCircle = new boundingBox(game1.ball.center.x - game1.ball.radius, game1.ball.center.y - game1.ball.radius, game1.ball.radius * 2, game1.ball.radius * 2);
			//remove all bricks from array
			for( var i = game1.objects.length-1; i>=0; i--) {
    			if( game1.objects[i].disappears === true) {	
    				game1.objects.splice(i,1);
				}				
			}	
			createBricks(levelMap1());
			game1.drawStartScreen();
			game1.lives = 0;
		}
		else{
			console.log("new life");
			window.clearTimeout(timeOut);
			game1.ball.center = new Vector(200, 250);
			game1.ball.boundingCircle = new boundingBox(game1.ball.center.x - game1.ball.radius, game1.ball.center.y - game1.ball.radius, game1.ball.radius * 2, game1.ball.radius * 2);
			game1.drawStartScreen();
	}
	}

  for (var i=0; i<game1.objects.length; i++) {

    var count= 0;
   
        if(game1.objects[i].disappears === true)
        	{
        		count++;
      
    }
      
}
if(count === 0) {
	console.log("next level");
	window.clearTimeout(timeOut);
	game1.ball.center = new Vector(200, 250);
	game1.ball.boundingCircle = new boundingBox(game1.ball.center.x - game1.ball.radius, game1.ball.center.y - game1.ball.radius, game1.ball.radius * 2, game1.ball.radius * 2);
	for( var i = game1.objects.length-1; i>=0; i--) {
    			if( game1.objects[i].disappears === true) {	
    				game1.objects.splice(i,1);
				}				
			}	

	createBricks(levelMap2());
		
			game1.drawStartScreen();
			game1.lives = 0;
}
};


function gameScreen (){
	game1 = new Game();
	//var brick1 = new boundingBox(100,100,50,10,true);
	//var brick2 = new boundingBox(200,200,50,10,true);
	//game1.objects.push(brick1);
	//game1.objects.push(brick2);
	createBricks(levelMap1());
	game1.drawStartScreen();
};








function startGame(event){

    if (event.keyCode == 'S'.charCodeAt()) {
        game1.gameLoop();
    }
};

function detect_collide(boundingBox)
{
	var ballLeft = game1.ball.boundingCircle.x;
	var ballRight = game1.ball.boundingCircle.x + game1.ball.boundingCircle.width;
	var ballTop = game1.ball.boundingCircle.y;
	var ballBottom = game1.ball.boundingCircle.y + game1.ball.boundingCircle.height;
	var boundingBoxLeft = boundingBox.x;
	var boundingBoxRight = boundingBox.x + boundingBox.width;
	var boundingBoxTop = boundingBox.y;
	var boundingBoxBottom = boundingBox.y + boundingBox.height;
	var velX = game1.ball.velocity.x;
	var velY = game1.ball.velocity.y;
	var overlapX, overlapY;
		
	var collide = (game1.ball.boundingCircle.x < boundingBox.x + boundingBox.width &&
	game1.ball.boundingCircle.x + game1.ball.boundingCircle.width > boundingBox.x &&
	game1.ball.boundingCircle.y < boundingBox.y + boundingBox.height &&
	game1.ball.boundingCircle.y + game1.ball.boundingCircle.height > boundingBox.y);
	
	if (collide)
	{	
		if (velX === 0 && velY > 0)
		{
			return "top";
		} 
		else if (velX === 0 && velY < 0)
		{
			return "bottom";
		} 
		else if (velX > 0 && velY === 0)
		{
			return "left";
		} 
		else if (velX < 0 && velY === 0) 
		{
			return "right";
		} 
		else if (velX > 0 && velY > 0) 
		{
		//top or left
		overlapX = ballRight - boundingBoxLeft;
		overlapY = ballBottom - boundingBoxTop;
		if (overlapX > overlapY) 
		{
			return "top";
		} 
		else 
		{
			return "left";
		}
	} 
	else if (velX < 0 && velY > 0) 
	{
	//"top or right"
	overlapX = boundingBoxRight - ballLeft;
	overlapY = ballBottom - boundingBoxTop;
	if (overlapX > overlapY) 
	{
		return "top";
	} 
	else 
	{
		return "right";
	}
} 
else if (velX > 0 && velY < 0) 
 //<-- unmatched
{
	//bottom or left
	overlapX = ballRight - boundingBoxLeft;
	overlapY = boundingBoxBottom - ballTop;
	if (overlapX > overlapY) 
	{
		return "bottom";
	} 
	else 
	{
		return "left";
	}
} 
else if (velX < 0 && velY < 0) 
// <-- unmatched
{
	//bottom or right
	overlapX = boundingBoxRight - ballLeft;
	overlapY = boundingBoxBottom - ballTop;
	if (overlapX > overlapY) 
	{
		return "bottom";
	} 
	else 
	{
		return "right";
	}
}



}
else
{
	return false;
}
};
		
		
				
			
			
		

function handle_collision(ball, box, plane){
	var ballPosition = new Vector ((ball.center.x + (ball.velocity.x*-1)), ball.center.y + (ball.velocity.y*-1));
	var projectionLength = Math.abs(ball.velocity.project(plane));
	var planeNormal = plane.planeNormal();
	var newPosition = ball.velocity.reflect(projectionLength,planeNormal,ballPosition);

	var newDirection = newPosition.subtract(ball.center);
	
	ball.velocity.x = newDirection.x*ball.speed;
	ball.velocity.y = newDirection.y*ball.speed;
	
	if(box.disappears === true){
		//ctx.clearRect(box.x,box.y,box.width,box.height);
		box.isDisappearing = true;
	}
	
};

function movingPaddle_temp(event) {
    x = parseInt(event.x)-game1.paddle.half;
    y = parseInt(event.y);
    if (game1 != null) {
        game1.paddle.movingPaddle();
    }
};