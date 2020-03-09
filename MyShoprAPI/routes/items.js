const express = require('express')
const router = express.Router()

// Get all subscribers
router.get('/', (req, res) => {
    res.send("Not_Implemented");
})

// Get one subscriber
router.get('/:id', (req, res) => {
    res.send("Not_Implemented");
})

// Create one subscriber
router.post('/', (req, res) => {
    res.send("Not_Implemented");
})

// Update one subscriber
router.patch('/:id', (req, res) => {
    res.send("Not_Implemented");
})

// Delete one subscriber
router.delete('/:id', (req, res) => {
    res.send("Not_Implemented");
})

module.exports = router