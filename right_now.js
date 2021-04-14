var right_now = d3.json("./data/right_now.json", function(error, data) {
  if(error == null || error == undefined) {
    var svgContainer = d3.select("#right_now")
                      .append("p")
                      .text(data["temp"])
} else {
  window.alert('Something wrong happened while loading the data from JSON file. Try again.');
}});




/*var right_now = svgContainer.select("#right_now")
                            .append("p")
                            .text("coś")*/
