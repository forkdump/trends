
function myData() {
    var series1 = [];
    var data1;
    $.getJSON('data.json')
   .done(function (data) {
      for(var i = 0; i < data.data.length; i++){
       var d = new Date(0);
       d.setUTCSeconds(data.data[i].created);
       series1.push({
        x: d, y: 981-i
       });
     }
   });

    return [
        {
            key: "Series #1",
            values: series1,
            color: "#0000ff"
        }
    ];
}
nv.addGraph(function() {
    var chart = nv.models.lineChart();

    chart.xAxis.axisLabel("Date (m/y)").tickFormat(function (d) {
        return d3.time.format("%m/%y")(new Date(d))
    });

    chart.yAxis
        .axisLabel("Y-axis Label")
        .tickFormat(d3.format("d"))
        ;

    d3.select("svg")
        .datum(myData())
        .transition().duration(500).call(chart);

    nv.utils.windowResize(
            function() {
                chart.update();
            }
        );

    return chart;
});