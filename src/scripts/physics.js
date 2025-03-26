// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events;

// Create the engine and world
const engine = Engine.create();
const world = engine.world;

// Create a renderer (optional)
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: WIDTH,
    height: HEIGHT,
    wireframes: false
  }
});

// Create boundaries (bounding box)
const boundaryThickness = 30; // thickness of the walls

// Create walls (top, bottom, left, right)
const wallOptions = { isStatic: true }; // walls are static (non-moving)

const topWall = Matter.Bodies.rectangle(400, 0, 800, boundaryThickness, wallOptions);
const bottomWall = Matter.Bodies.rectangle(400, 600, 800, boundaryThickness, wallOptions);
const leftWall = Matter.Bodies.rectangle(0, 300, boundaryThickness, 600, wallOptions);
const rightWall = Matter.Bodies.rectangle(800, 300, boundaryThickness, 600, wallOptions);

// Add walls to the world
Composite.add(world, [topWall, bottomWall, leftWall, rightWall]);

// Render the scene
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// Render Hook to Draw Custom Text
Events.on(render, "afterRender", function () {
    const ctx = render.context; // Get the canvas context
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    tokens.forEach((circle)=>{
        ctx.fillText(circle.customLabel, circle.position.x, circle.position.y);
    });
});