w = window.innerWidth;
h = window.innerHeight;
screen_portion = 0.6;
panoramic_ratio = 0.5625;
graph_rows = 7;

if (w < 1280) {
  canvas_width = w;
  u = canvas_width / 32;
  graph_width = canvas_width - u * 4;
  graph_height = graph_width * panoramic_ratio;
} else {
  canvas_width = w*screen_portion;
  u = canvas_width / 48;
  graph_width = canvas_width - u * 4;
  graph_height = graph_width * panoramic_ratio;
}

let right_now;
let last24 = [];
let last7 = [];

var greenScreen;

function preload() {
  //right_now = loadJSON("./data/right_now.json");
  //last24_json = loadJSON("./data/last24.json");
  //last7_json = loadJSON("./data/last7.json");
  right_now = loadJSON("https://raw.githubusercontent.com/cyano-automaton/cyano-automaton.github.io/master/data/right_now.json");
  last24_json = loadJSON("https://raw.githubusercontent.com/cyano-automaton/cyano-automaton.github.io/master/data/last7.json");
  last7_json = loadJSON("https://raw.githubusercontent.com/cyano-automaton/cyano-automaton.github.io/14860ff0e9718665d8582c1338b3b3c94cb308bc/data/last7.json");
}

function setup() {
  if (w < 1280) {
    canvas = createCanvas(canvas_width, graph_height * graph_rows);
  } else {
    canvas = createCanvas(canvas_width, graph_height * graph_rows);
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

  time_now = right_now.hour + ":" + right_now.minute;
  date_now = right_now.day + "." + right_now.month + "." + right_now.year
  temp_now =right_now.temp;
  ntu_now =right_now.ntu;
  time24 = [last24[0].hour + ":" + last24[0].minute, last24[last24.length - 1].hour + ":" + last24[last24.length - 1].minute]
  date24 = last24[0].day + "." + last24[0].month + "." + last24[0].year
  date7 = [last7[0].day + "." + last7[0].month, last7[last7.length - 1].day + "." + last7[last7.length - 1].month + "." + last7[last7.length - 1].year]

  greenScreen = new ScreenRightNow (time_now, date_now, temp_now, ntu_now);
}

function draw() {
  console.log(greenScreen.time_now)
  background(0);
  textSize(u);

  greenScreen.display(0, 0, graph_width, graph_height);

  translate(0, u * 11);
  noStroke();
  push();
  toogle("Heater", 1);
  toogle("Lamp", 4);
  toogle("Air pump", 7);
  pop();

  noFill();
  y = map(temp_now, 40, 25, u * 5, u * 10)
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
    canvas_width = w;
    u = canvas_width / 32;
    graph_width = canvas_width - u * 4;
    graph_height = graph_width * panoramic_ratio;
    resizeCanvas(canvas_width, graph_height * graph_rows);
  } else {
    canvas_width = w*screen_portion;
    u = canvas_width / 48;
    graph_width = canvas_width - u * 4;
    graph_height = graph_width * panoramic_ratio;
    resizeCanvas(canvas_width, graph_height * graph_rows);
  }
}
