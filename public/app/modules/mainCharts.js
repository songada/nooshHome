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
            this.$el.append('<div class="panel-chart panel-one-third-area panel-chart1"></div><div class="panel-chart panel-one-third-area panel-chart2"></div><div class="panel-chart panel-one-third-area panel-chart3"></div>')
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
                    width: '85%',
                    height: '85%'
                }
            };

            var chart1 = new google.visualization.PieChart(this.$(".panel-chart1")[0]);
            chart1.draw(data, options);

            var chart2 = new google.visualization.PieChart(this.$(".panel-chart2")[0]);
            chart2.draw(data, options);

            var chart3 = new google.visualization.PieChart(this.$(".panel-chart3")[0]);
            chart3.draw(data, options);
        }
    });
    return {
        init:function(args){
            return new appView(args);
        }
    }
});