var right_now = d3.json("./data/right_now.json", function() {
  console.log(right_now["temp"]);
});

var svgContainer = d3.select("#right_now")
                            .append("p")
                            .text(right_now["temp"])


/*var right_now = svgContainer.select("#right_now")
                            .append("p")
                            .text("coś")*/
