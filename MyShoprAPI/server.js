'use strict';

const uri = "mongodb+srv://dbAdmin:admin@cluster0-bwtlq.gcp.mongodb.net/MyShopr?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
// const userRouter = require('./routes/user.js');
// const recipesRouter = require('./routes/recipes.js');
const app = express();
const router = express.Router();

mongoose.Promise = global.Promise;

const PORT = (process.env.PORT || 8081)

// Model Imports
var EnvStatus = require('./models/envStatusModel.js')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Route Imports
var envStatusRoute = require('./routes/envStatusRoute.js');
app.use(envStatusRoute);
var storesRoute = require('./routes/storesRoute.js');
app.use(storesRoute);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("mongo connected");
}).catch(err => {
    console.log(err);
});

var db = mongoose.connection;

db.once('open', function (ref) {
    console.log('Connected to mongo server.');
    //trying to get collection names
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        if (err) {
            console.error('[List DB Collections Error]: ' + err);
        }
        var DB_Collection_Names = [];
        names.forEach((collection) => {
            DB_Collection_Names.push(collection.name);
        });
        console.info('[Collections]: ' + DB_Collection_Names);
    });
});

app.listen(PORT, () => {
    console.log('API Listening on ' + PORT);
});