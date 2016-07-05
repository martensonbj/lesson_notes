# HTML5 Canvas and Object Oriented JavaScript
##### AKA Microsoft Paint for Cool Kids

## HTML5 Canvas
[HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) is an API that is included in modern browsers and let's us draw graphics and animations using JavaScript.

Essentially it let's us specify an area on our HTML page that our JavaScript file can access, giving us a theoretical "canvas".

In your HTML page, add this code into the `<body>` section.

```
<!-- index.html -->
<body>
  <canvas width="300" height="250"> </canvas>
</body>
```

HTML hands us the convenient `<canvas>` tag that we can plop into our HTML page that tells our JS where we can paint. It takes two inline attributes to specify the height and width of the area we want to work with, and defaults to a transparent background until told to be otherwise.

*ProTip: If no dimensions are specified, the default size is 300px by 150px.*

Note that although the `<canvas>` element can be sized using CSS, this is one of the rare occasions inline styling is preferred to avoid any unexpected changes down the road. During rendering, the image drawn by JS is scaled to fit the layout of the page and will respect the ratio of canvas.

Canvas is still relatively new. To accommodate for accessiblilty and deprecated browsers (although if you're currently working with IE you should probably rethink your life decisions) its important to include fallback content. Without fallback content users will see a blank screen with no additional information, which is no fun.

Let's add a quick fallback line in the event a user is accessing our page through a screen reader or is living in circa 1999 and loves Internet Explorer. Let's also add an `id` to our canvas so we can avoid future ambiguity.

```
<body>
  <canvas id="main-canvas" width="300" height="250"> <p>Placeholder for broken canvas element</p> </canvas>
</body>
```

Speaking of blank screens, let's fire up our html page. Type `open index.html` in your terminal. Right now it looks like we've done nothing, it's much easier to understand what we're working with if it isn't transparent. Why don't we throw some colors on the page for clarity.

```
/* main.css */

html {
  background-color: teal;
}

canvas {
  background-color: white;
}
```

And because we're working with an HTML element, and because everyone loves a little CSS (and also because I get to make all the rules), let's throw in some style points.

```
//main.css

canvas {
  margin-top: 5%;
  margin-left: 40%;
  box-shadow: 1px 1px 50px white;
  border-radius: 10px;
}
```

Now's the time to put some stuff onto our Canvas. Let's get our JS file set up with some variables.

```
// scripts.js

var canvas = document.getElementById('main-canvas');
var context = canvas.getContext('2d');
```

Target the element by ID 'main-canvas' on the DOM using JavaScript. Then tell the canvas what type of image rendering we're working with.  

 Currently, canvas supports two ways of rendering content, 2d and WebGL (which renders 3D content based on the OPENGL API [check out the docs here](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API). Today we'll focus on 2d.

*Note: The variable `context` in this situation is convention. It is also common to see `c` or `ctx` but you can call it whatever you want.*

Now its time to start painting. Let's start with a rectangle.

Contrary to how we were told grids work in high school math class, the canvas grid system uses a pixelation scheme that coincides with your browser window. Just like when adjusting margins or positioning of HTML elements, coordinates refer to how far a pixel is from the top left corner of the element.

Step one is to tell the canvas how we want our shape to appear. I want to fill my rectangle with a color, so I'll specify that first, and then tell the canvas where to put it, and how big to make it. Or we can outline a square. Or make it transparent.

```

// Red Square
context.fillRect(xPosition, yPosition, width, height)
context.fillStyle="red";
context.fillRect(10, 10, 50, 50);

// Outlined Square
context.strokeRect(20, 20, 50, 50);

// Green Square
context.fillStyle="rgba(0, 100, 100, 0.5)";
context.fillRect(40, 40, 50, 50);
```

 Similarly, we can draw lines. This is a bit more complicated. Imagine the computer is an idiot robot being. You need to tell it you want to begin drawing a line, what starting point to move the pencil to, where to end the line, and to let go of the pencil.

```

// Straight Line
context.beginPath();
context.moveTo(100, 20);
context.lineTo(200, 20);
context.stroke();
context.closePath();
```

All shapes are just a series of lines filled in with color. Let's use the path commands to draw a triangle.

```

// Filled Triangle
context.beginPath();
context.moveTo(100, 40);
context.lineTo(200, 40);
context.lineTo(150, 75);
context.fillStyle="rgb(255, 167, 0)"
context.fill();
```

Note: `.fill()` automatically closes the path and fills in the space with whatever `context.fillstyle()` was most recently set to, so `closePath()` is not required. `.stroke()` simply draws a line, like a border, so to avoid extra unexpected paths `.closePath()` is necessary.  

Where `closePath()` is placed affects what your shape looks like. Check out the triangle we drew with some adjustments:

```
context.beginPath();
context.moveTo(100, 80);
context.lineTo(200, 80);
context.lineTo(150, 115);
context.closePath();
context.stroke();

// Circle
context.beginPath();
var x = 150;
var y = 150;
var radius = 20;
var startAngle = 0;
var endAngle = Math.PI*2;
context.arc(x, y, radius, startAngle, endAngle);
context.fillStyle="rgb(0, 204, 153)"
context.fill();
```

## Canvas Animation

Sweet. We have shapes. Let's move on to animating those shapes with canvas animation. Ultimately what we are trying to do is tell the browser to fire off an action after a set amount of time. In the end, animations are just images of objects being moved around at high speeds - or high frames per second. Let's write some JavaScript that tells the browser to make something happen every frame for a specified duration of time.

One of the most common built-in timer functions in JavaScript is `setTimeout()`.

```
setTimeout(function () {
  console.log('SetTimeout() function was called 5 seconds ago');
}, 5000);
```

The `setTimetout()` function delays action for a determined timeframe, but because JS is single threaded all it can guarantee is that the browser will wait at least (in this example) 5000 milliseconds (5 seconds) before it calls the function.

Luckily, modern browsers have provided us with another way to handle this type of mission. According to MDN:
>"The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes as an argument a callback to be invoked before the repaint."

```
// scripts.js

requestAnimationFrame(function(){
  console.log("FIRE. Browser is ready for next frame.")
})
```
`requestAnimationFrame()` takes an argument, which is calls as soon as the browser is ready to perform the next stage of the animation sequence.

Obviously, we are going to want to have more than one frame of animation. We can do this with recursion, having the last line of a function call itself when its ready for the next frame.

Let's stick a rectangle back on our canvas for reference, and then draw a second one to make it animate across the screen. Back in your scripts.js file...

```
// scripts.js

var x = 10
requestAnimationFrame(function gameLoop() {
  console.log("doing a thing!");
  context.fillStyle="deeppink";
  context.fillRect(x++, 50, 10, 10);
  requestAnimationFrame(gameLoop);
});
```

Well. That's cool, but its also not doing what we expected. If you think about it though, it's doing exactly what we are telling it to do. We are saying "every frame, paint a square at this location". What we're missing is a command to erase the canvas in between each frame.

```
// scripts.js

var x = 50
requestAnimationFrame(function gameLoop() {
  console.log("doing a thing!");
  context.fillStyle="deeppink";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(x++, 50, 10, 10);
  requestAnimationFrame(gameLoop);
})
```

#### YOUR TURN
Draw a box that starts on the right side of the screen and moves left.   
EXTENSION: Add a condition that makes it stop at when it reaches the edge of the canvas.
Take a few minutes to add a few more boxes.


```
// scripts.js

var x = canvas.width - 20
requestAnimationFrame(function gameLoop(){
  context.clearRect(0,0,canvas.width, canvas.height);
  context.fillStyle="chartreuse";
  context.fillRect(x--, 100, 10, 10);
  if (x > 0) {
    requestAnimationFrame(gameLoop);
  }
});
```

Just for kicks let's make both happen on the same canvas.

```
var x1 = 10;
var x2 = canvas.width - 20;
requestAnimationFrame(function gameLoop(){
  context.clearRect(0,0,canvas.width, canvas.height);
  context.fillStyle="rebeccapurple";
  context.fillRect(x1++, 50, 10, 10);
  context.fillRect(x2--, 100, 10, 10);
  if ( (x2 > 0) ) {
    requestAnimationFrame(gameLoop);
  }
});
```

## Object Oriented (newKidsOnThe)Block

Also we will be switching themes a little bit. You're welcome.

Drawing individual boxes this way makes sense when we are working on such a small scale project. What about if we had 1,000 blocks? Things would get a little crazy. We need a way to have each block keep track of its own state so we can tell each block to draw itself and do all of the work for us - at this point we might as well head on over to the Vault.

OOJS allows us to write a function that contains all of the criteria we need to build our blocks. This means we can create instances of them later that can act independently without a lot of repeated code. What does that look like?
```
function KidOnTheBlock(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

var jordan = new KidOnTheBlock(10, 50, 10, 10);
var donnie = new KidOnTheBlock(10, 100, 10, 10);
```

Cool. Now each block can handle it's own properties (and down the road can be tested as an autonomous entity). Each of the properties associated with the `KidOnTheBlock()` object are unique to that said block. But what about things they all have in common? Both `jordan` and `donnie` should be able to share methods (and dance moves). Enter prototype functions and OOJS at it's finest.

(KidOnThe)Blocks also need to be able to draw themselves onto a canvas, not just exist in the ether. AND maybe some animation would be cool. Ideally they also stay out of jail. (Donnie)

This is where `Block.prototype` comes in. We want a set of methods to be available to any instance of block so that they can draw and move themselves.

```
KidOnTheBlock.prototype.draw = function() {
  console.log('First time was a great time. Second time was a blast. Third time I fell in love, Now I hope it lasts')
}
```

```
KidOnTheBlock.prototype.move = function () {
  console.log('You know ive got some sweet moves')
};
```

So far, these two methods don't do a whole lot but both `donnie` and `jordan` can both access them. We'll start with the draw method.

KidOnTheBlock.prototype.draw = function(){
  context.fillRect(this.x, this.y, this.width, this.height);
}

This allows us to call `donnie.draw()`. Since `donnie` doesn't have an inherent `draw()` method, it looks up to its prototype, `KidOnTheBlock()` and fills in its own information. `KidOnTheBlock.prototype` hands the method to `donnie`, who whips out a moonwalk and calls itself using `this`.

*ProTip: If you add `return this` in your function, you can chain additional methods after you call `draw()`*

```
KidOnTheBlock.prototype.draw = function(){
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}
```

### YOUR TURN
Implement `KidOnTheBlock.prorotype.move()`. It should take the current y value, increment it by 1 so it moves vertically down the canvas, and return `this` so we can chain functions later on.

If you only write the `.move()` method nothing will happen because we aren't telling the browser to animate the frame. We need to wrap the functions in a gameLoop to see some action.

## All Together Now

Let's refactor what we've got to put together a complete animation file.
For clarification, what are we trying to accomplish?

- Create a new KidOnTheBlock constructor and methods draw() and move() on our KidOnTheBlock.prototype
- Create an empty array called newKids to hold all of our individual blocks, this way we can iterate over them and automate functionality.
- For each iteration, we want to tell them to draw themselves onto the canvas, and move themselves.

Once everything is said and done, our JS file should look like this:
```
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

function KidOnTheBlock(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

var jordan = new KidOnTheBlock(10, 50, 10, 10);
var donnie = new KidOnTheBlock(10, 100, 10, 10);

KidOnTheBlock.prototype.draw = function () {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

KidOnTheBlock.prototype.move = function () {
  this.y++;
  return this;
};

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(gameLoop);
});
```

Add the array that will contain our individual blocks.

```
var newKids = [];
```

Now lets adjust the animation frame to iterate through our array of newKids asking each of them to draw themselves onto the canvas and move down the screen.

```
requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  newKids.forEach(function (kid) {
    kid.draw().move();
  });
  requestAnimationFrame(gameLoop);
});
```

To verify we wired everything up correctly, grab `donnie` and `jordan` and push them onto the array.

```
newKids.push(donnie);
newKids.push(jordan);
```

Open up your `index.html` page at watch the blocks fall to their doom. Weirdly similar to their music careers.....ooohhhh buurrrnnnn.

Here's another copy of the complete .js file in case something went haywire.

```
var canvas = document.getElementById('game');
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
```

## Diving Further: Responding to Click Events
Right now everything happens all at once without much user control. Let's write some code that creates a new block when the user clicks on the canvas.

In English, we want to add an event listener to the canvas so that on a click event, a new block is pushed onto the newKids array.

```
canvas.addEventListener('click', function (event) {
  console.log('NEW KIDS LYRIC', getClickPosition(event));
});
```

The first argument specifies what kind of event we're listening for ('click'). The second anonymous function defines what we want to happen when the browser hears said click event.

What's up with the 'getClickPosition' thing? We added a little helper function in `helpers.js` that will return the x and y position of the mouse click.

Click around and see what is returned. Now lets plug in our blocks array.

```
canvas.addEventListener('click', function (event) {
  var click = getClickPosition(event);
  newKids.push(new kidOnTheBlock(click.x, click.y, 10, 10));
});
```

#### Your Turn

  - Get the blocks to move back up to the top of the canvas when they hit the bottom. (hint: use negative coordinates)
  - Stop the blocks from falling below the canvas edge
  - Can you make a block land on another block?
  - What about listening for other (events)[https://developer.mozilla.org/en-US/docs/Web/Events] like keyup, keydown, mouseover, mousemove, or dblclick?
