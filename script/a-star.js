//Purely inspired by https://www.youtube.com/watch?v=EaZxUCWAjb0&t=98s
//https://en.wikipedia.org/wiki/A*_search_algorithm

let canvas;
let ctx;
let grid;

let cols = 30;
let rows = 30;

let probability = 0.3;

let tGrid = [
	[new Cell(0,0,5),new Cell(1,0,5)],
	[new Cell(0,1,5),new Cell(1,1,5)]
];

console.log(tGrid);

let scale;

let openSet = [];
let closedSet = [];

let start ;
let end ;

let path = [];

let interval; //interval to stop the loop

let ballX;
let ballY;


	setup();
	interval = setInterval(draw,1000/30);
	// draw();

function setup(){
	setUpCanvas("black");
	grid = create2DArray(cols, rows);
	scale = canvas.width/cols;
	populateArray(grid, scale, probability);

	aStarInit();

	ballX = canvas.width/(cols*2)
	ballY = canvas.width/(cols*2)
}

function moveUp(y){
	return y = y - 1;

}

function moveRight(x){
	return x = x + 1;
}

function moveDown(y){
	return y = y + 1;
}

function moveLeft(x){
	return x = x - 1;
}

function draw(){
	draw2DObjects(grid , "white");
	solveMaze(grid);
	// solveBruteForce();
}

function solveBruteForce(){
	let limitX = canvas.width - scale/2;
	let limitY = canvas.height - scale/2;

	drawCircle(ballX, ballY, scale);

	if(ballX < limitX && grid[ballX][moveRight(ballY)]){
		ballX = moveRight(ballX);
		// console.log(ballX);
	}
	else if( ballY < limitY ){
		ballY = moveDown(ballY);
	}
}

function drawCircle(x, y, r){
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(x,y,r/4, 0, 2*Math.PI);
	// ctx.fill();
	ctx.stroke();
}

function setUpCanvas(color){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctx.fillStyle = color;
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.strokeStyle = "black";
	ctx.stroke();
}

//New methods

function aStarInit(){
	start = grid[0][0];
	end = grid[cols-1][rows-1];
	openSet.push(start);
	start.blocked = false;
	end.blocked = false;

}

function create2DArray(c , r){
	let arr = new Array(c);
	for(let i = 0; i < c; i++){
		arr[i] = new Array(r);
	}
	return arr;
}

function populateArray(arr , weight, prob){
	for( let i = 0; i < cols; i++){
			for(let j = 0; j < rows; j++){
				arr[i][j] = new Cell(i,j,weight,prob);
			}
	}
	setNeightbors(grid);
}

function draw2DObjects(grid, color){
	for(i = 0; i < grid.length; i++ ){
		for(j = 0; j < grid[i].length; j++){
			grid[i][j].draw(color);
		}
	}
}

function drawObjects(arr, color){
	for(let i = 0; i < arr.length; i++){
		arr[i].draw(color);
	}
}

function drawRect(x1 , y1 , x2, y2, color){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillRect(x1,y1,x2,y2);
	}

function paintNeighbors(a, g, color){
	let n = Object.values(a.getNeighbors(g));
	for (let c of n) {
		if(c)
  	c.draw(color);
	}
}

function setNeightbors(graph){
	for(i = 0; i < graph.length; i++ ){
		for(j = 0; j < graph[i].length; j++){
			graph[i][j].getNeighbors(grid);
		}
	}
}

function heuristic(a,b){
	let d = 0;
	// let d = a.taxicabDist(b);
	// let d = a.euclideanDist(b);
	return d;
}

function solveMaze(grid){

	start.draw("blue");
	end.draw("pink");

	if(openSet.length > 0){
		let current = openSet[getSmallestF(openSet)];

		if(current == end){

			document.getElementById('resolution').innerHTML = "<h2>Path Found</h2>";

			console.log("Done!");

			clearInterval(interval);

		}

		removeFromArray(openSet, current);
		closedSet.push(current);

		let neighbors = Object.values(current.neighbors);
		for (let n of Object.values(neighbors)) {
				if(!closedSet.includes(n) && n && !n.blocked){
					let tentG = current.g + current.euclideanDist(n);

					let newPath = false;
					if(openSet.includes(n)){
						if(tentG < n.g){
								n.g = tentG;
								newPath = true;
						}
					}
					else{
							openSet.push(n);
							n.h = heuristic(n, end);
							newPath = true;
						}

						if(newPath){
							n.h = heuristic(n,end)
							n.f = n.g + n.h;
							n.camefrom = current;
						}

					}
				}
				drawObjects(openSet, "yellow");
				drawObjects(closedSet, "pink");
				let temp = current;
				path = [];
				path.push(temp);
				while(temp.camefrom){
					path.push(temp.camefrom);
					temp = temp.camefrom;
				}
				drawObjects(path, "red");
		}
		else {
			console.log("could not find a path");
			stopLoop();
			// document.getElementById('resolution').innerHTML = "<h2>Could not find a path</h2>";
		}
}

function getSmallestF(arr){
	let ans = 0;
	for(let i = 1; i < arr.length; i++ ){
		if(openSet[i].f < arr[ans].f){
			ans = i;
		}
	}
	return ans;
}

function removeFromArray(arr, a){
	for(let i = arr.length - 1 ; i >= 0; i--){
		if(arr[i] === a){
			arr.splice(i, 1);
		}
	}
}

function stopLoop(){
	clearInterval(interval);
}
