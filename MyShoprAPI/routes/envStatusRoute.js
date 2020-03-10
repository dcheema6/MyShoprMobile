var express = require('express');
var router = express.Router();
var EnvStatus = require('../models/envStatusModel.js');
var mongoose = require('mongoose');

router.route('/env_status')
    .get(async function (req, res) {
        EnvStatus.find( {} ).then(async function(updatedDoc) {
            if (updatedDoc) {
                if(mongoose.connection){
                    updatedDoc[0].isMongoConnected = true;
                }
                updatedDoc[0].isMongoRunning = true; // Set to false when we shut down mongo - will be manual
                updatedDoc[0].isAPIRunning = false; // If this is reached, the API is the resource handling this request
                console.log('[Updated Doc]: ' + updatedDoc); // Log the updated health document
                return await updatedDoc[0].save(); //Save the document back to the database
            }
        }).catch(err => {
            console.error(err);
        }).then((doc) => {
            res.send({ "[Environment]": "Successfully Updated Environment Statuses",
                        "[DOC]": doc[0] });
        });

    });

module.exports = router;