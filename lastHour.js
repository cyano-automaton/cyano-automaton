let last_hour;
let font_size = 20;
let padding = 40;
function preload() {
  let adres = "./hours/lastHour.json";
  last_hour = loadJSON(adres);
}

function setup() {
  createCanvas(960, 540);
  textFont("Roboto Mono");
  noLoop();
}

function draw() {
  background(255, 0);
  strokeWeight(3);
  textSize(font_size);
  text("Last hour:",padding, font_size+padding)
  textAlign(RIGHT);
  text(last_hour[0].hour+":"+last_hour[0].minute+"0"+" "+last_hour[0].day+"."+last_hour[0].month+"." +last_hour[0].year,width-padding, font_size+ padding)
  translate(padding, height-padding);

  stroke(255,0,0)
  beginShape();
  for (i=0; i<12; i++) {
    for (j=0; j<5; j++) {
      vertex(((width-(padding*5))/60)*(i*6+j), -map(last_hour[i].temp[j], 29, 30, 0, height));
    }
  }
  endShape();
  axisLeft(29, 30, 0.1);
  axisBottom();
}

function axisLeft(min, max, step) {
  stroke(0,0,0)
  strokeWeight(1);
  line(0, 0, 0, -(height-(padding*4)));
  noStroke();
  textSize(8);
  textAlign(LEFT)
  podzialka = (max-min)/step
  offset = (height-(padding*4)-0)/podzialka
  for (i = 0; i <= podzialka; i++) {
    text (min+(step*i), padding/4, -offset*i);
    strokeWeight(1);
  }
}

function axisBottom() {
  stroke(0,0,0)
  strokeWeight(1);
  line(0, 0, (width-(padding*2)), 0);
  noStroke();
  textSize(8);
  textAlign(LEFT)
  for (i = 0; i < 12; i++) {
    console.log(last_hour[0].hour+":"+last_hour[i].minute);
    push();
    rotate(PI/2);
    text (last_hour[0].hour+":"+last_hour[i].minute, padding/4,  -i*((width-(padding))/12));
    pop();
  }
}
