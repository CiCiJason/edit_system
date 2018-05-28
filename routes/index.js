var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { layout: null, 'admin': req.session.admin == 'true' });
});

router.get('/info', function(req, res, next) {

    res.render('info', { layout: null, 'admin': req.session.admin == 'true', 'username': req.session.username });
});


module.exports = router;