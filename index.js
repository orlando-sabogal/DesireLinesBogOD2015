
//SEE https://bootsnipp.com/snippets/Q0d6E
//SEE https://www.w3schools.com/howto/howto_css_switch.asp
//SEE https://www.bootstraptoggle.com/

// SEE https://bl.ocks.org/johnnygizmo/3d593d3bf631e102a2dbee64f62d9de4

// d3.select("#Walking").on("change", d => {
//   if(d3.select("#Walking").property("checked")){
//     console.log("A2");
//   } else {
//     console.log("B2");
//   } });

//
const HeightTotal = 700;
const WidthTotal = 700;

const MySpace = d3.select("#MapSpace")
 .attr("height", HeightTotal)
 .attr("width", WidthTotal);

const g = MySpace.append("g");
 MySpace.call(d3.zoom().on("zoom", () => {
   g.attr("transform", d3.event.transform)
 }));


// //First promise
var promise1 = d3.json("BogotaZats.geojson")

// //Second promise
//var promise2 = d3.csv("DataLong.csv") // How to parseFloat here???
var promise2 = d3.csv("DataReal.csv")

Promise.all([promise1, promise2])
  .then(function(values) {

    const BogotaZats = values[0];
    MyData = values[1];

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

    functionRender(BogotaZats, MyData);
    renderArc(BogotaZats, MyData);
    renderChord(MyData);

  //Here starts the whole sectio of listening the buttons
  //How to optimize this?
    d3.select("#Walking").on("change", d => {
      if(d3.select("#Walking").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.PEATON + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.PEATON; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove()
      functionRender(BogotaZats, MyData); });

    d3.select("#Cycling").on("change", d => {
      if(d3.select("#Cycling").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.Bicicleta + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.Bicicleta; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove()
      functionRender(BogotaZats, MyData); });

    d3.select("#Transmilenio").on("change", d => {
      if(d3.select("#Transmilenio").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.Transmilenio + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.Transmilenio; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove()
      functionRender(BogotaZats, MyData); });

    d3.select("#TPCandSITP").on("change", d => {
      if(d3.select("#TPCandSITP").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.TPCySITP + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.TPCySITP; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove()
      functionRender(BogotaZats, MyData); });

    d3.select("#Alimentador").on("change", d => {
      if(d3.select("#Alimentador").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.ALIMENTADOR + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.ALIMENTADOR; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove()
      functionRender(BogotaZats, MyData); });

    d3.select("#Taxi").on("change", d => {
      if(d3.select("#Taxi").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.TAXI + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.TAXI; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove()
      functionRender(BogotaZats, MyData);

      renderArc(BogotaZats, MyData);});

    d3.select("#Moto").on("change", d => {
      if(d3.select("#Moto").property("checked")){
        MyData.forEach((item,i) => {MyData[i].Value = item.MOTO + item.Value; })
      } else {
        MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.MOTO; })
      }
      g.selectAll(".destinations").remove()
      g.selectAll(".origins").remove()
      functionRender(BogotaZats, MyData); });

      d3.select("#Car").on("change", d => {
        if(d3.select("#Car").property("checked")){
          MyData.forEach((item,i) => {MyData[i].Value = item.AUTO + item.Value; })
        } else {
          MyData.forEach((item,i) => {MyData[i].Value = item.Value - item.AUTO; })
        }
        g.selectAll(".destinations").remove()
        g.selectAll(".origins").remove()
        functionRender(BogotaZats, MyData); });

///////Finish listening the Inputs
});

const functionRender = (BogotaZats,MyData) => {

  const projection = d3 .geoMercator()
      .fitExtent([[0, 0], [HeightTotal, WidthTotal]], BogotaZats)

  const path = d3.geoPath()
        .projection(projection);

  g.selectAll("path")
     .data(BogotaZats.features)
     .enter()
     .append("path")
      .attr("class", "Zats")
      .attr("d", path)
      .attr("fill", "#bababa")
     .append("title")
      .text( d => d.properties.Zona_Num_N);

  g.selectAll("path")
    .on("click", function(d) {
           clicked(d, MyData, BogotaZats, path) });
};

function clicked(Zat, MyData, BogotaZats, path) {

  const SelectedZat = Zat.properties.Zona_Num_N;
  var homex = path.centroid(Zat)[0];
  var homey = path.centroid(Zat)[1];


  //Set the Width Scale fot the lines
          const widthScale = d3.scaleLinear()
          .domain([0,5000])
          //.domain(d3.extent(OrigenDestino, d => parseFloat(d.Value)))
          .range([2,15]);

  //Origen-Destino Data

      OrigenDestino = MyData.filter(item => {
        return item.ZatOrigin == SelectedZat
      });

      OrigenDestino = OrigenDestino.filter(function(item) {
        return item.Value > 0
      });

      OrigenDestino = OrigenDestino.filter(function(item) {
        return item.ZatDestination != SelectedZat
      });

      ZatsDestinos = [];

      OrigenDestino.map( d => {
        Tempo = BogotaZats.features.filter(function(item) {
          return item.properties.Zona_Num_N == d.ZatDestination
        });
        ZatsDestinos.push(Tempo);
      });

  //Destino-Origen Data

      DestinoOrigen = MyData.filter(item => {
        return item.ZatDestination == SelectedZat
      });

      DestinoOrigen = DestinoOrigen.filter(function(item) {
        return item.Value > 0
      });

      DestinoOrigen = DestinoOrigen.filter(function(item) {
         return item.ZatOrigin != SelectedZat
       });

      ZatsOrigenes = [];

      DestinoOrigen.map( d => {
        Tempo = BogotaZats.features.filter(function(item) {
          return item.properties.Zona_Num_N == d.ZatOrigin
        });
        ZatsOrigenes.push(Tempo);
      });

      renderDestinations(path, widthScale,
                         homex, homey,
                         OrigenDestino, ZatsDestinos,
                         DestinoOrigen, ZatsOrigenes) // From renderFunctions.js


  //SelectedZat
    renderChord2(MyData, SelectedZat); //Experimental. Chech if MyData is the right object.

}


//Lets try to make an Arc!

function renderArc(BogotaZats, MyData) {

MyData2 = MyData.filter(item => {
  return item.Value >0
});

NodesTemp = [];

MyData2.forEach( (d,i) => {
    Temp = d.ZatOrigin
    //console.log(Temp);
    NodesTemp[i] = Temp;
})

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

allNodes = NodesTemp.filter(onlyUnique)
//console.log(allNodes);
//console.log(allNodes.length);

//Souce: https://www.d3-graph-gallery.com/graph/arc_basic.html

  var margin = {top: 20, right: 30, bottom: 20, left: 30};
  width = 1600 - margin.left - margin.right;
  height = 300 - margin.top - margin.bottom;


// append the svg object to the body of the page
var svg = d3.select("#arcPlot")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // List of node names

  //allNodes

  // A linear scale to position the nodes on the X axis
  var x = d3.scalePoint()
    .range([0, 500])
    .domain(allNodes)
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
      .attr("cx", d => x(d) )
      .attr("cy", height-30)
      .attr("r", 1)
      .style("fill", "#69b3a2")



// Arcs paths

svg
  .selectAll(".arcPaths")
  .data(MyData2)
  .enter()
  .append('path')
  .attr("class", "arcPaths")
  .attr('d', function (d) {
    start = x(d.ZatOrigin)    // X position of start node on the X axis
    end = x(d.ZatDestination)      // X position of end node
    return ['M', start, height-30,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
      'A',                            // This means we're gonna build an elliptical arc
      (start - end)/2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
      (start - end)/2, 0, 0, ',',
      start < end ? 1 : 0, end, ',', height-30] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
      .join(' ');
  })
  .style("fill", "none")
  .attr("stroke", "black")


};


// Let's make a chordPlot

function renderChord (MyData) {

  MyData2 = MyData.filter(item => {
    return item.Value >0
  });

  function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
  }

  ZatsTemp = [];

  MyData2.forEach( (d,i) => {
      Temp = d.ZatOrigin;
      ZatsTemp.push(Temp);
      Temp = d.ZatDestination;
      ZatsTemp.push(Temp);
  })

  allZats = ZatsTemp.filter(onlyUnique)
  //console.log(allZats);

  MatrixChord = [];

  allZats.forEach(d => {
    VectorTemp = Array(allZats.length).fill(0);
    DataTemp = MyData2.filter(item => item.ZatOrigin == +d);
    //console.log(DataTemp);
    allZats.forEach( (destino,i) => {
      DataTempDestino = DataTemp.filter(item => item.ZatDestination == destino);
      //console.log(DataTempDestino);
      if (DataTempDestino.length>0){
        Total = DataTempDestino[0].Value;
        //if (Total >0) {console.log(Total);};
        VectorTemp[i] = Total;
      };
    });
    MatrixChord.push(VectorTemp)
  });


  //
  ChordTest = d3.select("#ChordSVG")
    .attr("width", 880)
    .attr("height", 880)
    .append("g")
      .attr("transform", "translate(440,440)");

  res = d3.chord()
        .padAngle(0.05)     // padding between entities (black arc)
        .sortSubgroups(d3.descending)
        (MatrixChord)

// add the groups on the inner part of the circle
ChordTest
  .datum(res)
  .append("g")
  .selectAll("g")
  .data(function(d) { return d.groups; })
  .enter()
  .append("g")
  .append("path")
    .style("fill", "grey")
    .style("stroke", "black")
    .attr("d", d3.arc()
      .innerRadius(400)
      .outerRadius(420)
    )

// Add the links between groups
ChordTest
  .datum(res)
  .append("g")
  .selectAll("path")
  .data(function(d) { return d; })
  .enter()
  .append("path")
    .attr("d", d3.ribbon()
      .radius(400)
    )
    .style("fill", "#69b3a2")
    .style("stroke", "black");

  //

};


function renderChord2 (MyData, SelectedZat) {

  MyData2 = MyData.filter(item => {
    return item.Value >0
  });

  function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
  }

  ZatsTemp = [];

  MyData2.forEach( (d,i) => {
      Temp = d.ZatOrigin;
      ZatsTemp.push(Temp);
      Temp = d.ZatDestination;
      ZatsTemp.push(Temp);
  })

  allZats = ZatsTemp.filter(onlyUnique)
  //console.log(allZats);

  MatrixChord = [];

  allZats.forEach(d => {
    VectorTemp = Array(allZats.length).fill(0);
    DataTemp = MyData2.filter(item => item.ZatOrigin == +d);
    //console.log(DataTemp);
    allZats.forEach( (destino,i) => {
      DataTempDestino = DataTemp.filter(item => item.ZatDestination == destino);
      //console.log(DataTempDestino);
      if (DataTempDestino.length>0){
        Total = DataTempDestino[0].Value;
        //if (Total >0) {console.log(Total);};
        VectorTemp[i] = Total;
      };
    });
    MatrixChord.push(VectorTemp)
  });

  VectorColor = allZats.indexOf(SelectedZat.toString());
  console.log(SelectedZat);
  console.log(VectorColor);

  //
  ChordTest = d3.select("#ChordSVG")
    .attr("width", 880)
    .attr("height", 880)
    .append("g")
      .attr("transform", "translate(440,440)");

  res = d3.chord()
        .padAngle(0.05)     // padding between entities (black arc)
        .sortSubgroups(d3.descending)
        (MatrixChord)

// add the groups on the inner part of the circle
ChordTest
  .datum(res)
  .append("g")
  .selectAll("g")
  .data(function(d) { return d.groups; })
  .enter()
  .append("g")
  .append("path")
    .style("fill", "grey")
    .style("stroke", "black")
    .attr("d", d3.arc()
      .innerRadius(400)
      .outerRadius(420)
    )

// Add the links between groups
ChordTest
  .datum(res)
  .append("g")
  .selectAll("path")
  .data(function(d) { return d; })
  .enter()
  .append("path")
    .attr("d", d3.ribbon()
      .radius(400)
    )
    .style("fill", "#69b3a2")
    .style("stroke", "black");

  //

};
