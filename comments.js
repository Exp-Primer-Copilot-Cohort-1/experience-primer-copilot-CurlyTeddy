// Create web server
var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Get all comments
router.get('/', function (req, res) {
    db.query('SELECT * FROM comments', function (err, rows, fields) {
        if (err) throw err
        res.send(rows);
    })
})

// Get a comment
router.get('/:id', function (req, res) {
    db.query('SELECT * FROM comments WHERE id = ?', [req.params.id], function (err, rows, fields) {
        if (err) throw err
        res.send(rows);
    })
})

// Add a comment
router.post('/', urlencodedParser, function (req, res) {
    db.query('INSERT INTO comments (comment) VALUES (?)', [req.body.comment], function (err, rows, fields) {
        if (err) throw err
        res.send(rows);
    })
})

// Update a comment
router.put('/:id', urlencodedParser, function (req, res) {
    db.query('UPDATE comments SET comment = ? WHERE id = ?', [req.body.comment, req.params.id], function (err, rows, fields) {
        if (err) throw err
        res.send(rows);
    })
})

// Delete a comment
router.delete('/:id', function (req, res) {
    db.query('DELETE FROM comments WHERE id = ?', [req.params.id], function (err, rows, fields) {
        if (err) throw err
        res.send(rows);
    })
})

module.exports = router;