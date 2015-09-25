/**
 * Created by Gavin Li on 9/21/2015.
 */
;define(function(require){
    var ui = require("../common/ui");
    /**
     * appView
     */
    var appView = Backbone.View.extend({
        template:$("#message-panel-tpl").html(),
        events:{
            "click .glb-msg-reply-tgl":"showReplayBox"
        },
        initialize:function(){
            this.render();
        },
        render:function(){
            this.$el.append(this.template);
        },
        showReplayBox: function(e){

            var
                target = $(e.currentTarget),
                offset = target.offset(),
                _this = this;
            if(!this.dialog){
                this.dialog = new ui.Dialog({
                    title:"Replay",
                    content:"<div><textarea style='width:100%; ' cols='4' placeholder='Write Replay...'></textarea></div><div><button class='btn btn-primary' style='width: 100%'>Replay</button></div>",
                    create: function(){
                        this.$el.css({
                            width:"300px"
                        });
                    },
                    close: function(){
                        _this.dialog = null;
                    }
                })
            }
            this.dialog.setPosition(offset.left - 150 + target.width()/2, offset.top + target.height())
        }
    });
    return {
        init:function(args){
            return new appView(args);
        }
    }
});