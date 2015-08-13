var level = function (){
this.levels = [];
};

var levelMap1 = function (){
	this.count = 28;
	this.bricks =[];
	
	for (var y = 0; y < 4; y++)
	{
		for (var x = 0; x < 7; x++)
		{
			this.bricks.push({
				x: x,
				y: y,
				//console.log(x,y);
			})
			console.log(x,y);
		}
	}
	//return game1.level1;
		};

var levelMap2 = function (){

	this.count = 30;
	this.bricks = [];
	
	for (var y = 0; y < 5; y++)
	{
		for (var x = 0; x < 7; x++)
		{
			if(x%2===0 || y === 0 || y > 3){
			this.bricks.push({
				
				x: x,
				y: y,
			
			})
			console.log(x,y);
		}
	}
	}
	
		};