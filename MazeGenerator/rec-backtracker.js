//Recursive backtracker
//https://en.wikipedia.org/wiki/Maze_generation_algorithm

var canvas;
var ctx;
var cols, rows;
var w = 20;
var grid = [];
var stack = [];
var frames = 5;
var current;

$(document).ready(function(){
	setup();
	setInterval(draw, 1000/frames);
});

function setup(){
	setUpCanvas("white");
	cols = Math.floor(canvas.width/w);
	rows = Math.floor(canvas.width/w);
	createCells();
	current = grid[0];
}

function draw(){
	displaycells();
	traverseCells();
	current.paint();
}

function traverseCells(){
	//STEP 1
	current.visited = true;
	var next = current.checkNeighbors();
	if(next){
		next.visited = true;
		//STEP 2 This is where BackTracking takes place
		stack.push(current);
		//STEP 3
		removeWalls(current, next);
		// console.log(current);
		//STEP 4
		current = next;
	}
	else if (stack.length > 0){
		current = stack.pop();
	}
	// stack.pop();
}

function removeWalls(c, n){
	var x = c.i - n.i;
	if(x == 1){
		c.walls.left = false;
		n.walls.right = false;
	}else if( x == -1){
		c.walls.right = false;
		n.walls.left = false;
	}
	var y = c.j - n.j;
	if(y == 1){
			c.walls.top = false;
			n.walls.bottom = false;
		}else if( y == -1){
			c.walls.bottom = false;
			n.walls.top = false;
		}

}

function setUpCanvas(color){
	canvas = document.getElementById('canvas-maze');
	ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.fillStyle= color;
	ctx.fillRect(0,0,canvas.width, canvas.height);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0,0,canvas.width, canvas.height);
}

function createCells(){
	for(var j = 0; j < rows; j++){
		for (var i = 0; i < cols; i++){
			var cell = new Cell(i,j,w);
			grid.push(cell);
		}
	}
}

function displaycells(){
	for(var i = 0 ; i < grid.length; i++){
			grid[i].show();
	}
}

function solveGrid(){
	//Work in progress
}
