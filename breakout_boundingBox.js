var canvas = null;
var ctx = null;

$(document).ready(function(){
canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
Focusable="True"'
});

var boundingBox = function(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	};
	
DrawObject.prototype.drawPaddle(paddle)