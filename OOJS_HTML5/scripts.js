var canvas = document.getElementById('main-canvas');
var context = canvas.getContext('2d');

function KidOnTheBlock(x, y, width, height, color){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
}

function Circle(x, y, radius, startAngle, endAngle){
  this.x = x;
  this.y = y;
  this.radius = Math.floor(Math.random() * 10) + 1;
  this.startAngle = 0;
  this.endAngle = Math.Pi * 2;
}

var newKids = [];
var circles = [];

var jordan = new KidOnTheBlock(10, 50, 10, 10, "blue");
var donnie = new KidOnTheBlock(10, 100, 10, 10, "red");

newKids.push(donnie);
newKids.push(jordan);

KidOnTheBlock.prototype.draw = function(color){
  context.fillStyle= this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

KidOnTheBlock.prototype.move = function(){
  this.y++;
  return this;
};

Circle.prototype.draw = function(){
  context.beginPath();
  context.fillStyle = "rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')";

  context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
  context.fill();
  return this;
};



requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  newKids.forEach(function (kid) { kid.draw().move(); });
  circles.forEach(function (circle) { circle.draw(); });
  requestAnimationFrame(gameLoop);
});

canvas.addEventListener('click', function(event){
  var click = getClickPosition(event);
  console.log(click);
  newKids.push(new KidOnTheBlock(click.x, click.y, 10, 10, "pink"));
  circles.push(new Circle(click.x, click.y));
});
