class Vertex{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	showCoordenates(){
		console.log(this.x,this.y);
	}
	updateX(x){
		this.x = x;
		return this;
	}
	updateY(y){
		thix.y = y;
		return this;
	}
	draw(color){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
		ctx.fill();
	}
	distance(v){
		var dist = Math.sqrt(
			Math.pow((v.x - this.x),2) + Math.pow((v.y - this.y),2)
		);

		return dist;
	}

}
