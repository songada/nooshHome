/**
 * Created by Gavin Li on 9/21/2015.
 */
;define(function(require){

    /**
     * appView
     */
    var appView = Backbone.View.extend({
        initialize:function(){
            google.setOnLoadCallback($.proxy(this.drawChart,this));
            this.render();
        },
        render:function(){
            this.$el.append("<div style='height: 300px' class='chart-cot'></div>");
        },
        drawChart: function(){
            var data = google.visualization.arrayToDataTable([
                ['Project Status', 'Number'],
                ['New',     11],
                ['In Estimation',      2],
                ['Quoted',  2],
                ['Ordered', 2],
                ['Completed',    7]
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
            chart.draw(data, options);
        }
    });
    return {
        init:function(args){
            return new appView(args);
        }
    }
});