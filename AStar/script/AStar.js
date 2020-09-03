import * as Canvas from "./util/canvas.js";
import * as Util from "./util/util.js";

const CELLSIZE = 50;
const ROWS = Math.floor(Canvas.context.canvas.width / CELLSIZE);
const COLUMNS = Math.floor(Canvas.context.canvas.height/ CELLSIZE);
const PROBABILY = 0.2;

let MAZE = Util.setUpMaze(ROWS, COLUMNS, PROBABILY);
Canvas.drawMaze(MAZE, CELLSIZE);

window.addEventListener("resize", () => {
	Canvas.render();
	Canvas.draw();
	Canvas.drawMaze(MAZE, CELLSIZE);
  });


class Cell{
	constructor(){
		this.f = 0;
		this.g = 0;
		this.h = 0;
	}
}







const STARTING_POINT = MAZE[0][0];
const END_POINT = MAZE[4][19];

const A_STAR = (startX, startY, endX, endY, maze) => {
	let OPEN_LIST = [];
	let CLOSED_LIST = [];

	const END = maze[endX][endY];

	OPEN_LIST.push(maze[startX][startY]);
	let currentNode;
	while(OPEN_LIST.length != 0){
		currentNode = OPEN_LIST.shift();
		if(currentNode == END) break;


	}

	if(currentNode != END) 
		console.log("No solution found!")

}






