
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
    renderChord(BogotaZats, MyData);

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
      functionRender(BogotaZats, MyData); });

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
}


//Lets try to make a Chord!

function renderChord(BogotaZats, MyData) {

///Not Working
  // DataChord = [];
  //
  // MyData.map( (d,i) => {
  //
  //   DataTemp = {
  //     Source: d.ZatOrigin,
  //     Target: d.ZatDestination,
  //     Value: d.Value
  //   };
  // DataChord.push(DataTemp);
  // });
  //
  // var mpr = chordMpr(DataChord);
  //
  //
  // mpr
  //   .addValuesToMap('Source')
  //   .addValuesToMap('Target')
  // //   .setFilter(function(row, a, b) {
  // //       return (row.root === a.name && row.node === b.name)
  // //     })
  // //   .setAccessor(function(recs, a, b) {
  // //       if (!recs[0]) return 0;
  // //       return +recs[0].count;
  // //     });
  // // drawChords(mpr.getMatrix(), mpr.getMap());
  // //
  //
  // console.log(mpr);
///Not Working

  var chordPlot = d3.select("#chordPlot")
    .attr("width", 440)
    .attr("height", 440)
  .append("g")
    .attr("transform", "translate(220,220)")

// create input data: a square matrix that provides flow between entities
var matrix = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
];

// give this matrix to d3.chord(): it will calculates all the info we need to draw arc and ribbon
var res = d3.chord()
    .padAngle(0.05)     // padding between entities (black arc)
    .sortSubgroups(d3.descending)
    (matrix)

// add the groups on the inner part of the circle
chordPlot
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
      .innerRadius(200)
      .outerRadius(210)
    )

// Add the links between groups
chordPlot
  .datum(res)
  .append("g")
  .selectAll("path")
  .data(function(d) { return d; })
  .enter()
  .append("path")
    .attr("d", d3.ribbon()
      .radius(200)
    )
    .style("fill", "#69b3a2")
    .style("stroke", "black");

};
