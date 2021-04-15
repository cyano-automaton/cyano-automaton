let right_now;
let last_hour;
let font_size = 20;
let padding = 40;
let graph_height = 540;
let graph_width = 960;

function preload() {
  right_now = loadJSON("./data/right_now.json");
  last_hour = loadJSON("./hours/lastHour.json");

}

function setup() {
  canvas = createCanvas(960, 540*2);
  canvas.parent("graphs")
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

  strokeWeight(3);
  translate(0, font_size*12)
  textAlign(LEFT);
  text("Last hour:",0, font_size+padding)
  textAlign(RIGHT);
  text(last_hour[0].hour+":"+last_hour[0].minute+"0"+"—"+last_hour[0].hour+":"+"59"+" "+last_hour[0].day+"."+last_hour[0].month+"." +last_hour[0].year,graph_width, font_size+ padding)
  translate(padding, graph_height-padding);

  stroke(255,0,0);
  noFill();
  beginShape();
  for (i=0; i<12; i++) {
    for (j=0; j<5; j++) {
      vertex(((graph_width-(padding*5))/60)*(i*6+j), -map(last_hour[i].temp[j], 27, 30, 0, (graph_height-font_size*7)));
    }
  }
  endShape();
  fill(0);
  axisLeft(27, 30, 0.5);
  axisBottom();

}


function axisLeft(min, max, step) {
  push()
  translate(-padding/2, 0)
  stroke(0,0,0)
  strokeWeight(1);
  line(0, 0, 0, -(graph_height-(padding*4)));
  noStroke();
  textSize(10);
  textAlign(LEFT)
  podzialka = (max-min)/step
  offset = (graph_height-(padding*4)-0)/podzialka
  for (i = 0; i <= podzialka; i++) {
    noStroke(0);
    text (min+(step*i), 5, -offset*i-5);
    stroke(0);
    line(0, -offset*i, 10, -offset*i)
  }
  pop()
}

function axisBottom() {
  push()
    translate(0, padding/2)
  stroke(0,0,0)
  strokeWeight(1);
  line(0, 0, (graph_width-(padding*2)), 0);
  noStroke();
  textSize(10);
  textAlign(LEFT)
  for (i = 0; i < 12; i++) {
    noStroke(0);
    push();
    rotate(PI/2);
    text (last_hour[0].hour+":"+last_hour[i].minute, padding/4,  -i*((graph_width-(padding))/12)-5);
    pop();
    stroke(0);
    line(i*((graph_width-(padding))/12), 0, i*((graph_width-(padding))/12), 10)
  }
  pop()
}
