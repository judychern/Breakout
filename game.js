var canvas_width = 600;
var canvas_height = 300;
var canvas = null;
var ctx = null;
var game1 = null;

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
	this.paddle = new Paddle(300, 290, 200, 10);
	this.walls = new Walls();
	this.objects = [];
	this.objects.push(this.walls.top);
	this.objects.push(this.walls.right);
	this.objects.push(this.walls.left);

};
	

// make all your bricks

// collect your bricks


// render function
Game.prototype.renderBricks  = function () {
 for (var i = 0; i < this.objects.length; i++) {
  var brick = this.objects[i];
  brick.drawBox(brick.x, brick.y, brick.width, brick.height);
 }
}

	
	
	
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
	
	if(detect_collide(game1.walls.right)){
		console.log("BOOM!");
	}
	
	if(detect_collide(game1.walls.left)){
		console.log("BOOM!");
	}
	
	if(detect_collide(game1.walls.top)){
		console.log("BOOM!");
	}
	window.setTimeout(game1.gameLoop,20);
};

Game.prototype.gameLoop = function() {
    //detects when the ball hits the paddle
	var distance = game1.ball.center.x - game1.paddle.middle;
    if (detect_collide(game1.paddle)){
//replace with reflection function
		
		
        if (game1.ball.center.x > game1.paddle.middle) {
 
           var rotationFactor = distance / (game1.paddle.width / 2);
		  game1.ball.velocity = game1.ball.velocity.rotate(rotationFactor * 50);
		 game1.ball.velocity.x = game1.ball.velocity.x*-1;
        }
		
        if (game1.ball.center.x < game1.paddle.middle) {
            distance = game1.paddle.middle - game1.ball.center.x;
            rotationFactor = distance / (game1.paddle.width / 2);
           game1.ball.velocity = game1.ball.velocity.rotate(rotationFactor * 50);
            //rotate vector counter clockwise
			//game1.ball.velocity.x = game1.ball.velocity.x*-1;
			
        }
		game1.ball.velocity.y = game1.ball.velocity.y*-1;
	}
	for(var i = 0; i<game1.objects.length;i++){
		var collidableObject = game1.objects[i];
		var collisionDirection = detect_collide(collidableObject);
		if(collisionDirection==="top"){
			handle_collision(game1.ball,collidableObject,collidableObject.planeTop);
		}
	}
	//if (detect_collide(game1.walls.top)){
	//	handle_collision(game1.ball,game1.walls.top);
	//}
	
	//if(detect_collide(game1.walls.left)){
	//	handle_collision(game1.ball,game1.walls.left);
	//}
	
	//if(detect_collide(game1.walls.right)){
	//	handle_collision(game1.ball,game1.walls.right);
	//}
	//objects - add walls and bricks
	
	//ball has not hit the paddle
	game1.drawScreen();
};

function gameScreen (){
	game1 = new Game();
	var brick1 = new boundingBox(100,100,50,10);
	game1.objects.push(brick1);
	game1.drawStartScreen();
};

function startGame(event){

    if (event.keyCode == 'S'.charCodeAt()) {
        game1.gameLoop();
    }
};

function detect_collide(boundingBox){
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
		if (collide){
			console.log("This is a collision");
		if (velx === 0 && velY > 0){
		return "top";
		} else if (velX === 0 && velY < 0){
		// bottom
		} else if (velX > 0 && velY === 0){
		// left 
		} else if (velX < 0 && velY === 0) {
		// right
		} else if (velX > 0 && velY > 0) }{
		// top or left
		overlapX = ballRight - colObjectLeft;
		overlapY = ballBottom - colObjectTop;
		if (overlapX > overlapY) {
		// top
		} else {
		// left
		}
		} else if (velX < 0 && velY > 0) }{
		// top or right
		overlapX = colObjectRight - ballLeft;
		overlapY = ballBottom - colObjectTop;
		if (overlapX > overlapY) {
		// top
		} else {
		// right
		}
		} else if (velX > 0 && velY < 0) }{
		// bottom or left
		overlapX = ballRight - colObjectLeft;
		overlapY = colObjectBottom - ballTop;
		if (overlapX > overlapY) {
		// bottom
		} else {
		// left
		}
		} else if (velX < 0 && velY < 0) }{
		// bottom or right
		overlapX = colObjectRight - ballLeft;
		overlapY = colObjectBottom - ballTop;
		if (overlapX > overlapY) {
		// bottom
		} else {
		// right
		}
		}
				return true;
			}
			else {
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
};

function movingPaddle_temp(event) {
    x = parseInt(event.x);
    y = parseInt(event.y);
    if (game1 != null) {
        game1.paddle.movingPaddle();
    }
};