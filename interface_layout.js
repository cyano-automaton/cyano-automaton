w = window.innerWidth;
h = window.innerHeight;

if (w < 1280) {
  u = w / 32;
  graph_width = w - u * 4;
  graph_height = graph_width * 720 / 1280;
} else {
  u = w / 64;
  graph_width = w / 2 - u * 4;
  graph_height = graph_width * 720 / 1280;
}

let right_now;
let last24 = [];
let last7 = [];

function preload() {
  right_now = loadJSON("./data/right_now.json");
  last24_json = loadJSON("./data/last24.json");
  last7_json = loadJSON("./data/last7.json");
}

function setup() {

  if (w < 1280) {
    canvas = createCanvas(w, ((w - u * 4) * 720 / 1280) * 7.5);
  } else {
    canvas = createCanvas(w * 0.6, (((w * 0.6) - u * 4) * 720 / 1280) * 7.5);
  }

  canvas.parent("graphs");
  textFont("Helvetica");
  frameRate(3);

  for (let x in last24_json) {
    last24.push(last24_json[x]);
  }
  for (let x in last7_json) {
    last7.push(last7_json[x]);
  }
}

function draw() {

  if (windowWidth <= 426) {
    u = 15;
  }

  let graph_width = width - u * 4;
  let graph_height = graph_width * 720 / 1280;

  background(0);
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
  text("Temperature: " + round(right_now.temp, 3) + "°C", 3 * u, u * 7)
  text("Turbidity: " + round(right_now.ntu, 3), 3 * u, u * 9)
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
  noStroke();
  push();
  toogle("Heater", 1);
  toogle("Lamp", 4);
  toogle("Air pump", 7);
  pop();

  noFill();
  temp = right_now.temp;
  y = map(temp, 40, 25, u * 5, u * 10)
  rect(u * 15, u * 5, u, u * 5)
  line(u * 14, y, u * 17, y)


  translate(0, graph_height + u * 14);

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

function windowResized() {
  w = window.innerWidth;
  h = window.innerHeight;
  if (w < 1280) {
    canvas = createCanvas(w, ((w - u * 4) * 720 / 1280) * 7.5);
  } else {
    canvas = createCanvas(w * 0.6, (((w * 0.6) - u * 4) * 720 / 1280) * 7.5);
  }
}
