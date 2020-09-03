import * as util from "./util/util.js"
import * as canvas from "./util/canvas.js"

let points = util.createRandomPoints(20, canvas.context.canvas.width, canvas.context.canvas.height)

let edges = []

points.forEach( (p, indeX) => {
let numberEdges = Math.floor(Math.random());
for(let i = 0; i <= numberEdges; i++){
    let randomNumber = Math.floor(Math.random() * points.length)
    if(indeX != randomNumber) edges.push({p1 : p, p2 : points[randomNumber]});
}
})

console.log(points);

points.forEach(p => {
    canvas.drawCircle(p.x, p.y, 3, "white")
});

edges.forEach(e => {
    canvas.drawLine(e.p1.x, e.p1.y, e.p2.x, e.p2.y, "red");
})



edges.forEach(e => {
    e.distance = Math.abs(((e.p1.x - e.p2.x) + (e.p1.y - e.p2.y)))
})

edges.sort((a, b) => (a.distance > b.distance) ? 1 : -1)

const smallestEdge = edges[0];
canvas.drawLine(smallestEdge.p1.x, smallestEdge.p1.y, smallestEdge.p2.x, smallestEdge.p2.y, "white")
