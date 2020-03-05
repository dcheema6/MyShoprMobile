const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const itemsRouter = require('./routes/items.js');
const userRouter = require('./routes/user.js');
const recipesRouter = require('./routes/recipes.js');

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb+srv://dbAdmin:admin@cluster0-bwtlq.gcp.mongodb.net/MyShopr?retryWrites=true&w=majority"

// Route Imports
app.use('/items', itemsRouter)
app.use('/recipes', recipesRouter)
app.use('/user', userRouter)

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("mongo connected")
}).catch(err => {
    console.log(err);
});

const PORT = (process.env.PORT || 8080)

app.listen(PORT, () => {
    console.log('API Listening on ' + PORT)
    
});