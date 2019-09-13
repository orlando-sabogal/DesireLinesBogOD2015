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
var promise2 = d3.csv("DataReal.csv")

Promise.all([promise1, promise2])
  .then(function(values) {

    const BogotaZats = values[0];
    MyData = values[1];

    functionRender(BogotaZats, MyData);
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
