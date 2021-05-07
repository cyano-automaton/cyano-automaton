w = window.innerWidth;
h = window.innerHeight;
screen_portion = 0.6;
panoramic_ratio = 0.5625;

if (w < 1280) {
  canvas_width = w;
  u = canvas_width / 32;
  graph_width = canvas_width - u * 4;
  graph_height = graph_width * panoramic_ratio;
} else {
  canvas_width = w * 0.6;
  u = canvas_width / 48;
  graph_width = canvas_width - u * 4;
  graph_height = graph_width * panoramic_ratio;
}

function fillLines(x, y, wi, hi) {
  //noFill()
  rect(x, y, wi, hi);
  stroke(224, 192, 192);
}

function ScreenRightNow() {

  this.time_now = right_now.hour + ":" + right_now.minute;
  this.date_now = right_now.day + "." + right_now.month + "." + right_now.year;
  this.temp_now = right_now.temp;
  this.ntu_now = right_now.ntu;

  this.display = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    push();
    translate(this.x, this.y);
    fill(0, 96, 64);
    noStroke();
    rect(2 * u, 2 * u, this.width - u * 4, this.height, 10);
    textAlign(LEFT, BASELINE);
    fill(255, 128, 0);
    text("Right now:", 3 * u, 4 * u);
    text("Temperature: " + round(this.temp_now, 3) + "°C", 3 * u, u * 7);
    text("Turbidity: " + round(this.ntu_now, 3), 3 * u, u * 9);
    textAlign(RIGHT, BASELINE);
    text(this.time_now + " " + this.date_now, this.width-3*u , 4 * u)
    strokeWeight(1);
    stroke(255, 128, 0);
    line(0, 3 * u, 1.5 * u, 3 * u);
    line(0, this.height + u, 1.5 * u, this.height + u);
    line(this.width, 3 * u, this.width - 1.5 * u, 3 * u);
    line(this.width, this.height + u, this.width - 1.5 * u, this.height + u);
    line(3 * u, 0, 3 * u, 1.5 * u);
    line(this.width - 3 * u, 0, this.width - 3 * u, 1.5 * u);
    line(3 * u, this.height + 2.5 * u, 3 * u, this.height + 4.5 * u);
    line(this.width - 3 * u, this.height + 2.5 * u, this.width - 3 * u, this.height + 4.5 * u);
    pop();
  }
}


function DiodeWithTitle(title) {
  this.title = title;
  this.display = function(x, y) {
    this.x = x;
    this.y = y;
    textSize(u);
    textAlign(CENTER, BASELINE);
    noStroke();
    fill(255, 128, 0);
    text(this.title, this.x, this.y);
    if (title == "Heater") {
      noFill();
      if (last24[last24.length - 1].temp - last24[last24.length - 2].temp > 0) {
        if (frameCount % 3 == 0) {
          fill(255, 128, 0);
        } else {
          fill(0);
        }
        stroke(224, 192, 192)
      }
      if (last24[last24.length - 1].temp - last24[last24.length - 2].temp < 0) {
        noFill();
        stroke(224, 192, 192)
      }
    }
    if (title == "Lamp") {
      if (hour() < 22 && hour() > 6) {
        if (frameCount % 3 == 1) {
          fill(255, 128, 0);
        } else {
          fill(0);
        }
        stroke(224, 192, 192)
      } else {
        noFill();
        stroke(224, 192, 192)
      }
    }
    if (title == "Air pump") {
      if (hour() < 22 && hour() > 6) {
        if (frameCount % 3 == 2) {
          fill(255, 128, 0);
        } else {
          fill(0);
        }
        stroke(224, 192, 192)
      } else {
        noFill();
        stroke(224, 192, 192)
      }
    }
    circle(this.x, this.y + u, u);
  }
}

function TempIndicator() {

  this.display = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height
    noFill();
    position = map(right_now.temp, 20, 40, this.y + this.height, this.y)
    position_max = map(35, 20, 40, this.y + this.height, this.y)
    position_min = map(25, 20, 40, this.y + this.height, this.y)
    stroke(224, 192, 192)
    rect(this.x, this.y, this.width, this.height)

    line(this.x, position_max, this.x + this.width, position_max)
    line(this.x, position_min, this.x + this.width, position_min)


    stroke(255, 0, 255);
    line(this.x - u / 2, position, this.x + this.width + u / 2, position)


    noStroke();
    fill(255, 128, 0);
    text(round(right_now.temp, 3) + "°C", this.x + this.width + u * 3, position + u / 3);

    textAlign(RIGHT, CENTER);
    fill(224, 192, 192);
    textSize(u / 2);
    text("35", this.x - u / 3, position_max)
    text("25", this.x - u / 3, position_min)
  }
}

function NTUIndicator() {
  this.display = function(x, y, size) {
    this.x = x;
    this.y = y;
    this.radius = size;

    noFill();
    stroke(224, 192, 192);
    circle(x, y, this.radius);

    push();
    translate(x, y)
    push();
    for (i = 0; i < 16; i++) {
      rotate(2 * PI / 16);
      if (i > 0 && i < 14) {
        line(0, 2.5 * u, 0, this.radius / 2);
      }
    }
    textAlign(CENTER);
    noStroke();
    fill(224, 192, 192);
    textSize(u / 2)
    text("0", -2.5 * u, u * 2.5);
    text("1024", 3 * u, u * 2.5);


    fill(255, 128, 0);
    textSize(u);
    text(round(right_now.ntu, 3), 0, u * 4);
    pop();
    position = map(right_now.ntu, 0, 1024, (2 * PI / 16) * 2, (2 * PI / 16) * 14);
    rotate(position);
    stroke(0, 255, 255);
    line(0, 0, 0, this.radius / 2 + u);
    pop();


  }
}

function Timeline() {
  this.display = function(x, y, w) {
    this.x = x;
    this.y = y;
    this.width = w;
    line(this.x, this.y, this.width, this.y)
    for (i = 0; i <= this.width - this.x; i = i + this.width / 60) {
      line(this.x + i, this.y - u / 2, this.x + i, this.y + u / 2)
    }

    year_point = map(year_today.year, 1959, 2019, this.x, this.x + this.width);
    fill(255, 128, 0);
    stroke(255, 128, 0);
    line(year_point, this.y, year_point, this.y + 1.5 * u)

    noStroke();
    textAlign(CENTER);
    square(year_point - u / 8, this.y - u / 8, u / 4);
    text(year_today.year, year_point, this.y + u * 2.5);
    text(year_today.year - 1959, year_point, this.y - u);

    textAlign(RIGHT);
    text("CYANO-A [day]", this.width, this.y - u)
    text("NASA [year]", this.width, this.y + u * 2.5)
  }
}

function GoldBars() {
  spendings = spendings.getColumn(1);
  prices = prices.getColumn(1);
  production = production.getColumn(1);

  index = year_today.year - 1959;


  co2_produced = production[index] * 31103.4768 * 0.8;
  percentage_gold_co2 = production[index]/co2_produced * 100;
  console.log(percentage_gold_co2)

  gold_value = production[index] * prices[index] * 31103.4768;
  spendings_total = spendings[index]*1000000
  percentage_gold_used = (spendings_total/gold_value)

  spirulina_needed = co2_produced / 1.8;
  spirulina_produced_tones = spirulina_produced[0]/1000000;
  percentage_spirulina =   spirulina_produced_tones/spirulina_needed

  this.display = function(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    co2_point = map(co2_produced, 0, 82113178.752, this.x, this.width);
    //production_point = map(production[index], 0, 82113178.752, this.x, this.width);
    production_point = co2_point * percentage_gold_co2;

    value_point = map(gold_value, 0, 163316400407.43457, this.x, this.width);
    spendings_point = value_point * percentage_gold_used;

    needed_point = map(spirulina_needed, 0, 45618432.64, this.x, this.width);
  //  produced_point = map(spirulina_produced / 1000000, 0, 45618432.64, this.x, this.width);
    produced_point = needed_point * percentage_spirulina;

    this.bar(production_point, production[index], 0, "up");
    this.bar(co2_point, co2_produced, u * 1, "down");

    this.bar(spendings_point, spendings[index] * 1000000, u * 6, "up");
    this.bar(value_point, round(gold_value, 2), u * 7, "down")

    this.bar(needed_point, spirulina_needed, u * 12, "up");
    this.bar(produced_point, spirulina_produced_tones, u * 13, "down");


    textAlign(RIGHT);
    text("Gold [t]", this.width + this.x, this.y - u/2 );
    text("CO₂ [t]", this.width + this.x, this.y + u * 3);

    text("NASA [$/year]", this.width + this.x, this.y - u / 2 + u * 6);
    text("Gold [$/year]", this.width + this.x, this.y + u * 2 + u * 7);

    text("Spirulina required [t]", this.width + this.x, this.y - u / 2 + u * 12);
    text("Produced [t]", this.width + this.x, this.y + u * 2 + u * 13);

  }
  this.bar = function(x_value, real_value, offset, side) {
    this.x_value = x_value;
    this.real_value = real_value;
    this.offset = offset;
    this.side = side;
    noFill();
    stroke(224, 192, 192);
    rect(this.x, this.y + this.offset, this.width, u)
    fill(255, 128, 0);
    rect(this.x, this.y + this.offset, x_value, u);

    noStroke();
    textAlign(LEFT);
    if (side == "up") {
      text(real_value, this.x, this.y + this.offset - u / 2)
    }
    if (side == "down") {
      text(real_value, this.x, this.y + this.offset + u * 2)
    }

  }
}



function GraphBox(period) {
  this.period = period;
  textSize(u);

  this.display = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    push()
    translate(2 * u + x, y)
    this.title();
    this.graph("temp", 25, 35);
    this.axisLeft("Temperature", 25, 35, 1);
    this.axisBottom();
    translate(0, graph_height + 4 * u)
    this.graph("ntu", 0, 1024);
    this.axisLeft("Turbidity", 0, 1024, 128);
    this.axisBottom();
    pop()
  }


  this.title = function() {
    textSize(u);

    stroke(255, 128, 0)
    line(-2 * u, -this.height - u * 3, u * 10, -this.height - u * 3);
    fill(255, 128, 0);
    noStroke();
    textAlign(LEFT);
    text(this.period, 0, -graph_height - u)
    textAlign(RIGHT);
    if (this.period == "Last 24 hours") {
      text(time24[0] + "—" + time24[1] + " " + date24, this.width, -this.height - u)
    }
    if (this.period == "Last 7 days") {
      text(date7[0] + "—" + date7[1], this.width, -this.height - u)
    }
  }

  this.graph = function(param, min, max) {
    noFill();
    if (param == "temp") {
      stroke(255, 0, 255);
    }
    if (param == "ntu") {
      stroke(0, 255, 255);
    }
    beginShape();
    if (this.period == "Last 24 hours") {
      for (i = 0; i < last24.length; i++) {
        vertex((this.width / last24.length) * i, -map(last24[i][param], min, max, 0, this.height));
      }
    }
    if (this.period == "Last 7 days") {
      for (i = 0; i < last7.length; i++) {
        vertex((this.width / last7.length) * i, -map(last7[i][param], min, max, 0, this.height));
      }
    }
    endShape();
  }

  this.axisLeft = function(title, min, max, step) {
    push();
    noStroke();
    textAlign(RIGHT);
    rotate(-PI / 2);
    textSize(u);
    fill(255, 128, 0)
    text(title, this.height, -u);
    pop();

    fill(224, 192, 192);
    stroke(224, 192, 192);
    strokeWeight(1);
    line(0, 0, 0, -this.height);
    noStroke();
    textSize(u / 2);
    textAlign(LEFT)
    podzialka = (max - min) / step
    offset = this.height / podzialka
    for (i = 0; i <= podzialka; i++) {
      noStroke();
      text(min + (step * i), 5, -offset * i - 5);
      stroke(224, 192, 192);
      if (this.period == "Last 24 hours") {
        line(0, -offset * i, this.width, -offset * i)
      }
      if (this.period == "Last 7 days") {
        line(0, -offset * i, u / 2, -offset * i)
      }
    }
  }

  this.axisBottom = function() {
    fill(224, 192, 192);
    stroke(224, 192, 192);
    strokeWeight(1);
    line(0, 0, this.width, 0);
    noStroke();
    textSize(u / 2);
    textAlign(LEFT)
    if (this.period == "Last 24 hours") {
      for (i = 0; i < last24.length; i = i + 12) {
        push();
        rotate(PI / 2);
        noStroke();
        text(last24[i].hour, u, -i * (this.width / last24.length));
        pop();
        stroke(224, 192, 192);
        line(i * (this.width / last24.length), 0, i * (this.width / last24.length), 10)
      }
    }
    if (this.period == "Last 7 days") {
      for (i = 0; i < last7.length; i = i + 48) {
        push();
        noStroke();
        text(last7[i].day + "." + last7[i].month, i * (this.width / last7.length) - 10, 2 * u / 3);
        pop();
        stroke(224, 192, 192);
        line(i * (this.width / last7.length), 0, i * (this.width / last7.length), -this.height);
      }
    }
  }
}
