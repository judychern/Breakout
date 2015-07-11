//have velocity and speed
//if statement fix
//relate paddle direction with drawscreen

var speed = null;
var direction = null;
var velocity = null;
var ballWidth = null;
var ballHeight = null;
var paddleMiddle = null;
var distance = null;
var rotationFactor = null;
var velocity2 = null;
var wall_toPaddle = null;

var Ball = function(center, radius, startAngle, endAngle, counterclockwise){
	this.center = new Vector (800,500);
	this.radius = radius;
	this.startAngle = startAngle;
	this.endAngle = endAngle;
	this.counterclockwise = counterclockwise;
	};
	
Ball.prototype.drawBall_start = function(ball1){
	ctx.beginPath();
	ctx.arc(this.center.x,this.center.y,this.radius, this.startAngle, this.endAngle, this.counterclockwise);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.closePath();
	};
	
Ball.prototype.drawScreen = function(){
	//loop before ball has hit the paddle
		direction = new Vector (5,180);
		
		speed = 1;
		
		velocity = new Vector(direction.x*speed, direction.y*speed);
		
		var unitsPerFrameX = velocity.x*0.2;
		var unitsPerFrameY = velocity.y*0.2;
	
		ctx.clearRect(0,0,1600,1000);
		
		this.center.x += unitsPerFrameX;
		this.center.y += unitsPerFrameY;
		
		boundingCircle.x += unitsPerFrameX;
		boundingCircle.y += unitsPerFrameY;
		
		walls1.drawWalls(walls1);
		ball1.drawBall_start(ball1);
		paddle1.draw();
	};
	
Ball.prototype.drawScreen2 = function(){
		//loop for when ball hits the paddle
		
		var unitsPerFrameX = velocity2.x*0.2;
		var unitsPerFrameY = velocity2.y*0.2;
	
		ctx.clearRect(0,0,1600,900);
		
		this.center.x += unitsPerFrameX;
		this.center.y += unitsPerFrameY;
		
		boundingCircle.x += unitsPerFrameX;
		boundingCircle.y += unitsPerFrameY;
		
		walls1.drawWalls(walls1);
		ball1.drawBall_start(ball1);
		paddle1.draw();
	};

Ball.prototype.drawScreen3 = function(){
		
		var unitsPerFrameX = velocity2.x*0.2;
		var unitsPerFrameY = velocity2.y*0.2;
	
		ctx.clearRect(0,0,1600,1000);
	
		this.center.x += unitsPerFrameX;
		this.center.y += unitsPerFrameY;
		
		boundingCircle.x += unitsPerFrameX;
		boundingCircle.y += unitsPerFrameY;
		
		walls1.drawWalls(walls1);
		ball1.drawBall_start(ball1);
		paddle1.draw();
};

Ball.prototype.gameLoop = function(){
	//detects when the ball hits the paddle
		if (boundingCircle.x < paddle1.x + paddle1.width &&
			 boundingCircle.x + boundingCircle.width > paddle1.x &&
			 boundingCircle.y < paddle1.y + paddle1.height &&
			 boundingCircle.y + boundingCircle.height > paddle1.y){
				
				//direction = new Vector (50,180);
	
				//speed = 1.5;
		
				velocity = new Vector(direction.x*speed, direction.y*speed*-1);
		
				paddleMiddle = paddle1.width/2 + paddle1.x; 
	
				if(ball1.center.x > paddleMiddle){
					distance = ball1.center.x - paddleMiddle;
					rotationFactor = distance/(paddle1.width/2);
					velocity2 = velocity.rotate(rotationFactor*50);
					}
					
				if(ball1.center.x < paddleMiddle){
					distance = paddleMiddle - ball1.center.x;
					rotationFactor = distance/(paddle1.width/2);
					velocity2 = velocity.rotate(rotationFactor*50);
					//rotate vector counter clockwise
					velocity2.x = velocity2.x*-1;
					}
				//loop for if ball hits the paddle
			window.setTimeout(ball1.gameLoop2,20);
			 }
			 else{
				 //ball has not hit the paddle
	  window.setTimeout(ball1.gameLoop,20);
	  ball1.drawScreen();
			 
		
}
};

Ball.prototype.gameLoop2 = function(){
	if(boundingCircle.x < walls1.wall_top.x + walls1.wall_top.width &&
			 boundingCircle.x + boundingCircle.width > walls1.wall_top.x &&
			 boundingCircle.y < walls1.wall_top.y + walls1.wall_top.height &&
			 boundingCircle.y + boundingCircle.height > walls1.wall_top.y) 
			 {
				
				//direction = new Vector (50,180);
	
				//speed = 1.5;
	
				velocity2.y = velocity2.y*-1;
				
				window.setTimeout(ball1.gameLoop3,20);	 
					ball1.drawScreen3();	
			 }
	else if(boundingCircle.x < walls1.wall_left.x + walls1.wall_left.width &&
			 boundingCircle.x + boundingCircle.width > walls1.wall_left.x &&
			 boundingCircle.y < walls1.wall_left.y + walls1.wall_left.height &&
			 boundingCircle.y + boundingCircle.height > walls1.wall_left.y){
				velocity2.x = velocity2.x*-1;
				//velocity = new Vector(direction.x*speed*-1, direction.y*speed);
				
				window.setTimeout(ball1.gameLoop3,20);
			 }
			 
	else if(boundingCircle.x < walls1.wall_right.x + walls1.wall_right.width &&
			 boundingCircle.x + boundingCircle.width > walls1.wall_right.x &&
			 boundingCircle.y < walls1.wall_right.y + walls1.wall_right.height &&
			 boundingCircle.y + boundingCircle.height > walls1.wall_right.y){
				 	velocity2.x = velocity2.x*-1;
				//velocity = new Vector(direction.x*speed*-1, direction.y*speed);
				
				window.setTimeout(ball1.gameLoop3,20);
				
				
			 }
		

	else{
	window.setTimeout(ball1.gameLoop2,20);
	ball1.drawScreen2();
	}
};

Ball.prototype.gameLoop3 = function(){
	 var x = boundingCircle.x < paddle1.x + paddle1.width &&
			 boundingCircle.x + boundingCircle.width > paddle1.x &&
			 boundingCircle.y < paddle1.y + paddle1.height &&
			 boundingCircle.y + boundingCircle.height > paddle1.y;
	if(boundingCircle.x < paddle1.x + paddle1.width &&
		 boundingCircle.x + boundingCircle.width > paddle1.x &&
		 boundingCircle.y < paddle1.y + paddle1.height &&
			 boundingCircle.y + boundingCircle.height > paddle1.y) {
				 
				 window.setTimeout(ball1.gameLoop,20);
			 }
			 
	if(boundingCircle.x < walls1.wall_top.x + walls1.wall_top.width &&
			 boundingCircle.x + boundingCircle.width > walls1.wall_top.x &&
			 boundingCircle.y < walls1.wall_top.y + walls1.wall_top.height &&
			 boundingCircle.y + boundingCircle.height > walls1.wall_top.y) 
			 {
				
				//direction = new Vector (50,180);
	
				//speed = 1.5;
	
				velocity2.y = velocity2.y*-1;
				
				window.setTimeout(ball1.gameLoop3,20);	
				ball1.drawScreen3();				
			 }

	else{
		
	window.setTimeout(ball1.gameLoop3,20);
	ball1.drawScreen3();
	}
};

	
function test3(event){
	if(event.keyCode =='B'.charCodeAt()){
		ball1 = new Ball(this.center,40,0,2*Math.PI, false);
		ball1.drawBall_start(ball1);
		boundingCircle = new boundingBox(ball1.center.x - ball1.radius, ball1.center.y - ball1.radius, ball1.radius*2, ball1.radius*2);
	}

	if(event.keyCode =='S'.charCodeAt()){
	
	ball1.gameLoop();
	}
};