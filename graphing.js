function myData() {
  var series1 = [];
  var series2 = [];
  var series3 = [];
  var series4 = [];
    $.getJSON('data.json')
  .done(function (data) {
    var init = new Date(0);
    init.setUTCSeconds(data.data[data.data.length-1].created);
    var tempMonth = init.getMonth();
    var tempYear = init.getFullYear();
    var num = 0;
    for(var i = data.data.length-1; i >= 0; i--){
     var d = new Date(0);
     d.setUTCSeconds(data.data[i].created);
     if(tempMonth != d.getMonth()){
      var tempDay = new Date(0);
      tempDay.setMonth(tempMonth);
      tempDay.setFullYear(tempYear);
      series1.push({
        x: tempDay, y: num
      });
      tempMonth++;
      if(tempMonth == 12){
        tempMonth =0;
        tempYear++;
      }
      num = 0;
    }
    if(tempMonth == d.getMonth()){
      num+=1;
    }

  }
});
    $.getJSON('data2.json')
  .done(function (data) {
    var init = new Date(0);
    init.setUTCSeconds(data.data[data.data.length-1].created);
    var tempMonth = init.getMonth();
    var tempYear = init.getFullYear();
    var num = 0;
    for(var i = data.data.length-1; i >= 0; i--){
     var d = new Date(0);
     d.setUTCSeconds(data.data[i].created);
     if(tempMonth != d.getMonth()){
      var tempDay = new Date(0);
      tempDay.setMonth(tempMonth);
      tempDay.setFullYear(tempYear);
      series2.push({
        x: tempDay, y: num
      });
      tempMonth++;
      if(tempMonth == 12){
        tempMonth =0;
        tempYear++;
      }
      num = 0;
    }
    if(tempMonth == d.getMonth()){
      num+=1;
    }

  }
});
      $.getJSON('data3.json')
  .done(function (data) {
    var init = new Date(0);
    init.setUTCSeconds(data.data[data.data.length-1].created);
    var tempMonth = init.getMonth();
    var tempYear = init.getFullYear();
    var num = 0;
    for(var i = data.data.length-1; i >= 0; i--){
     var d = new Date(0);
     d.setUTCSeconds(data.data[i].created);
     if(tempMonth != d.getMonth()){
      var tempDay = new Date(0);
      tempDay.setMonth(tempMonth);
      tempDay.setFullYear(tempYear);
      series3.push({
        x: tempDay, y: num
      });
      tempMonth++;
      if(tempMonth == 12){
        tempMonth =0;
        tempYear++;
      }
      num = 0;
    }
    if(tempMonth == d.getMonth()){
      num+=1;
    }

  }
});
        $.getJSON('data4.json')
  .done(function (data) {
    var init = new Date(0);
    init.setUTCSeconds(data.data[data.data.length-1].created);
    var tempMonth = init.getMonth();
    var tempYear = init.getFullYear();
    var num = 0;
    for(var i = data.data.length-1; i >= 0; i--){
     var d = new Date(0);
     d.setUTCSeconds(data.data[i].created);
     if(tempMonth != d.getMonth()){
      var tempDay = new Date(0);
      tempDay.setMonth(tempMonth);
      tempDay.setFullYear(tempYear);
      series4.push({
        x: tempDay, y: num
      });
      tempMonth++;
      if(tempMonth == 12){
        tempMonth =0;
        tempYear++;
      }
      num = 0;
    }
    if(tempMonth == d.getMonth()){
      num+=1;
    }

  }
});
  return [
  {
    key: "Java",
    values: series1,
    color: "#0000ff"
  },
  {
    key: "SQL",
    values: series2,
    color: "#ff0000"
  },
  {
    key: "PHP",
    values: series3,
    color: "#00ff00"
  },
  {
    key: "Ruby",
    values: series4,
    color: "#000000"
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