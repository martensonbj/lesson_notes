/*

HTML5Canvas and Object Oriented JavaScript
AKA Microsoft Paint for Cool Kids

(HTML5 Canvas)[https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API] is an API that is included in modern browsers and lets us draw graphics and animations using JavaScript.

 +++ DRAW HTML PAGE AND JAVASCRIPT PAGE ON WHITEBOARD TO INDICATE COMMUNICATION

*/

// index.html
<body>
  <canvas> </canvas>
</body>

/*
HTML hands us the convenient `<canvas>` tag that we can plop into our HTML page that tells our JS where we can paint. It takes two inline attributes to specify it's height and width, and defaults to transparent background until told to be otherwise. (If nothing is specified it defaults to 300px by 150px.).

Note that although it can be sized using CSS, this is one of the rare occasions inline styling is helpful to avoid any unexpected changes down the road. During rendering, the image drawn by JS is scaled to fit the layout of the page and will respect the ratio of canvas.

*/

// Canvas is still relatively new. To accomodate for accessiblilty and deprecated browsers (although if you're currently working with IE you should probably rethink your life decisions) its important to include fallback content. Without fallback content users will see a blank screen with no additional information, which is no fun.
<body>
  <canvas id="main-canvas" height="300" width="250"> <p>Placeholder for broken canvas element</p> </canvas>
</body>

// Speaking of blank screens, It's easier to understand what we're working with if it isn't transparent. Lets throw some colors on the page for clarity.

// main.css
html {
  background-color: teal;
}

canvas {
  background-color: white;
}

// And because we're working with an HTML element, and because everyone loves a little CSS, lets throw in some style points.

//main.css
canvas {
  margin-top: 5%;
  margin-left: 40%;
  box-shadow: 1px 1px 50px white;
  border-radius: 10px;
}

// Now's the time to put some stuff onto our Canvas. Lets get our JS file set up with some variables. Target the element on the DOM using JavaScript. Then tell the canvas what type of image rendering we're working with. Currently, canvas supports two ways of rendering content, 2d and WebGL (which is a 3D context based on OPENGL, (check out the docs)[https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API]. Let's focus on 2d. The variable `context` in this situation is convention. It is also common to see `c` or `ctx` but you can call it whatever you want.
var canvas = document.getElementById('main-canvas');
var context = canvas.getContext('2d');

// Now its time to start painting. Lets start with a rectangle.

// Contrary to how we were told grids work in high school math class, the canvas grid system uses a pixelation scheme that coincides with your browser window. Just like when adjusting margins or positioning of HTML elements, coordinates refer to how far a pixel is from the top left corner of the element.

// Step one is to tell the canvas how we want our shape to appear. I want to fill my rectangle with a color, so I'll specify that first, and then tell the canvas where to put it and how big to make it. Or we can outline a square. Or make it transparent. Etc.

// Red Square
// context.fillRect(x, y, width, height)
context.fillStyle="red";
context.fillRect(10, 10, 50, 50);

// Outlined Square
context.strokeRect(20, 20, 50, 50);

// Green Square
context.fillStyle="rgba(0, 100, 100, 0.5)";
context.fillRect(40, 40, 50, 50);

//  Similarly, we can draw lines. This is a bit more complicated. Imagine the computer is an idiot robot being. You need to tell it you want to begin drawing a line, what starting point to move the pencil to, where to end the line, and to let go.

// Straight Line
context.beginPath();
context.moveTo(100, 20);
context.lineTo(200, 20);
context.stroke();
context.closePath();

// All shapes are just a series of lines filled in with color. Lets use the path commands to draw a triangle.

// Filled Triangle
context.beginPath();
context.moveTo(200, 40);
context.lineTo(300, 40);
context.lineTo(150, 75);
context.fillStyle="rgb(255, 167, 0)"
context.fill();

// Note: fill() automatically closes the path and fills in the space, so closePath() is not required. Stroke simple draws a line so to avoid extra paths closePath() is necessary. Where closePath is placed effects what your shape looks like. Check out the straight line we drew with some adjustments:

context.beginPath();
context.moveTo(100, 20);
context.lineTo(200, 20);
context.lineTo(100, 50);
context.stroke();
context.closePath();

// Circle
context.beginPath();
var x = 150;
var y = 110;
var radius = 20;
var startAngle = 0;
var endAngle = Math.PI*2;
context.arc(x, y, radius, startAngle, endAngle);
context.fillStyle="rgb(0, 204, 153)"
context.fill();



// Delays action for a determined timeframe
// setTimeout(function(){ console.log ("FIRE") }, 5000);

// Fires once
// requestAnimationFrame(function(){
  // console.log("browser is ready to go")
// })

// Make a rectangle animate across the screen
// YOUR TURN - add another box that starts on the right side of the screen and move left. EXTENSTION: Add a condition that makes it stop at when it reaches the edge of the canvas.
var x = 50;
requestAnimationFrame(function gameLoop() {
  console.log("go");
  if (x < canvas.width - 10) {
    context.clearRect(0,0,canvas.width, canvas.height);
    context.fillRect(x++, 50, 10, 10);
    requestAnimationFrame(gameLoop);
  }
})
