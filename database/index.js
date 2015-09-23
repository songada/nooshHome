/**
 * Created by Gavin Li on 9/21/2015.
 */
'use strict';
/**
 * Mockup Data
 * @type {{panels: *[]}}
 * {
            id:1001,
            order:1,
            type:"chart|list",
            moduleName:"projectChart",
            title:"Open Projects",
            size:"sm|md|lg" // sm 4 items in a line,md  2 items in a line ,lg  a item in a line
             visible:true|false,
             draggable:true|false,
             dataLimit:5 //-1 is show all ,this option is for type:list

        }
 */
module.exports = {
    panels:[
        {
            id:1001,
            order:1,
            type:"chart",
            moduleName:"openProjectChart",
            title:"Open Projects",
            size:"mid",
            visible:true,
            draggable:true
        },
        {
            id:1002,
            order:2,
            type:"chart",
            moduleName:"projectOwnerChart",
            title:"Projects by Owner",
            size:"mid",
            visible:true,
            draggable:true
        },
        {
            id:1003,
            order:3,
            type:"list",
            moduleName:"task",
            title:"Tasks",
            size:"mid",
            visible:true,
            draggable:true,
            dataLimit:5
        },
        {
            id:1004,
            order:4,
            type:"list",
            moduleName:"message",
            title:"Messages",
            size:"mid",
            visible:true,
            draggable:true,
            dataLimit:5
        },
        {
            id:1005,
            order:5,
            type:"list",
            moduleName:"hotProject",
            title:"Hot Projects",
            size:"lg",
            visible:true,
            draggable:true,
            dataLimit:5
        }
    ],
    //todo need to discuss
    layout:[
        [],
        []
    ]
};