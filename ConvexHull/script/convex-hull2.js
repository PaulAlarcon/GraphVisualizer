import * as Canvas from "./util/canvas.js";
import * as Util from "./util/util.js";

const limitX = Canvas.context.canvas.width;
const limitY = Canvas.context.canvas.height;

const POINTS = Util.createRandomPoints(30, limitX, limitY);

POINTS.forEach((p) => {
  Canvas.drawCircle(p.x, p.y, 5, "black");
});

/*Convex Hull*/

const sortPoints = (arr_of_points) => {
  arr_of_points.sort((a, b) => a.x - b.x);
};

const Vector = (p1, p2) => {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
};

const CrossProduct = (v1, v2) => {
  return v1.x * v2.y - v2.x * v1.y;
};

const convexHull = (points) => {
  let hull = [];
  points.sort((a, b) => a.x - b.x);
  let leftMost = points[0];
  let currentPoint = leftMost;
  hull.push(currentPoint);
  let nextPoint = points[1];
  let index = 2;

  while (nextPoint != leftMost) {
    let v1 = Vector(currentPoint, nextPoint);
    let v2 = Vector(currentPoint, points[index]);
    if (CrossProduct(v1, v2) < 0) nextPoint = points[index];  
    index++;
    if ((index = points.length)) {
      hull.push(nextPoint);
      currentPoint = nextPoint;
      index = 0;
      nextPoint = leftMost;
    }
  }
  return hull;
};

const ConvexHullAns = convexHull(POINTS);
console.log(ConvexHullAns.length);

// Drawing onto the screen
ConvexHullAns.forEach((p, index) => {
  let nextPoint;
  if (ConvexHullAns.length - 1 == index) {
    nextPoint = 0;
  } else {
    nextPoint = index + 1;
  }
  Canvas.drawCircle(p.x, p.y, 10, "green");
  Canvas.drawLine(
    p.x,
    p.y,
    ConvexHullAns[nextPoint].x,
    ConvexHullAns[nextPoint].y
  );
});
