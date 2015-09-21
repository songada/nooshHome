/**
 * Created by Gavin Li on 9/21/2015.
 */
;define(function(require){
    //Panel Component Object Model,COM
    var panelCOM = require("common/panel");
    /**
     * panelList
     */
    var PanelList = Backbone.Collection.extend({
        model:panelCOM.Panel,
        url:"api/panels",
        parse: function(rep) {
            var panels = rep.result.panels.slice(0);
            panels.sort(function(a,b){return a.order - b.order});
            return  _.filter(panels,function(panel){return panel.visible});
        }
    });
    /**
     * mainView
     */
    var mainView = Backbone.View.extend({
        initialize:function(){
            this.panelList = new PanelList();
            this.panelList.bind("add",this.addOnePanel,this);
            this.panelList.bind("sync",this.makeSortable,this);
            this.panelList.fetch();
        },
        addOnePanel: function(panel){
            var panelView = new panelCOM.PanelView({
                model:panel
            });
            this.$el.append(panelView.el);
        },
        makeSortable:function(){
            var _this = this,
                panelList = this.panelList;
            this.$(".panel-title").disableSelection();
            this.$el.sortable({
                handle: ".panel-title",
                helper: "clone",
               revert: true,
                stop:function(){
                    _.delay(function(){
                        _this.$(".panel:visible").each(function(index,panelEl){
                           var panelId =  $(panelEl).attr("panelid") * 1;
                            var panelFind = panelList.get(panelId);
                            panelFind && panelFind.set("order",index + 1) && panelFind.hasChanged("order") && panelFind.save() ;
                        });
                    },300);

                }
            });
        }
    });
    return {
        init:function(args){
            return new mainView({
                el:$("#noosh-home-container")
            });
        }
    }
});