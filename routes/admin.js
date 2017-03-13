const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');

router.get('/admin', function(req, res) {
    let obj = {title: 'Blog'};
    const Model = mongoose.model('blog');

    Model.find().then(function(items) {
        Object.assign(obj, {items: items});
        res.render('pages/admin', obj);
    });

});

module.exports = router;
