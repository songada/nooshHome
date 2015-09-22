/**
 * Created by Gavin Li on 9/21/2015.
 */
;define(function(require){
    /**
     * appView
     */
    var appView = Backbone.View.extend({
        template:$("#message-panel-tpl").html(),
        initialize:function(){
            this.render();
        },
        render:function(){
            this.$el.append(this.template);
        }
    });
    return {
        init:function(args){
            return new appView(args);
        }
    }
});