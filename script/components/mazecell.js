function Cell(x,y,w,p){
	this.x = x;
	this.y = y;
	this.h = 0;
	this.f = 0;
	this.g = 0;
	this.w = w;
	this.camefrom = undefined;
	this.neighbors = {
		top: undefined,
		right: undefined,
		left: undefined,
		bottom: undefined,
		topRight: undefined,
		bottomRight: undefined,
		bottomLeft: undefined,
		topLeft : undefined
	}
	this.blocked = false;

	if(Math.random(1) <  p){
		this.blocked = true;
	}

	this.draw = function(color){
		if(this.blocked == true){
			color = "black";
		}
		else {
			drawRect(this.x * this.w + 1, this.y *  this.w + 1, this.w - 2 , this.w - 2 , color);
		}
	}

	this.getNeighbors = function(graph){
		this.neighbors.top = (this.y > 0) ? graph[this.x][this.y - 1] : undefined;
		this.neighbors.right  = (this.x < grid.length - 1) ? grid[this.x + 1][this.y] : undefined;
		this.neighbors.bottom = (this.y < grid[0].length - 1) ? grid[this.x][this.y + 1] : undefined;
		this.neighbors.left   = (this.x > 0) ? grid[this.x - 1][this.y] : undefined ;
		//Corners

		// this.neighbors.topRight = (this.x < grid.length - 1 && this.y < 0) ? grid[this.x + 1][this.y - 1] : undefined ;
		// this.neighbors.bottomRight = (this.x < grid.length - 1 && this.y < grid[0].length - 1) ? grid[this.x + 1][this.y + 1] : undefined ;
		// this.neighbors.bottomLeft = (this.x > 0 && this.y > grid[0].length - 1) ? grid[this.x - 1][this.y - 1] : undefined ;
		// this.neighbors.topLeft = (this.x > 0 && this.y > 0) ? grid[this.x - 1][this.y - 1] : undefined ;

		var top = this.neighbors.top;
		var right = this.neighbors.right;
		var bottom = this.neighbors.bottom;
		var left = this.neighbors.left;


		this.neighbors.topRight = (this.x < grid.length - 1 && this.y < 0 && (!top.blocked || !right.blocked) ) ? grid[this.x + 1][this.y - 1] : undefined ;
		this.neighbors.bottomRight = (this.x < grid.length - 1 && this.y < grid[0].length - 1 && (!bottom.blocked || !right.blocked)) ? grid[this.x + 1][this.y + 1] : undefined ;
		this.neighbors.bottomLeft = (this.x > 0 && this.y > grid[0].length - 1  && !bottom.blocked && !left.blocked) ? grid[this.x - 1][this.y - 1] : undefined ;
		this.neighbors.topLeft = (this.x > 0 && this.y > 0  && !top.blocked && !left.blocked) ? grid[this.x - 1][this.y - 1] : undefined ;

		return this.neighbors;
	}

	this.euclideanDist = function(v){
		var edist = Math.sqrt(
			Math.pow((v.x - this.x),2) + Math.pow((v.y - this.y),2)
		);

		return edist;
	}

	this.taxicabDist = function(v){
		var tcdist = Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
		return tcdist;
	}

}
