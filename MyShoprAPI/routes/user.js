const express = require('express')
const app = express.Router()
const user = require('../models/userModel')

// Get all subscribers
app.get('/', (req,res) => {
    const allUsers = user.find({'email': 'user@mdmj.com '}, function(err, doc) {
        if (doc) {
            res.send(doc);
        }
    }).catch(err => {
        if(err) {
            throw err;
        }
    });
});


module.exports = app;