w = window.innerWidth;
h = window.innerHeight;
screen_portion = 0.6;
panoramic_ratio = 0.5625;
graph_rows = 9.5;

if (w < 1280) {
  canvas_width = w;
  u = canvas_width / 32;
  graph_width = canvas_width - u * 4;
  graph_height = graph_width * panoramic_ratio;
} else {
  canvas_width = w * screen_portion;
  u = canvas_width / 48;
  graph_width = canvas_width/2;
  graph_height = graph_width * panoramic_ratio;
}

let right_now;
let last24 = [];
let last7 = [];

function preload() {
/*
  right_now = loadJSON("./data/right_now.json");
  last24_json = loadJSON("./data/last24.json");
  last7_json = loadJSON("./data/last7.json");
  year_today = loadJSON("./yearForToday.json");
  spendings = loadTable("./assets/spendings.csv");
  prices = loadTable("./assets/prices.csv");
  production = loadTable("./assets/production.csv")
  spirulina_produced = loadJSON("./spirulinaProduced.json")
  */

  right_now = loadJSON("https://raw.githubusercontent.com/cyano-automaton/cyano-automaton.github.io/master/data/right_now.json");
  last24_json = loadJSON("https://raw.githubusercontent.com/cyano-automaton/cyano-automaton.github.io/master/data/last24.json");
  last7_json = loadJSON("https://raw.githubusercontent.com/cyano-automaton/cyano-automaton.github.io/14860ff0e9718665d8582c1338b3b3c94cb308bc/data/last7.json");
  year_today = loadJSON("https://raw.githubusercontent.com/cyano-automaton/cyano-automaton.github.io/master/yearForToday.json");
  spendings = loadTable("https://raw.githubusercontent.com/cyano-automaton/cyano-automaton.github.io/master/assets/spendings.csv");
  prices = loadTable("https://raw.githubusercontent.com/cyano-automaton/cyano-automaton.github.io/master/assets/prices.csv");
  production = loadTable("https://raw.githubusercontent.com/cyano-automaton/cyano-automaton.github.io/master/assets/production.csv");
  spirulina_produced = loadJSON("https://raw.githubusercontent.com/cyano-automaton/cyano-automaton.github.io/master/spirulinaProduced.json");

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

if (last24[0].minute < 10 ) {
  minutka = "0" + last24[0].minute;
} else {
  minutka = last24[0].minute;
}

if (last24[last24.length - 1].minute < 10) {
  minutka_ostatnia = "0" + last24[last24.length - 1].minute;
} else {
    minutka_ostatnia = last24[last24.length - 1].minute;
}


  time24 = [last24[0].hour + ":" + minutka + "—" last24[last24.length - 1].hour + ":" + minutka_ostatnia;
  date24 = last24[0].day + "." + last24[0].month + "." + last24[0].year
  date7 = [last7[0].day + "." + last7[0].month, last7[last7.length - 1].day + "." + last7[last7.length - 1].month + "." + last7[last7.length - 1].year]

  greenScreen = new ScreenRightNow();

  diodeHeater = new DiodeWithTitle("Heater");
  diodeLamp = new DiodeWithTitle("Lamp");
  diodePump = new DiodeWithTitle("Air pump");
  tempIndicator = new TempIndicator();
  ntuIndicator = new NTUIndicator();

  timeline = new Timeline();
  gold = new GoldBars();

  last24Box = new GraphBox("Last 24 hours");
  last7Box = new GraphBox("Last 7 days");

}

function draw() {
  background(0);
  textSize(u);
  if (windowWidth < 1280) {
    greenScreen.display(0, 0, canvas_width, u * 9);

    diodeHeater.display(canvas_width / 2 - 7 * u, u * 15);
    tempIndicator.display(canvas_width / 2 - 7.5 * u, u * 18, u, 6 * u)

    diodeLamp.display(canvas_width / 2 + 4 * u, u * 15);
    diodePump.display(canvas_width / 2 + 8 * u, u * 15);
    ntuIndicator.display(canvas_width / 2 + 6 * u, u * 21, 6 * u)

    timeline.display(2 * u, graph_height * 2, graph_width + 2 * u)
    gold.display(2 * u, graph_height * 2 + 6 * u, graph_width, graph_height);

    last24Box.display(0, graph_height * 5, graph_width, graph_height);

    last7Box.display(0, graph_height * 8, graph_width, graph_height);
  }

  if (windowWidth >= 1280) {
    timeline.display(2 * u, 2*u, canvas_width - 2 * u)
    gold.display(2 * u, 8 * u, canvas_width - 4 * u);
    greenScreen.display(0, graph_height*2, graph_width, u * 9);

    diodeHeater.display(graph_width+4*u, graph_height*2+2*u);
    tempIndicator.display(graph_width+3.5*u, graph_height*2+5*u,u, 6 * u)

    diodeLamp.display(graph_width+12*u, graph_height*2+2*u);
    diodePump.display(graph_width+16*u, graph_height*2+2*u);
    ntuIndicator.display(graph_width+14*u, graph_height*2+8*u, 6 * u)

    last24Box.display(0, graph_height * 4.5, graph_width-4*u, graph_height);

    last7Box.display(graph_width, graph_height * 4.5, graph_width-4*u, graph_height);
  }

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
    canvas_width = w * screen_portion;
    u = canvas_width / 48;
    graph_width = canvas_width /2;
    graph_height = graph_width * panoramic_ratio;
    resizeCanvas(canvas_width, graph_height * graph_rows);
  }
}
