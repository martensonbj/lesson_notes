var canvas = document.getElementById('main-canvas');
var context = canvas.getContext('2d');

function kidOnTheBlock(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

kidOnTheBlock.prototype.draw = function () {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

kidOnTheBlock.prototype.move = function () {
  this.y++;
  return this;
};

var newKids = [];

var donnie = new kidOnTheBlock(50, 50, 10, 10);
var jordan = new kidOnTheBlock(100, 50, 10, 10);

newKids.push(jordan);
newKids.push(donnie);

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  newKids.forEach(function (kid) { kid.draw().move(); });
  requestAnimationFrame(gameLoop);
});

canvas.addEventListener('click', function (event) {
  var click = getClickPosition(event);
  newKids.push(new kidOnTheBlock(click.x, click.y, 10, 10));
});
