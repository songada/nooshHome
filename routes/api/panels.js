/**
 * Created by Gavin Li on 9/21/2015.
 */
var express = require('express');
var router = express.Router();
var _ = require("lodash");
var database = require('../../database');

router.route('/panels')
    .get(function(req, res) {
        res.json({result:database,statusCode:1});
    });

router.route('/panels/:panel_id')
    .get(function(req, res) {
        var
            panel_id = req.params.panel_id,
            findPanel;
        findPanel = _.find(database.panels,function(panel){
            return panel.id == panel_id*1
        });
        if(findPanel){
            res.json({result:findPanel,statusCode:1});
        }else{
            res.json({message:"No panel found",statusCode:0});
        }
    })
    .put(function(req, res) {
        var
            panel_id = req.params.panel_id,
            newObj = req.body,
            findPanel;
        findPanel = _.find(database.panels,function(panel){
            return panel.id == panel_id*1
        });
        _.extend(findPanel,newObj);
        res.json({ message: 'panel updated!' ,statusCode:1});
    });


module.exports = router;
