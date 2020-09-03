function Cell(i, j){
	this.i = i;
	this.j = j;
	this.x = this.i*w;
	this.y = this.j*w;
	this.walls = {
		top : true,
		right : true,
		bottom : true,
		left : true,
	};

	this.show = function(){
		if(this.walls.top)
		drawline(this.x    ,this.y    ,this.x + w,this.y    ,"black"); //Top
		if(this.walls.right)
		drawline(this.x + w,this.y    ,this.x + w,this.y + w,"black"); //Right
		if(this.walls.bottom)
		drawline(this.x    ,this.y    ,this.x    ,this.y + w,"black"); //Left
		if(this.walls.left)
		drawline(this.x    ,this.y + w,this.x + w,this.y + this.w,"black"); //Bottom
		if(this.visited)
			drawRect(this.x,this.y,w,w,"white");
	}

	this.checkNeighbors = function(){
		//There are four checkNeighbors
		var neighbors = [];

		var top    = grid[index(i    , j - 1)];
		var right  = grid[index(i + 1, j    )];
		var bottom = grid[index(i    , j + 1)];
		var left   = grid[index(i - 1, j    )];

		[top, right, bottom, left].forEach(n => {
		if (n && !n.visited) {
			neighbors.push(n);
		}
	});

	if(neighbors.length > 0)
		return neighbors[Math.floor(Math.random()*neighbors.length)];
		else
			return undefined;
	}

	this.paint = function(){
		drawRect(this.x,this.y,w,w,"red");
	}
}

function drawline(x1 , y1 , x2 , y2 , color ){
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();
}

function drawRect(x1 , y1 , x2, y2 , color){
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.strokeRect(x1,y1, x2,y2);
		ctx.fillStyle = color;
		ctx.fillRect(x1,y1,x2,y2);
}

function index(i,j){
	if( i < 0 || j < 0 || i > cols - 1|| j > rows - 1)
		return -1;
	else
		return i + j * cols;
}
