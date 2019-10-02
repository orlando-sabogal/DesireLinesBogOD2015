// https://observablehq.com/@orlando-sabogal/mobility-patterns-ii@85
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Mobility Patterns II
by [Orlando Sabogal](https://orlando-sabogal.github.io/)
`
)});
  main.variable(observer("viewof Arc")).define("viewof Arc", ["html"], function(html){return(
html`
<svg id = "MyArc"><svg/svg>
`
)});
  main.variable(observer("Arc")).define("Arc", ["Generators", "viewof Arc"], (G, _) => G.input(_));
  main.variable(observer()).define(["MyMap"], function(MyMap){return(
MyMap.node()
)});
  main.variable(observer("viewof value")).define("viewof value", ["html"], function(html){return(
html`

<input type="checkbox" id="from" checked>Trips from TAZ</>
<input type="checkbox" id="to" checked>Trips towards TAZ</>
<br></br> 

<h4>Select the transport modes you want to include</h3>
<input type="checkbox" id="Walking" checked>Walking</>
<input type="checkbox" id="Cycling">Cycling</input>
<input type="checkbox" id="Transmilenio">Transmilenio</input>
<input type="checkbox" id="TPCandSITP">TPC and SITP</input>
<input type="checkbox" id="Alimentador">Alimentador</input>
<input type="checkbox" id="Taxi">Taxi</input>
<input type="checkbox" id="Moto">Moto</input>
<input type="checkbox" id="Car">Car</input>
`
)});
  main.variable(observer("value")).define("value", ["Generators", "viewof value"], (G, _) => G.input(_));
  main.variable(observer("MyMap")).define("MyMap", ["d3","BogotaZats","path"], function(d3,BogotaZats,path)
{
  const MyMap = d3
    .create("svg")
    .style("width", 1000)
    .style("height", 300);

  const g = MyMap.append("g");
  MyMap.call(
    d3.zoom().on("zoom", () => {
      g.attr("transform", d3.event.transform);
    })
  );

  g.selectAll("path")
    .data(BogotaZats.features)
    .enter()
    .append("path")
    .attr("class", "Zats")
    .attr("d", path)
    .on("mouseover", function() {
      d3.select(this).attr("fill", "#4d4d4d");
    })
    .on("mouseout", function() {
      d3.select(this).attr("fill", "#bababa");
    })
    .attr("fill", "#bababa")
    .append("title")
    .text(d => d.properties.Zona_Num_N);

  //Listeners(g, MyData);

  return MyMap;
}
);
  main.variable(observer("MyArc")).define("MyArc", ["MyData","d3"], function(MyData,d3)
{
  //Lets try to make an Arc!
  //const width = 400;
  //const height = 400;

  let MyData2 = MyData.filter(item => {
    return item.Value > 0;
  });

  let NodesTemp = [];

  MyData2.forEach((d, i) => {
    let Temp = d.ZatOrigin;
    NodesTemp[i] = Temp;
  });

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  let allNodes = NodesTemp.filter(onlyUnique);

  //Souce: https://www.d3-graph-gallery.com/graph/arc_basic.html

  var margin = { top: 20, right: 30, bottom: 20, left: 30 };
  const width = 1600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#MyArc")
    //.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // List of node names

  //allNodes

  // A linear scale to position the nodes on the X axis
  const x = d3
    .scalePoint()
    .range([0, 500])
    .domain(allNodes);
  //.padding(0.5)
  //.round(true)

  // Add the circle for the nodes
  svg
    //.selectAll("mynodes")
    .selectAll("circle")
    .data(allNodes)
    .enter()
    .append("circle")
    //.atrr("")
    .attr("cx", d => x(d))
    .attr("cy", height - 30)
    .attr("r", 1)
    .style("fill", "#69b3a2");

  // Arcs paths

  svg
    .selectAll(".arcPaths")
    .data(MyData2)
    .enter()
    .append('path')
    .attr("class", "arcPaths")
    .attr('d', function(d) {
      let start = x(d.ZatOrigin); // X position of start node on the X axis
      let end = x(d.ZatDestination); // X position of end node
      return [
        'M',
        start,
        height - 30, // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
        'A', // This means we're gonna build an elliptical arc
        (start - end) / 2,
        ',', // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
        (start - end) / 2,
        0,
        0,
        ',',
        start < end ? 1 : 0,
        end,
        ',',
        height - 30
      ] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
        .join(' ');
    })
    .style("fill", "none")
    .style("stroke-opacity", 0.03)
    .style("stroke", "black");

  return svg;
}
);
  main.variable(observer()).define(["html"], function(html){return(
html`<hr>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Projection and Path functions`
)});
  main.variable(observer("projection")).define("projection", ["d3","BogotaZats"], function(d3,BogotaZats){return(
d3.geoMercator().fitExtent([[0, 0], [500, 400]], BogotaZats)
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath().projection(projection)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Annex`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Load data from github and import D3`
)});
  main.variable(observer("MyData")).define("MyData", ["d3"], function(d3){return(
d3.csv("https://gist.githubusercontent.com/orlando-sabogal/149c7524e0df22196a243dccc1def862/raw/c2cd72a53b9d4380d1cb82b2a41e9ea7ed360539/DataReal.csv")
)});
  main.variable(observer()).define(["MyData"], function(MyData)
{
  MyData.forEach((d, i) => {
    MyData[i].PEATON = +d.PEATON;
    MyData[i].Bicicleta = +d.Bicicleta;
    MyData[i].Transmilenio = +d.Transmilenio;
    MyData[i].TPCySITP = +d.TPCySITP;
    MyData[i].ALIMENTADOR = +d.ALIMENTADOR;
    MyData[i].TAXI = +d.TAXI;
    MyData[i].MOTO = +d.MOTO;
    MyData[i].AUTO = +d.AUTO;
    //To preset the Data. Walking Input is selected
    MyData[i].Value = +d.Value;
    MyData[i].Value = +d.PEATON;
  });
  return MyData;
}
);
  main.variable(observer("BogotaZats")).define("BogotaZats", ["d3"], function(d3){return(
d3.json(
  "https://gist.githubusercontent.com/orlando-sabogal/149c7524e0df22196a243dccc1def862/raw/6f0664e33d7d8f7bd23016b65b9b1868edf6e94e/gistfile3.txt"
)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
