const express = require('express');
const router = express.Router();
const article = require('../source/data/article.json');

/* GET home page. */
router.get('/', function (req, res) {
    let obj = {title: 'Главная страница'};
    res.render('pages/index', obj);
});

router.get('/blog', function (req, res) {
    let obj = {title: 'Blog'};
    Object.assign(obj, article);
    res.render('pages/blog', obj);
});

module.exports = router;