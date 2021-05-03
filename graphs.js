let u = 20;
let graph_height = 293;
let graph_width = 520;

let right_now;
let last24 = [];
let last7 = [];

blink = 0;

function preload() {
  right_now = loadJSON("./data/right_now.json");
  last24_json = loadJSON("./data/last24.json");
  last7_json = loadJSON("./data/last7.json");
}

function setup() {
  canvas = createCanvas(600, graph_height * 7);
  canvas.parent("graphs")
  textFont("Helvetica");
  //noLoop();
  frameRate(2);

  for (let x in last24_json) {
    last24.push(last24_json[x]);
  }
  for (let x in last7_json) {
    last7.push(last7_json[x]);
  }
}

function draw() {
  background(255, 0);
  textSize(u);

  current_time = right_now.hour + ":" + right_now.minute;
  current_date = right_now.day + "." + right_now.month + "." + right_now.year
  time24 = [last24[0].hour + ":" + last24[0].minute, last24[last24.length - 1].hour + ":" + last24[last24.length - 1].minute]
  date24 = last24[0].day + "." + last24[0].month + "." + last24[0].year
  date7 = [last7[0].day + "." + last7[0].month, last7[last7.length - 1].day + "." + last7[last7.length - 1].month + "." + last7[last7.length - 1].year]

  fill(0, 96, 64);
  noStroke();
  rect(2 * u, 2 * u, graph_width, u * 8, 10);
  textAlign(LEFT);
  fill(255, 128, 0);
  text("Right now:", 3 * u, 4 * u)
  text("Temperature: " + right_now.temp + "°C", 3 * u, u * 7)
  text("Turbidity: " + right_now.ntu, 3 * u, u * 9)
  textAlign(RIGHT);
  text(current_time + " " + current_date, graph_width + u, 4 * u)

  strokeWeight(1);
  stroke(255, 128, 0);
  line(0, 3 * u, 1.5 * u, 3 * u);
  line(0, 9 * u, 1.5 * u, 9 * u);
  line(width, 3 * u, width - 1.5 * u, 3 * u);
  line(width, 9 * u, width - 1.5 * u, 9 * u);
  line(3 * u, 0, 3 * u, 1.5 * u);
  line(width - 3 * u, 0, width - 3 * u, 1.5 * u);
  line(3 * u, 12 * u, 3 * u, 10.5 * u);
  line(width - 3 * u, 12 * u, width - 3 * u, 10.5 * u);

  translate(0, u * 11);

  toogle("Heater", "temp", 1);
  toogle("Lamp", "time", 2);
  toogle("Air pump", "time", 3);



  translate(0, graph_height + u * 18);

  stroke(255, 128, 0);
  line(0, -graph_height - u * 3, u * 10, -graph_height - u * 3);


  TitleWithTimeOrDate("Last 24 hours:", "time")

  stroke(255, 0, 255);
  draw24Graph("temp", 25, 35)

  axisLeft24(25, 35, 1, "Temperature");
  axisBottom24();


  translate(0, graph_height + u * 4);

  stroke(0, 255, 255);
  draw24Graph("ntu", 0, 1024);

  axisLeft24(0, 1024, 128, "Turbidity");
  axisBottom24();


  translate(0, graph_height + u * 6);

  stroke(255, 128, 0);
  line(0, -graph_height - u * 3, u * 10, -graph_height - u * 3);

  TitleWithTimeOrDate("Last 7 days:", "date")

  stroke(255, 0, 255);
  draw7Graph("temp", 25, 35);

  axisLeft7(25, 35, 1, "Temperature");
  axisBottom7();


  translate(0, graph_height + u * 4);

  stroke(0, 255, 255);
  draw7Graph("ntu", 0, 1024);

  axisLeft7(0, 1024, 128, "Turbidity");
  axisBottom7();
}

function TitleWithTimeOrDate(title, timeordate) {
  fill(255, 128, 0);
  noStroke();
  textAlign(LEFT);
  text(title, 2 * u, -graph_height - u)
  textAlign(RIGHT);
  if (timeordate == "time") {
    text(time24[0] + "—" + time24[1] + " " + date24, graph_width + 2 * u, -graph_height - u)
  }
  if (timeordate == "date") {
    text(date7[0] + "—" + date7[1], graph_width + 2 * u, -graph_height - u)
  }
}

function draw24Graph(param, min, max) {
  push();
  translate(2 * u, 0);
  noFill();
  beginShape();
  for (i = 0; i < last24.length; i++) {
    vertex((graph_width / last24.length) * i, -map(last24[i][param], min, max, 0, graph_height));
  }
  endShape();
  pop();
}

function draw7Graph(param, min, max) {
  push();
  translate(2 * u, 0);
  noFill();
  beginShape();
  for (i = 0; i < last7.length; i++) {
    vertex((graph_width / last7.length) * i, -map(last7[i][param], min, max, 0, graph_height));
  }
  endShape();
  pop();
}

function axisLeft7(min, max, step, title) {
  push()
  translate(2 * u, 0);

  push();
  noStroke();
  textAlign(RIGHT);
  rotate(-PI / 2);
  text(title, graph_height, -u / 2);
  pop();

  fill(224, 192, 192);
  stroke(224, 192, 192);
  strokeWeight(1);
  line(0, 0, 0, -graph_height);
  noStroke();
  textSize(u / 2);
  textAlign(LEFT)
  podzialka = (max - min) / step
  offset = graph_height / podzialka
  for (i = 0; i <= podzialka; i++) {
    noStroke(0);
    text(min + (step * i), 5, -offset * i - 5);
    stroke(224, 192, 192);
    line(0, -offset * i, u / 2, -offset * i)
  }
  pop()
}

function axisLeft24(min, max, step, title) {
  push()
  translate(2 * u, 0);

  push();
  noStroke();
  textAlign(RIGHT);
  rotate(-PI / 2);
  text(title, graph_height, -u / 2);
  pop();

  fill(224, 192, 192);
  stroke(224, 192, 192);
  strokeWeight(1);
  line(0, 0, 0, -graph_height);
  noStroke();


  textSize(u / 2);
  textAlign(LEFT)
  podzialka = (max - min) / step
  offset = graph_height / podzialka
  for (i = 0; i <= podzialka; i++) {
    noStroke(0);
    text(min + (step * i), 5, -offset * i - 5);
    stroke(224, 192, 192);
    line(0, -offset * i, graph_width, -offset * i)
  }
  pop()
}

function axisBottom24() {
  push()
  translate(2 * u, 0);
  fill(224, 192, 192);
  stroke(224, 192, 192);
  strokeWeight(1);
  line(0, 0, graph_width, 0);
  noStroke();
  textSize(u / 2);
  textAlign(LEFT)
  for (i = 0; i < last24.length; i = i + 12) {
    noStroke(0);
    push();
    rotate(PI / 2);
    text(last24[i].hour, u, -i * (graph_width / last24.length));
    pop();
    stroke(224, 192, 192);
    line(i * (graph_width / last24.length), 0, i * (graph_width / last24.length), 10)
  }
  pop()
}

function axisBottom7() {
  push()
  translate(2 * u, 0);
  fill(224, 192, 192);
  stroke(224, 192, 192);
  strokeWeight(1);
  line(0, 0, graph_width, 0);
  noStroke();
  textSize(u / 2);
  textAlign(LEFT)

  for (i = 0; i < last7.length; i = i + 24) {
    noStroke(0);
    push();
    // rotate(PI / 2);
    text(last7[i].day + "." + last7[i].month, i * (graph_width / last7.length) - 10, 2 * u / 3);
    pop();
    stroke(224, 192, 192);
    line(i * (graph_width / last7.length), 0, i * (graph_width / last7.length), -graph_height);
  }
  pop()
}

function toogle(title, param, order) {
  push();
  translate(u * 2, u * 10 * order/3);
  noStroke();
  textAlign(RIGHT);
  text(title, 4*u, u / 2);

  if (param == "temp") {
    noFill();
    if (last24[last24.length - 1].temp - last24[last24.length - 2][param] > 0) {
      noFill();
      if (blink == 1) {
        fill(255, 128, 0);
        blink = 0;
      } else {
        fill(0);
        blink = 1;
      }
      stroke(224, 192, 192)
      circle(u * 5, 0, u)
    }
    if (last24[last24.length - 1].temp - last24[last24.length - 2][param] < 0) {
      noFill();
      stroke(224, 192, 192)
      circle(u * 5, 0, u)
    }
  }

  if (param == "time") {
    if (hour() > 22 || hour() > 6) {
      if (blink == 1) {
        fill(255, 128, 0);
        blink = 0;
      } else {
        fill(0);
        blink = 1;
      }
      stroke(224, 192, 192)
      circle(u * 5, 0, u)
    } else {
      noFill();
      stroke(224, 192, 192)
      circle(u * 5, 0, u)
    }
  }
  pop();
}
