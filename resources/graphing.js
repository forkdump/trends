var processData = function(data, series) {
    var init = new Date(0);
    init.setUTCSeconds(data.data[data.data.length - 1].created);
    var tempMonth = init.getMonth();
    var tempYear = init.getFullYear();
    var num = 0;
    for (var i = data.data.length - 1; i >= 0; i--) {
        var d = new Date(0);
        d.setUTCSeconds(data.data[i].created);
        if (tempMonth != d.getMonth()) {
            var tempDay = new Date(0);
            tempDay.setMonth(tempMonth);
            tempDay.setFullYear(tempYear);
            series.push({
                x: tempDay,
                y: num
            });
            tempMonth++;
            if (tempMonth == 12) {
                tempMonth = 0;
                tempYear++;
            }
            num = 0;
        }
        if (tempMonth == d.getMonth()) {
            num += 1;
        }

    }
}

function getData(subreddit, topic, series, callback) {
    console.log("Requested ", subreddit, topic);
    $.post("/process", {subreddit: subreddit, topic: topic})
        .done(function(data) {
            console.log(data);
            processData(data, series);
            callback();
        })
        .fail(function(err) {
            console.log("It faiiiiillleeeeeddd :(((");
        });
}

function myData(callback) {
    var javaSeries = [];
    var sqlSeries = [];
    var phpSeries = [];
    var rubySeries = [];
    getData("programming", "java", javaSeries, callback);
    getData("programming", "sql", sqlSeries, callback);
    getData("programming", "php", phpSeries, callback);
    getData("programming", "ruby", rubySeries, callback);
    return [{
        key: "Java",
        values: javaSeries,
        color: "#0000ff"
    }, {
        key: "SQL",
        values: sqlSeries,
        color: "#ff0000"
    }, {
        key: "PHP",
        values: phpSeries,
        color: "#00ff00"
    }, {
        key: "Ruby",
        values: rubySeries,
        color: "#000000"
    }];
}
nv.addGraph(function() {
    var chart = nv.models.lineChart();

    chart.xAxis.axisLabel("Date (m/y)").tickFormat(function(d) {
        return d3.time.format("%m/%y")(new Date(d))
    });

    chart.yAxis
        .axisLabel("Y-axis Label")
        .tickFormat(d3.format("d"));

    //call chart.update() whenever we get new data.
    d3.select("svg")
        .datum(myData(function() {
            chart.update();
        }))
        .transition().duration(500).call(chart);

    nv.utils.windowResize(
        function() {
            chart.update();
        }
    );

    return chart;
});
