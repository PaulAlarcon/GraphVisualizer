class Edge{
	constructor(p1, p2){
		this.p1 = p1;
		this.p2 = p2;
	}
		getX1(){
			return this.p1.x;
		}
		getY1(){
			return this.p1.y;
		}
		getX2(){
			return this.p2.x;
		}
		getY2(){
			return this.p2.y;
		}
		draw(){
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.moveTo(this.getX1(),this.getY1());
			ctx.lineTo(this.getX2(),this.getY2());
			ctx.lineWidth = 3;
			ctx.stroke();
		}
	}
