/**
 * Created by Gavin Li on 9/21/2015.
 */
;define(function(){
    var nh = this.nh;
    /**
     * Panel
     */
    var Panel = Backbone.Model.extend({
        urlRoot:"api/panels",
        initialize:function(){
            //this.bind("change",this.save,this);
        }
    });
    /**
     * PanelView
     */
    var PanelView = Backbone.View.extend({
        className:"panel-wrap",
        template: _.template($("#common-panel-tpl").html()),
        //todo
        events:{
            "click .remove-js":"remove"
        },
        initialize:function(){
            this.model.view = this;
            this.render();
            this.initLoadSubModule();
        },
        render:function(){
            this.$el.append(this.template(this.model.toJSON()));
            this.setPanelSize();
        },
        setPanelSize: function(){
            var size = this.model.get("size") || "mid";
            this.$el.addClass(nh.panelSize2Class[size]);
        },
        initLoadSubModule: function(){
            var
                model = this.model,
                _this = this;
            nh.loadModule({
                module:"modules/" + model.get("moduleName"),
                arguments:{
                    el:this.$(".panel-body")
                }
            }).then(function(subModule,subApp){
                _this.subApp = subApp;
            });
        },
        remove: function(){
            this.$el.remove();
        }
    });
    return {
        Panel:Panel,
        PanelView:PanelView
    }
});