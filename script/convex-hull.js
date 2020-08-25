//https://en.wikipedia.org/wiki/Gift_wrapping_algorithm
//Conver Hull by Jarvis March

var canvas;
var ctx;
var v;
var vertices = CreateRandomVertices(20);
var edges = [];
var wrap = [];

var leftMost;
var currentVertex;
var index;
var nextVertex;

$(document).ready(function(){
	setup();
	translateCenter();
	setInterval(draw,1000/60);
	draw();
});

function setup(){
	setUpCanvas("white");
	// CreateRandomEdges(7);
}

function draw(){
	DrawObjects(vertices, "black");
	ConvexHull(vertices);
	leftMost.draw("red");
}

function translateCenter(){
	ctx.translate(canvas.width/4, canvas.height/4 );
}

function ConvexHull(points){
	points.sort((a,b) => a.x - b.x);
	//Find the leftMost point
	leftMost = points[0];
	currentVertex = leftMost;
	nextVertex = points[1];
	drawLine(currentVertex, nextVertex, "green");
	index = 2;
	var checking = points[index];
	drawLine(currentVertex, checking, "purple");

}

// fuction CH(points){
// 	var ans = [];
// 	points.sort((a,b) => a.x - b.x);
// 	var leftMostPoint = points[0];
// 	var current = leftMostPoint;
// 	ans.add(leftMostPoint);
//
// 	while(true){
// 		var nextTarget = points[1];
// 		for(int i = 2; i < points.length; i++){
// 			if(points[i] == current){
// 				continue;
// 			}
//
// 		}
// 	}
//
//
// }

function setUpCanvas(color){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctx.fillStyle = color;
	ctx.fillRect(0,0,canvas.width, canvas.height);
}

function DrawObjects(array, color){
	for(var i = 0; i < array.length; i++)
		array[i].draw(color);
}

function CreateRandomVertices(num){
	var array = [];
	for(var i = 0; i < num; i++){
		v = new Vertex((Math.random()*400) + 1, (Math.random()*400) + 1);
		array.push(v);
	}
	return array;
}

function CreateRandomEdges(num){
	var n = Vertices.length;
	var e;
	for(var i = 0; i < num; i++){
		e = new Edge(Vertices[Math.trunc(Math.random()*n)], Vertices[Math.trunc(Math.random()*n)]);
		Edges.push(e);
	}
}

function drawLine(v1,v2, color){
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.moveTo(v1.x,v1.y);
		ctx.lineTo(v2.x,v2.y);
		ctx.stroke();
}

function crossProduct(p1, p2, p3){

}
