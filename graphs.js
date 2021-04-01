let right_now;
function preload() {
  let adres = "./data/right_now.json";
  earthquakes = loadJSON(adres);
  robotoMono = loadFont("./assets/RobotoMono-Regular.ttf");
}

function setup() {
  createCanvas(400, 400);
  textFont(robotoMono);
  noLoop();
}

function draw() {
  background(255);
  text("Right now:",0, 0)
}
