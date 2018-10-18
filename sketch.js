var mic;
var row = 10;
var col = 15;
function setup(){
	createCanvas(window.innerWidth, window.innerHeight);
  mic = new p5.AudioIn()
  mic.start();
}

function draw(){
  background(0);
  micLevel = mic.getLevel();
	var ballSize = constrain(micLevel * 200, 0, 100);
	
	for(var i = 0; i < row; i++){
		for(var j = 0; j < col; j++){
			ellipse(i * width/row + (width/row)*0.5, j * height/col + (height/col)*0.5, ballSize, ballSize);
		}
	}
}