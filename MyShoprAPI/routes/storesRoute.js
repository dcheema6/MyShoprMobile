var express = require('express');
var router = express.Router();
var Stores = require('../models/storeModel.js');
var mongoose = require('mongoose');

router.route('/stores')
    .get(async function (req, res) {
        Stores.find( {} ).then(async function(updatedDoc) {
            if (updatedDoc) {
                console.log('[Updated Doc]: ' + updatedDoc);
                res.send({"stores": updatedDoc})
            }
        }).catch(err => {
            console.error(err);
        });

    });

    router.route('/stores/:storeId')
        .get(async function (req, res) {
            Stores.findOne( {"storeId": req.params.storeId} ).then(async function(updatedDoc) {
                if (updatedDoc) {
                    console.log('[Updated Doc]: ' + updatedDoc);
                    res.send({"stores": updatedDoc})
                }
            }).catch(err => {
                console.error(err);
            })
        })

module.exports = router;