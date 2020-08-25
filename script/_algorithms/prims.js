//http://www.mathcs.emory.edu/~cheung/Courses/171/Syllabus/11-Graph/prim2.html

var canvas;
var ctx;

var vertices = [];

var edges = [];

$(document).ready(function(){
	setup();
	setInterval(draw,1000/60);
});

function setup(){
	setUpCanvas("black");
}

function draw(){
	DrawObjects(vertices, "white");
}

function setUpCanvas(color){
	canvas = document.getElementById('canvas-prims');
	ctx = canvas.getContext('2d');
	ctx.fillStyle = color;
	ctx.fillRect(0,0, canvas.width, canvas.height)
	// while()
	canvas.addEventListener("click",storePoints);
}

function storePoints(event){
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	v = new Vertex(x, y);
	vertices.push(v);
}

function DrawObjects(array, color){
	for(var i = 0; i < array.length; i++)
		array[i].draw(color);
}

function PrimsMST(){
	//initialization
	var reached = [];
	var unreached = [];

	//copy all vertices into unreached
	unreached = [...vertices];

	//Pick a random vertex and add it to reached and remove from unreached
	reached.push(unreached[0]);
	unreached.splice(0, 1);

	while(unreached.length > 0){
		var maxDist = Number.MAX_VALUE;
		var rIndex;
		var uIndex;
		for(var i = 0; i < reached.length; i++){
			for(var j = 0; j < unreached.length; j++){
					var v1 = reached[i];
					var v2 = unreached[j];
					var currentDist =  v1.distance(v2);
					if(currentDist < maxDist){
							maxDist = currentDist; //We wanna find the smallest distance
							rIndex = i;
							uIndex = j;
						}
					}
				}
		var e = new Edge(reached[rIndex],unreached[uIndex]);
		edges.push(e);
		e.draw();
		reached.push(unreached[uIndex]);
		unreached.splice(uIndex, 1);

		console.log(edges);
	}
}

function ClearPoints(){
	if(vertices.length > 0){
		vertices = [];
		clearCanvas();
	}
	else {
		console.log("Already Empty");
	}
}

function RandomizePoints(){
	if(vertices.length > 0){
		alert('You already have set of point, clear first!');
	}
	else {
		vertices = CreateRandomVertices(20);
	}
}

function clearCanvas(){
	ctx.fillStyle = "black";
	ctx.fillRect(0,0, canvas.width, canvas.height);
}

function CreateRandomVertices(num){
	var array = [];
	var buffer = 20;
	for(var i = 0; i < num; i++){
		v = new Vertex(
		(Math.random() * ((canvas.width - buffer) - buffer) + buffer),
		(Math.random() * ((canvas.width - buffer) - buffer) + buffer))
		array.push(v);
	}
	return array;
}
