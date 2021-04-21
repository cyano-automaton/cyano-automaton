let right_now;
let last_hour;
let font_size = 20;
let padding = 40;
let graph_height = 540;
let graph_width = 960;

function preload() {
  right_now = loadJSON("./data/right_now.json");
  last_hour = loadJSON("./hours/lastHour.json");
  last_day = loadJSON("./days/lastDay.json");
}

function setup() {
  canvas = createCanvas(960, 270*5);
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

  text("Last hour:",0, font_size*14+padding)
  text("Last day:",0, font_size*42+padding)

  textAlign(RIGHT);

  text(right_now.hour+":"+right_now.minute+" "+right_now.day+"."+right_now.month+"." +right_now.year,width, font_size)

  text(last_hour[0].hour+":"+last_hour[0].minute+"0"+"—"+last_hour[0].hour+":"+"59"+" "+last_hour[0].day+"."+last_hour[0].month+"." +last_hour[0].year,graph_width, font_size*14+ padding)

  text(last_hour[0].day+"."+last_hour[0].month+"." +last_hour[0].year,graph_width, font_size*42 + padding)

  strokeWeight(3);
  translate(0, font_size*12)
  textAlign(RIGHT);

  translate(padding, graph_height-padding);

  stroke(255,0,0);
  drawHourGraph("temp", 25, 35)

  stroke(255,255,0);
  drawHourGraph("tds", 1000, 1200)

  stroke(0,0,255);
  drawHourGraph("ph", 2, 7)

  stroke(0,0,0);
  drawHourGraph("ntu", 2999, 3008);
  fill(0);
  axisLeft(25, 35, 1);
  axisBottomHour();

  translate(0, graph_height+padding/2);

  stroke(255,0,0);
  drawDayGraph ("temp_avg", 25, 35);

  stroke(0,0,0);
  drawDayGraph ("ntu_avg", 2999, 3008);

  fill(0);
  axisLeft(25, 35, 1);
  axisBottomDay();
}

function drawHourGraph (param, min, max) {
  noFill();
  beginShape();
  for (i=0; i<12; i++) {
    for (j=0; j<5; j++) {
      vertex(((graph_width-(padding*5))/60)*(i*6+j), -map(last_hour[i][param][j], min, max, 0, (graph_height-font_size*7)));
    }
  }
  endShape();
}

function drawDayGraph (param, min, max) {
  noFill();
  beginShape();
  for (i=0; i<24; i++) {
    for (j=0; j<12; j++) {
      vertex(((graph_width-(padding*5))/288)*(i*14+j), -map(last_day[i][j][param], min, max, 0, (graph_height-font_size*7)));
    }
  }
  endShape();
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

function axisBottomHour() {
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

function axisBottomDay() {
  push()
    translate(0, padding/2)
  stroke(0,0,0)
  strokeWeight(1);
  line(0, 0, (graph_width-(padding*2)), 0);
  noStroke();
  textSize(10);
  textAlign(LEFT)
  for (i = 0; i < 24; i++) {
    noStroke(0);
    push();
    rotate(PI/2);
    text (last_day[i][0].hour, padding/4,  -i*((graph_width-(padding))/24) -5);
    pop();
    stroke(0);
    line(i*((graph_width-(padding))/24), 0, i*((graph_width-(padding))/24), 10)
  }
  pop()
}
