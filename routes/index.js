const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res) {
    let obj = {title: 'Главная страница'};
    const Model = mongoose.model('pic');

    Model.find().then(function(items) {
        Object.assign(obj, {items: items});
    res.render('pages/index', obj);
});

});

router.get('/blog', function(req, res) {
    let obj = {title: 'Blog'};
    const Model = mongoose.model('blog');

    Model.find().then(function(items) {
        Object.assign(obj, {items: items});
    res.render('pages/blog', obj);
});



});

router.get('/admin', function(req, res) {
    let obj = {title: 'Admin'};
    // const Model = mongoose.model('admin');

    res.render('pages/admin', obj);

    // Model.find().then(function(items) {
    //     Object.assign(obj, {items: items});
    //     res.render('pages/admin', obj);
    // });

});

module.exports = router;