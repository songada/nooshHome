/**
 * Created by Gavin Li on 9/21/2015.
 */
;
define(function (require) {
    /**
     * appView
     */
    var appView = Backbone.View.extend({
        initialize: function () {
            google.setOnLoadCallback($.proxy(this.drawChart,this));
            this.render();
        },
        render: function () {
            this.$el.append("<div style='height: 300px' class='chart-cot'></div>");
        },
        drawChart: function () {
            var data2 = google.visualization.arrayToDataTable([
                ['Project Owner', 'Number'],
                ['Yang',    3],
                ['Song',      2],
                ['Raymond',  2],
                ['Hung', 2]
            ]);

            var options = {
                colors: ['#325bad', '#517ACC', '#739cee', '#94bdff', '#9db9ef'],
                pieHole: 0.4,
                animation:{
                    duration: 1000,
                    easing: 'out'
                },
                chartArea: {
                    left: 10,
                    top: 10,
                    width: '90%',
                    height: '90%'
                }
            };


            var chart = new google.visualization.PieChart(this.$(".chart-cot")[0]);
            chart.draw(data2, options);
        }
    });
    return {
        init: function (args) {
            return new appView(args);
        }
    }
});