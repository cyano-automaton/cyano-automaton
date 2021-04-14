let right_now;
var font_size = 20;

function preload() {
  let adres = "./data/right_now.json";
  right_now = loadJSON(adres);
}

function setup() {
  canvas = createCanvas(960, font_size*12);
  canvas.parent('right_now');
  textFont("Roboto Mono");
  noLoop();
}

function draw() {
  background(255, 0);
  textSize(font_size);
  text("Right now:",0, font_size)
  text("Temperature: "+right_now.temp+"°C",0, font_size*4)
  text("TDS: "+right_now.tds+" ppm",0, font_size*6)
  text("pH: "+right_now.ph,0, font_size*8)
  text("Turbidity: "+right_now.ntu+" ntu",0, font_size*10)
  textAlign(RIGHT);
  text(right_now.hour+":"+right_now.minute+" "+right_now.day+"."+right_now.month+"." +right_now.year,width, font_size)
}
