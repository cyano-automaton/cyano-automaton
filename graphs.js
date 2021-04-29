let right_now;
let last24;
let font_size = 20;
let padding = 40;
let graph_height = 270

function preload() {
  right_now = loadJSON("./data/right_now.json");
  last24 = loadJSON("./data/last24.json");
  last7 = loadJSON("./data/last7.json");
}

function setup() {
  canvas = createCanvas(640, graph_height * 5);
  canvas.parent("graphs")
  textFont("Helvetica");
  noLoop();
}

function draw() {
  background(255, 0);
  fill(0, 62, 32);
  rect(0, 0, 640, font_size * 8, 10);
  textSize(font_size);
  fill(224, 192, 192);
  text("Right now:", font_size, font_size * 2)
  text("Temperature: " + right_now.temp + "°C", font_size, font_size * 5)
  text("Turbidity: " + right_now.ntu, font_size, font_size * 7)

  text("Last 24 hours:", 0, font_size * 14 + padding)
  text("Last 7 days:", 0, font_size * 42 + padding)

  textAlign(RIGHT);

  text(right_now.hour + ":" + right_now.minute + " " + right_now.day + "." + right_now.month + "." + right_now.year, width - font_size, font_size * 2)

  text(last24[0].hour+":"+last24[0].minute+"0"+"—"+last24[last24.length-1].hour+":"+"59"+" "+last24[0].day+"."+last24[0].month+"." +last24[0].year, width, font_size*14+ padding)

  text(last7[0].day+"."+last7[0].month+"." +last7[0].year, width, font_size*42 + padding)

    strokeWeight(3);
    translate(0, font_size*12)
    textAlign(RIGHT);

    translate(padding, graph_height-padding);

    stroke(255,0,255);
    drawHourGraph("temp", 25, 35)

    stroke(0,255,255);
    drawHourGraph("ntu", 1000, 3000);

    fill(0, 255, 0);
    axisLeftLines(25, 35, 1);
    axisBottomHour();

    translate(0, graph_height+padding/2);

    stroke(255,0,255);
    drawDayGraph ("temp", 25, 35);

    stroke(0,255,255);
    drawDayGraph ("ntu", 1000, 3000);

    fill(0, 255, 0);
    axisLeft(25, 35, 1);
    axisBottomDay();
}



function drawDayGraph(param, min, max) {
  noFill();
  beginShape();
  for (i = 0; i < last24.length; i++) {
    vertex(((width - (padding * 2)) / last24.length) * i, -map(last24[i][param], min, max, 0, (graph_height - font_size * 7)));
  }
  endShape();
}

function drawWeekGraph(param, min, max) {
  noFill();
  beginShape();
  for (i = 0; i < last7.length; i++) {
    vertex(((width - (padding*2)) / last7.length) * i, -map(last7[i][param], min, max, 0, (graph_height - font_size * 7)));
  }
  endShape();
}

function axisLeft(min, max, step) {
  push()
  translate(-padding / 2, 0);
  stroke(224, 192, 192);
  strokeWeight(1);
  line(0, 0, 0, -(graph_height - (padding * 4)));
  noStroke();
  textSize(10);
  textAlign(LEFT)
  podzialka = (max - min) / step
  offset = (graph_height - (padding * 4) - 0) / podzialka
  for (i = 0; i <= podzialka; i++) {
    noStroke(0);
    text(min + (step * i), 5, -offset * i - 5);
    stroke(224, 192, 192);
    line(0, -offset * i, 10, -offset * i)
  }
  pop()
}

function axisLeftLines(min, max, step) {
  push()
  translate(-padding / 2, 0);
  stroke(224, 192, 192);
  strokeWeight(1);
  line(0, 0, 0, -(graph_height - (padding * 4)));
  noStroke();
  textSize(10);
  textAlign(LEFT)
  podzialka = (max - min) / step
  offset = (graph_height - (padding * 4) - 0) / podzialka
  for (i = 0; i <= podzialka; i++) {
    noStroke(0);
    text(min + (step * i), 5, -offset * i - 5);
    stroke(224, 192, 192);
    line(0, -offset * i, graph_width, -offset * i)
  }
  pop()
}

function axisBottomDay() {
  push()
  translate(0, padding / 2)
  stroke(224, 192, 192);
  strokeWeight(1);
  line(0, 0, (graph_width - (padding * 2)), 0);
  noStroke();
  textSize(10);
  textAlign(LEFT)
  for (i = 0; i < 24; i++) {
    noStroke(0);
    push();
    rotate(PI / 2);
    text(last_day[i][0].hour, padding / 4, -i * ((graph_width - (padding)) / 24) - 5);
    pop();
    stroke(224, 192, 192);
    line(i * ((graph_width - (padding)) / 24), 0, i * ((graph_width - (padding)) / 24), 10)
  }
  pop()
}

function axisBottomWeek() {
  push()
  translate(0, padding / 2);
  stroke(224, 192, 192);
  strokeWeight(1);
  line(0, 0, (graph_width - (padding * 2)), 0);
  noStroke();
  textSize(10);
  textAlign(LEFT)
  for (i = 0; i < last7.length; i+48) {
    noStroke(0);
    push();
    rotate(PI / 2);
    text(last7[i].day + "." + last7[i].month, padding / 4, -i * ((graph_width - (padding)) / 7) - 5);
    pop();
    stroke(224, 192, 192);
    line(i * ((graph_width - (padding)) / 7), 0, i * ((graph_width - (padding)) / 7), graph_height)
  }
  pop()
}
