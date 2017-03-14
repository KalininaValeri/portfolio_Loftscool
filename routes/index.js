const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res) {
    let obj = {title: 'Портфолио'};
    res.render('pages/index', obj);
    // const Model = mongoose.model('pic');
    //
    // Model.find().then(function(items) {
    //     Object.assign(obj, {items: items});
    // res.render('pages/index', obj);
// });

});

// router.get('/work', function(req, res) {
//     let obj = {title: 'Мои работы'};
//     res.render('pages/work', obj);
// });

router.get('/about', function(req, res) {
    let obj = {title: 'Мои работы'};
    const Model = mongoose.model('skills');
    Model.find().then(function (items) {

        Object.assign(obj, {items: items[items.length - 1]});
        res.render('pages/about', obj);
        console.log(obj);
    });
});

router.get('/blog', function(req, res) {
    let obj = {title: 'Блог'};
    const Model = mongoose.model('blog');
    Model.find().then(function (items) {
        Object.assign(obj, {items: items});
        res.render('pages/blog', obj);
    });
});

// router.get('/blog', function(req, res) {
//     let obj = {title: 'Blog'};
//     const Model = mongoose.model('blog');
//
//     Model.find().then(function(items) {
//         Object.assign(obj, {items: items});
//     res.render('pages/blog', obj);
// });



// });

module.exports = router;