/**
 * Created by Gavin Li on 9/21/2015.
 */
;define(function(require){
    /**
     * appView
     */
    var appView = Backbone.View.extend({
        initialize:function(){
            this.render();
        },
        render:function(){
            this.$el.append("test--panel body");
        }
    });
    return {
        init:function(args){
            return new appView(args);
        }
    }
});