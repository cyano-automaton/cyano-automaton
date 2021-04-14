let right_now;
let last_hour;
let font_size = 20;
let padding = 40;

function preload() {
  right_now = loadJSON("./data/right_now.json");
  last_hour = loadJSON("./hours/lastHour.json");

}

function setup() {
  canvas = createCanvas(960, 540*2);
  canvas.parent('graphs');
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
  text("Last hour:",padding, font_size+padding)
  textAlign(RIGHT);
  text(last_hour[0].hour+":"+last_hour[0].minute+"0"+" "+last_hour[0].day+"."+last_hour[0].month+"." +last_hour[0].year,width-padding, font_size+ padding)
  translate(padding, height-padding);

  stroke(255,0,0);
  noFill();
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
