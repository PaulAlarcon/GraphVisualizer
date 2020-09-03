function Cell{
	constructor(i,j, w){
		this.i = i;
		this.j = j;
		this.x = i.w;
		this.y = j.w;
		this.walls = {
			top : true,
			right : true,
			bottom : true,
			left : true,
		};
		this.visited = false;
	}

	show(){
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

	index(i,j){
		if( i < 0 || j < 0 || i > cols - 1|| j > rows - 1)
			return -1;
		else
			return i + j * cols;
	}

	checkNeighbors(){
		//There are four checkNeighbors
		var neighbors = [];

		var top    = grid[index(this.i    , this.j - 1)];
		var right  = grid[index(this.i + 1, this.j    )];
		var bottom = grid[index(this.i   , this.j + 1)];
		var left   = grid[index(this.i - 1, this.j    )];

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

	paint(){
	ctx.beginPath();
	drawRect(this.x,this.y,w,w,"red");
}

	drawRect(x1 , y1 , x2, y2 , color){
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.strokeRect(x1,y1, x2,y2);
		ctx.fillStyle = color;
		ctx.fillRect(x1,y1,x2,y2);
	}

	}
