const renderDestinations = (
  path, widthScale,
  homex, homey,
  OrigenDestino, ZatsDestinos,
  DestinoOrigen, ZatsOrigenes) => {

    // console.log("OrigenDestino", OrigenDestino);
     console.log("ZatsDestinos", ZatsDestinos);
    // console.log("LO SIGUIENTE");
    // console.log("DestinoOrigen", DestinoOrigen);
    // console.log("ZatsOrigenes", ZatsOrigenes);

    g.selectAll(".destinations")
    .remove()

    g.selectAll(".destinations")
    .data(ZatsDestinos)
    .enter()
    .append("path")
    .attr("class", "destinations")
    .attr("d", function (it, i) {
      var startx = path.centroid(it[0])[0];
      var starty = path.centroid(it[0])[1];
      return "M" + homex + "," + homey + " Q" + (startx + homex)/2 + " " + (starty + homey)/2.5 +" " + startx+" "   + starty;
    })
    .attr("fill", "none")
    .attr("opacity", 0.7)
    //.attr("stroke-linecap", "round")
    .attr("stroke", "#bf812d")
    .attr("stroke-width", d => {

      let Temp = d[0].properties.Zona_Num_N;
      console.log("Temp", Temp);
      const zatRuta = OrigenDestino.filter(item => {
        return item.ZatDestination == Temp
      });
      cantidadViajes = zatRuta[0].Value;

      return widthScale(cantidadViajes)
    })
    .attr("stroke-linecap", "round")
    .call(transition)

  function transition(path) {
    path.transition()
    .duration(1500)
    .attrTween("stroke-dasharray", tweenDash);
  }

  function tweenDash() {
    var l = this.getTotalLength(),
    i = d3.interpolateString("0," + l, l + "," + l);
    return function(t) { return i(t); };
  }


 // // //

 g.selectAll(".origins")
 .remove()

 g.selectAll(".origins")
 .data(ZatsOrigenes)
 .enter()
 .append("path")
 .attr("class", "origins")
 .attr("d", function (it, i) {
   var startx = path.centroid(it[0])[0];
   console.log("startx",startx);
   var starty = path.centroid(it[0])[1];
   console.log("starty", starty);

   return "M" + startx + "," + starty + " Q" + (startx + homex)/2 + " " + (starty + homey)/1.5 +" " + homex+" "   + homey;
 })
 .attr("fill", "none")
 .attr("opacity", 0.7)
 .attr("stroke", "#35978f")
 .attr("stroke-width", d => {

   let Temp = d[0].properties.Zona_Num_N;
   const zatRuta = DestinoOrigen.filter(item => {
     return item.ZatOrigin == Temp
   });

   cantidadViajes = zatRuta[0].Value;

   return widthScale(cantidadViajes)
 })
 .attr("stroke-linecap", "round")
 .call(transition)
};
