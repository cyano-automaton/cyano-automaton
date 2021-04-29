let font_size = 20;
let padding = 40;
let graph_height = 360

let right_now;
let last24 = [];
let last7 = [];



function preload() {
  right_now = loadJSON("./data/right_now.json");
  last24_json = loadJSON("./data/last24.json");
  last7_json = loadJSON("./data/last7.json");
}

function setup() {

  canvas = createCanvas(640, graph_height * 5);
  canvas.parent("graphs");
  textFont("Helvetica");
  noLoop();

  for (let x in last24_json) {
    last24.push(last24_json[x]);
  }
  for (let x in last7_json) {
    last7.push(last7_json[x]);
  }
}

function draw() {
  background(255, 0);
  textSize(font_size);
  strokeWeight(1);


  fill(0, 96, 64);
  rect(0, 0, width, font_size * 8, 10);

  fill(255, 128, 0);
  text("Right now:", font_size, font_size * 2)
  text("Temperature: " + right_now.temp + "°C", font_size, font_size * 5)
  text("Turbidity: " + right_now.ntu, font_size, font_size * 7)
  textAlign(RIGHT);
  text(right_now.hour + ":" + right_now.minute + " " + right_now.day + "." + right_now.month + "." + right_now.year, width - font_size, font_size * 2)


  translate(padding, font_size * 6);


  translate(0, graph_height);
  TitleWithTimeOrDate("Last 24 hours:", "time")

  stroke(255, 0, 255);
  draw24Graph("temp", 25, 35)

  fill(0, 255, 0);
  axisLeftLines(25, 35, 1);
  axisBottom24();

  translate(0, graph_height - padding * 2);

  stroke(0, 255, 255);
  draw24Graph("ntu", 0, 1024);

  fill(0, 255, 0);
  axisLeftLines(0, 1024, 128);
  axisBottom24();

  translate(0, graph_height);

  TitleWithTimeOrDate("Last 7 days:", "date")

  stroke(255, 0, 255);
  draw7Graph("temp", 25, 35);

  fill(0, 255, 0);
  axisLeft(25, 35, 1);
  axisBottom7();


  translate(0, graph_height - padding * 2);

  stroke(0, 255, 255);
  draw7Graph("ntu", 0, 1024);

  fill(0, 255, 0);
  axisLeft(0, 1024, 128);
  axisBottom7();
}

function TitleWithTimeOrDate(title, timeordate) {
  fill(255, 128, 0);
  noStroke();
  textAlign(LEFT);
  text(title, -font_size, -graph_height + padding * 3)
  textAlign(RIGHT);
  if (timeordate == "time") {
    text(last24[0].hour + ":" + last24[0].minute + "—" + last24[last24.length - 1].hour + ":" + last24[last24.length - 1].minute + " " + last24[0].day + "." + last24[0].month + "." + last24[0].year, width - padding * 1.5, -graph_height + padding * 3)
  }
  if (timeordate == "date") {
    text(last7[0].day + "." + last7[0].month + "—" + last7[last7.length - 1].day + "." + last7[last7.length - 1].month + "." + last7[last7.length - 1].year, width-padding*1.5, -graph_height+padding*3)
  }
}

function draw24Graph(param, min, max) {
  noFill();
  beginShape();
  for (i = 0; i < last24.length; i++) {
    vertex(((width - (padding * 2)) / last24.length) * i, -map(last24[i][param], min, max, 0, (graph_height - font_size * 7)));
  }
  endShape();
}

function draw7Graph(param, min, max) {
  noFill();
  beginShape();
  for (i = 0; i < last7.length; i++) {
    vertex(((width - (padding * 2)) / last7.length) * i, -map(last7[i][param], min, max, 0, (graph_height - font_size * 7)));
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
    text(min + (step * i), -15, -offset * i - 5);
    stroke(224, 192, 192);
    line(-10, -offset * i, 10, -offset * i)
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
    line(0, -offset * i, width - padding, -offset * i)
  }
  pop()
}

function axisBottom24() {
  push()
  translate(0, padding / 2)
  stroke(224, 192, 192);
  strokeWeight(1);
  line(0, 0, width - padding * 1.5, 0);
  noStroke();
  textSize(10);
  textAlign(LEFT)
  for (i = 0; i < 24; i++) {
    noStroke(0);
    push();
    rotate(PI / 2);
    text(last24[i].hour, padding / 4, -i * ((width - (padding)) / 24) - 5);
    pop();
    stroke(224, 192, 192);
    line(i * ((width - (padding)) / 24), 0, i * ((width - (padding)) / 24), 10)
  }
  pop()
}

function axisBottom7() {
  push()
  translate(0, padding / 2);
  stroke(224, 192, 192);
  strokeWeight(1);
  line(0, 0, width - padding * 1.5, 0);
  noStroke();
  textSize(10);
  textAlign(LEFT)

  for (i = 0; i < last7.length; i++) {
    noStroke(0);
    push();
    // rotate(PI / 2);
    text(last7[i].day + "." + last7[i].month, i * ((width - (padding * 1.5)) / 7) - 10, padding / 3);
    pop();
    stroke(224, 192, 192);
    line(i * ((width - (padding * 1.5)) / 7), 0, i * ((width - (padding * 1.5)) / 7), -(graph_height - (padding * 3)));
  }
  pop()
}
