/**
 * Created by Gavin.Li on 9/23/2015.
 */
/**
 * User: gavin
 * Date: 3/27/15
 */
;define(function(require){
    var
        Model = Backbone.Model,
        View = Backbone.View,
        Collection = Backbone.Collection,
        emptyFn = new Function();
    /**
     * DropdownMenu
     * new DropdownMenu({
     *      el:"",
     *      activeIndex:Number(),
     *      menuEl:$("#id")||"<ul>",
     *      subItemTpl:"<li>",
     *      subItems:["item text","item text"]||[$("<a href='http://www.noosh.com'></a>")],
     *      subEvents:[Function,Function]
     * });
     */
    var DropdownMenu = View.extend({
        events:{
            "click":"toggleShow",
            "click .menu-item":"activeItem"
        },
        initialize:function(){
            var options = this.options;
            this.activeIndex = options.activeIndex;
            this.subEvents = options.subEvents || [];
            this.renderMenuContainer();
            this.renderMenuItems();
            this.bindEvents();
        },
        renderMenuContainer: function(){
            var
                options = this.options,
                menuEl = options.menuEl || $('<ul class="grid-menu-list"></ul>');
            _.isElement(menuEl) && this.$el.append(menuEl);
            //Consider a string as class name
            _.isString(menuEl) && (menuEl = this.$(menuEl));
            this.menuEl = menuEl;
        },
        renderMenuItems: function(){
            var
                options = this.options,
            //list item template
                subItemTpl = options.subItemTpl || "<li class='menu-item'></li>",
            //subItems is an array like ["text","text"]
                subItems = options.subItems;
            if(subItems){
                _.each(
                    subItems,
                    $.proxy(
                        function(item,index){
                            this.menuEl.append($(subItemTpl).append(item).attr("index",index));
                        },
                        this
                    )
                );
            }else{
                //Add default class name
                this.menuEl.children().each(function(index){
                    $(this).addClass("menu-item").attr("index",index);
                });
            }
            //Initialize active item
            this.activeIndex !== undefined && $(this.menuEl.children().get(this.activeIndex)).addClass("active");
        },
        toggleShow: function(e){
            this.menuEl.fadeToggle();
            e.stopPropagation();
        },
        bindEvents: function(){
            $(document).click($.proxy(this.hide,this));
        },
        hide: function(){
            this.menuEl.fadeOut();
        },
        activeItem: function(e){
            e.stopPropagation();
            var
                index = $(e.currentTarget).attr("index")| 0,
                fn;
            if(index === this.activeIndex) return
            fn = this.subEvents[index];
            _.isFunction(fn) && fn();
            this.hide();
            if(this.activeIndex !== undefined){
                $(e.currentTarget).addClass("active");
                $(this.menuEl.children().get(this.activeIndex)).removeClass("active");
                this.activeIndex = index;
            }
        }
    });

    /**
     * Dialog
     */
    var Dialog = View.extend({
        template: _.template($("#common-dialog-tpl").html()),
        events:{
            "click":function(e){
                e.stopPropagation();
            },
            "click .close":"close"
        },
        defaultOptions:{
            title:"title",
            content:"",
            create:emptyFn,
            close:emptyFn,
            hasMark:false,
            buttons:null
        },
        defaultButtons:{
            "Close":{
                className:"btn-default",
                callback:emptyFn
            },
            "Ok":{
                className:"btn-primary",
                callback:emptyFn
            }
        },
        initialize: function(options){
            this.options = $.extend(true,this.defaultOptions,options);
            this.render();
        },
        render: function(){
            var
                options = this.options,
                $box = $(this.template(this.options));
            this.setElement($box);
            this.mark = $("<div class='modal-backdrop fade in'>");
            this.$el.appendTo(document.body);
            options.hasMark && this.mark.appendTo(document.body);
            this.$el.css("zIndex",10000);
            options.create && options.create.call(this);
        },
        close: function(){
            this.$el.remove();
            this.mark.remove();
            this.options.close && this.options.close.call(this);
        },
        setPosition: function(x,y){
            this.$el.css({
                left:x + "px",
                top:y + "px"
            });
        }
    });


    return {
        DropdownMenu: DropdownMenu,
        Dialog: Dialog
    }
});