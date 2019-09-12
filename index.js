const HeightTotal = 700;
const WidthTotal = 700;

const MySpace = d3.select("#MapSpace")
 .attr("height", HeightTotal)
 .attr("width", WidthTotal);

 g = MySpace.append("g");

 MySpace.call(d3.zoom().on("zoom", () => {
   g.attr("transform", d3.event.transform)
 }));

d3.json("BogotaZats.geojson")
.then(data => {
  console.log(data);
  BogotaZats = data;

  var projection = d3.geoMercator()
        .fitExtent([[0, 0], [HeightTotal, WidthTotal]], BogotaZats)

  var geoPath = d3.geoPath()
          .projection(projection);

g.selectAll("path")
       .data(BogotaZats.features)
       .enter()
       .append("path")
        .attr("class", "Zats")
        .attr("d", geoPath)
        .attr("fill", "#bababa")
       .append("title")
        .text( d => d.properties.Zona_Num_N)
       .on("click", function(d) {
            console.log(d.properties.Zona_Num_N);
            //clicked(d)
          });
       ;
});
