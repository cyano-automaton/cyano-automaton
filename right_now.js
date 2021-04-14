var json = d3.json("./data/right_now.json");

var svgContainer = d3.select("body").append("svg")
                                    .attr("width", 960)
                                    .attr("height", 540);


var right_now = svgContainer.selectAll("p")
                            .data(json)
                            .enter()
                            .append("p")
                            .text("coś")
