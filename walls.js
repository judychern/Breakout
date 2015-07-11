//fix wall parameters

var Walls = function(wall_left, wall_top, wall_right){
	this.wall_left = new boundingBox(0,0,100,900);
	this.wall_top = new boundingBox(100,0,1400,100);
	this.wall_right = new boundingBox(1400,0,100,900);
	};
	
Walls.prototype.drawWalls = function(walls){
	this.wall_left.drawBox(this.wall_left.x,this.wall_left.y,this.wall_left.width,this.wall_left.height);
	this.wall_top.drawBox(this.wall_top.x,this.wall_top.y,this.wall_top.width,this.wall_top.height);
	this.wall_right.drawBox(this.wall_right.x,this.wall_right.y,this.wall_right.width,this.wall_right.height);
}

function test2(event){
	if(event.keyCode =='W'.charCodeAt()){
		walls1 = new Walls(this.wall_left,this.wall_top,this.wall_right);
		walls1.drawWalls(walls1);
	}
};