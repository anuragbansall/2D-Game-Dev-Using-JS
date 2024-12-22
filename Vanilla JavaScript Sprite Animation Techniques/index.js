// Initializing the default animation state to 'idle'.
let playerState = "idle";
// Selecting the dropdown menu element with the id 'animations'.
const dropDown = document.getElementById("animations")
dropDown.addEventListener('change', function(e){
    // Updating the playerState whenever the dropdown value changes.
    playerState = e.target.value
})

// Accessing the canvas element
const canvas = document.getElementById("canvas1"); 
// Getting the 2D rendering context for drawing on the canvas.
const ctx = canvas.getContext("2d");


// Setting the canvas width to 300 pixels and storing it in a constant.
const CANVAS_WIDTH = (canvas.width = 300); 
// Setting the canvas height to 300 pixels and storing it in a constant.
const CANVAS_HEIGHT = (canvas.height = 300);

// Creating an instance of an HTML <img> element.
const playerImage = new Image();
// Setting the source of the image to a sprite sheet.
playerImage.src = "./assets/shadow_dog.png";

// Width of a single sprite frame in the sprite sheet.
const spriteWidth = 575;
// Height of a single sprite frame in the sprite sheet.
const spriteHeight = 525;

// Counter to track the current frame for animation.
let gameFrame = 0;
// Controls the speed of animation by skipping frames (higher value = slower animation).
const staggerFrame = 5;

// Object to store the animation data for each animation state.
const spriteAnimations = [];
const animationStates = [
  { name: "idle", frames: 7 },
  { name: "jump", frames: 7 },
  { name: "fall", frames: 7 },
  { name: "run", frames: 9 },
  { name: "dizzy", frames: 11 },
  { name: "sit", frames: 5 },
  { name: "roll", frames: 7 },
  { name: "bite", frames: 7 },
  { name: "ko", frames: 12 },
  { name: "getHit", frames: 4 },
];

animationStates.forEach((state, index) => {
// Each animation state will have an array of frame positions.
  let frames = { loc: [] };
  for (let i = 0; i < state.frames; i++) {
    // Calculating the X position of each frame in the sprite sheet.
    let positionX = i * spriteWidth;
    // Calculating the Y position of each frame (different animations are stacked vertically).
    let positionY = index * spriteHeight;
    // Storing the X and Y positions of each frame for this animation state.
    frames.loc.push({ x: positionX, y: positionY });
  }

// Storing the animation data under the respective animation name.
  spriteAnimations[state.name] = frames;
});

function animate() {
// Clearing the canvas before each frame to prevent overlap.
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

// Scaling the sprite to fit the canvas width.
  const scaledWidth = CANVAS_WIDTH;
// Maintaining the aspect ratio while scaling to fit the canvas.
  const scaledHeight = (spriteHeight / spriteWidth) * CANVAS_WIDTH;

// Calculating the current frame position based on gameFrame, staggerFrame, and the number of frames in the current animation.
  let position = Math.floor(gameFrame / staggerFrame) % spriteAnimations[playerState].loc.length;
// X coordinate of the current frame in the sprite sheet.
  let frameX = spriteWidth * position;
// Y coordinate of the current frame based on the animation state.
  let frameY = spriteAnimations[playerState].loc[position].y;

  // Drawing the current frame from the sprite sheet onto the canvas:
  //  - frameX and frameY specify the source position.
  //  - spriteWidth and spriteHeight specify the size of the frame in the source.
  //  - 0, 0 specifies the position on the canvas to draw the image.
  //  - scaledWidth and scaledHeight define the size on the canvas.
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    scaledWidth,
    scaledHeight
  );

// Incrementing the frame counter.
  gameFrame++;
// Recursively calling the animate function for the next frame.
  requestAnimationFrame(animate);
}

// Starting the animation loop.
animate();