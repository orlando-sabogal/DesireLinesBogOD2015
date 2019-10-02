// https://observablehq.com/@orlando-sabogal/mobility-patterns-i@819
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Mobility Patterns I
by [Orlando Sabogal](https://orlando-sabogal.github.io/)
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Origin-destination surveys are one of the *gold standard* data sources in transport analysis. It is based on the idea of divide an urban –often metropolitan– area into Transport Zone Analysis TAZ and after a sampling procedure, ask people about the characteristics of their commutes: frequency, mode, purpose, duration, costs, etc. Although it seems simple and raw databases are easy to process, data analysis can become complex. <br>
One of the main tools transport analyst have developed are the so called **desire lines** where trips among two TAZ are represented with a line (from centroid to centroid) and the width is proportional to the amount of trips. Unfortunately, adding more pairs rapidly scale to a tangle. Moreover, is difficult to perform even simple tasks such as comparisons, re-orderings or simply see a subset of data. 
This is the first ~~(I hope)~~ of a series of visualizations created with the purpose of enhance a fast and effective exploration of origin-destination surveys. In the future, I expect to set the foundations of techniques to analyze this kind of data and –may be– develop a product to do it. <br>
[Here](https://observablehq.com/@orlando-sabogal/mobility-patterns-ii) you can find another experiment.
`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<hr>`
)});
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
  main.variable(observer()).define(["html"], function(html){return(
html`<hr>`
)});
  main.variable(observer("MyMap")).define("MyMap", ["d3","BogotaZats","path","clicked","MyData","Listeners"], function(d3,BogotaZats,path,clicked,MyData,Listeners)
{
  const MyMap = d3
    .create("svg")
    .style("width", 500)
    .style("height", 400);

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

  MyMap.selectAll(".Zats").on("click", d => {
    clicked(g, d, MyData); // Do I really need to Pass "MyData"?
  });

  Listeners(g, MyData);

  return MyMap;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Functions`
)});
  main.variable(observer("Listeners")).define("Listeners", ["d3"], function(d3){return(
(g, MyData) => {
  d3.select("#Walking").on("change", d => {
      if(d3.select("#Walking").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.PEATON + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.PEATON; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove() });

    d3.select("#Cycling").on("change", d => {
      if(d3.select("#Cycling").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.Bicicleta + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.Bicicleta; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove() });

    d3.select("#Transmilenio").on("change", d => {
      if(d3.select("#Transmilenio").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.Transmilenio + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.Transmilenio; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove() });

    d3.select("#TPCandSITP").on("change", d => {
      if(d3.select("#TPCandSITP").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.TPCySITP + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.TPCySITP; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove() });

    d3.select("#Alimentador").on("change", d => {
      if(d3.select("#Alimentador").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.ALIMENTADOR + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.ALIMENTADOR; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove() });

    d3.select("#Taxi").on("change", d => {
      if(d3.select("#Taxi").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.TAXI + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.TAXI; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove()});

    d3.select("#Moto").on("change", d => {
      if(d3.select("#Moto").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.MOTO + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.MOTO; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove() });

      d3.select("#Car").on("change", d => {
        if(d3.select("#Car").property("checked")){
          MyData.forEach((item,i) => {MyData[i].Value = item.AUTO + item.Value; })
        } else {
          MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.AUTO; })
        }
        g.selectAll(".destinations").remove()
        g.selectAll(".origins").remove() });
  
 
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Projection and Path functions`
)});
  main.variable(observer("projection")).define("projection", ["d3","BogotaZats"], function(d3,BogotaZats){return(
d3 .geoMercator()
      .fitExtent([[0, 0], [500, 400]], BogotaZats)
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath().projection(projection)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Desire Lines`
)});
  main.variable(observer("clicked")).define("clicked", ["path","d3","BogotaZats","renderFromLines","renderToLines"], function(path,d3,BogotaZats,renderFromLines,renderToLines){return(
(g, Zat, MyData) => {
  const SelectedZat = Zat.properties.Zona_Num_N;
  var homex = path.centroid(Zat)[0];
  var homey = path.centroid(Zat)[1];

  //Set the Width Scale fot the lines
  const widthScale = d3
    .scaleLinear()
    .domain([0, 5000])
    //.domain(d3.extent(OrigenDestino, d => parseFloat(d.Value)))
    .range([2, 15]);

  //Origen-Destino Data

  let OrigenDestino = MyData.filter(item => {
    return item.ZatOrigin == SelectedZat;
  });

  OrigenDestino = OrigenDestino.filter(function(item) {
    return item.Value > 0;
  });

  OrigenDestino = OrigenDestino.filter(function(item) {
    return item.ZatDestination != SelectedZat;
  });

  let ZatsDestinos = [];

  OrigenDestino.map(d => {
    let Tempo = BogotaZats.features.filter(function(item) {
      return item.properties.Zona_Num_N == d.ZatDestination;
    });
    ZatsDestinos.push(Tempo);
  });

  //Destino-Origen Data

  let DestinoOrigen = MyData.filter(item => {
    return item.ZatDestination == SelectedZat;
  });

  DestinoOrigen = DestinoOrigen.filter(function(item) {
    return item.Value > 0;
  });

  DestinoOrigen = DestinoOrigen.filter(function(item) {
    return item.ZatOrigin != SelectedZat;
  });

  let ZatsOrigenes = [];

  DestinoOrigen.map(d => {
    let Tempo = BogotaZats.features.filter(function(item) {
      return item.properties.Zona_Num_N == d.ZatOrigin;
    });
    ZatsOrigenes.push(Tempo);
  });

  /////

  // //

  if (d3.select("#from").property("checked")) {
    renderFromLines(
      g,
      path,
      widthScale,
      homex,
      homey,
      OrigenDestino,
      ZatsDestinos,
      DestinoOrigen,
      ZatsOrigenes
    );
  } else {
    g.selectAll(".destinations").remove();
  }

  // //

  if (d3.select("#to").property("checked")) {
    renderToLines(
      g,
      path,
      widthScale,
      homex,
      homey,
      OrigenDestino,
      ZatsDestinos,
      DestinoOrigen,
      ZatsOrigenes
    );
  } else {
    g.selectAll(".origins").remove();
  }
}
)});
  main.variable(observer("renderFromLines")).define("renderFromLines", ["d3"], function(d3){return(
(g,
  path,
  widthScale,
  homex,
  homey,
  OrigenDestino,
  ZatsDestinos,
  DestinoOrigen,
  ZatsOrigenes) => {
  
  g.selectAll(".destinations").remove();

  g.selectAll(".destinations")
    .data(ZatsDestinos)
    .enter()
    .append("path")
    .attr("class", "destinations")
    .attr("d", function(it, i) {
      var startx = path.centroid(it[0])[0];
      var starty = path.centroid(it[0])[1];
      return (
        "M" +
        homex +
        "," +
        homey +
        " Q" +
        (startx + homex) / 2 +
        " " +
        (starty + homey) / 2.5 +
        " " +
        startx +
        " " +
        starty
      );
    })
    .attr("fill", "none")
    .attr("opacity", 0.7)
    //.attr("stroke-linecap", "round")
    .attr("stroke", "#bf812d")
    .attr("stroke-width", d => {
      let Temp = d[0].properties.Zona_Num_N;
      const zatRuta = OrigenDestino.filter(item => {
        return item.ZatDestination == Temp;
      });
      let cantidadViajes = zatRuta[0].Value;

      return widthScale(cantidadViajes);
    })
    .attr("stroke-linecap", "round")
    .call(transition);
  
  // //
  
  function transition(path) {
    path
      .transition()
      .duration(1500)
      .attrTween("stroke-dasharray", tweenDash);
  }

  function tweenDash() {
    var l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
    return function(t) {
      return i(t);
    };
  }
  
  
}
)});
  main.variable(observer("renderToLines")).define("renderToLines", ["d3"], function(d3){return(
(g,
  path,
  widthScale,
  homex,
  homey,
  OrigenDestino,
  ZatsDestinos,
  DestinoOrigen,
  ZatsOrigenes) => {
  
   g.selectAll(".origins").remove();

  g.selectAll(".origins")
    .data(ZatsOrigenes)
    .enter()
    .append("path")
    .attr("class", "origins")
    .attr("d", function(it, i) {
      var startx = path.centroid(it[0])[0];
      var starty = path.centroid(it[0])[1];

      return (
        "M" +
        startx +
        "," +
        starty +
        " Q" +
        (startx + homex) / 2 +
        " " +
        (starty + homey) / 1.5 +
        " " +
        homex +
        " " +
        homey
      );
    })
    .attr("fill", "none")
    .attr("opacity", 0.7)
    .attr("stroke", "#35978f")
    .attr("stroke-width", d => {
      let Temp = d[0].properties.Zona_Num_N;
      const zatRuta = DestinoOrigen.filter(item => {
        return item.ZatOrigin == Temp;
      });

      let cantidadViajes = zatRuta[0].Value;

      return widthScale(cantidadViajes);
    })
    .attr("stroke-linecap", "round")
    .call(transition);
  
  // //
  
  function transition(path) {
    path
      .transition()
      .duration(1500)
      .attrTween("stroke-dasharray", tweenDash);
  }

  function tweenDash() {
    var l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
    return function(t) {
      return i(t);
    };
  }
  
}
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<hr>`
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
MyData.forEach( (d,i) => {
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
return(MyData);
}
);
  main.variable(observer("BogotaZats")).define("BogotaZats", ["d3"], function(d3){return(
d3.json("https://gist.githubusercontent.com/orlando-sabogal/149c7524e0df22196a243dccc1def862/raw/78eeb42579539b1da148e8854fee8576f8dcd920/BogotaZatsMAPSHAPER.json")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}
