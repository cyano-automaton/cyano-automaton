var json = d3.json("./data/right_now.json");

var svgContainer = d3.select("#right_now")
                            .append("p")
                            .text(json["temp"])


/*var right_now = svgContainer.select("#right_now")
                            .append("p")
                            .text("coś")*/
