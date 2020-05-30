const router = require('express').Router();

const videosController = require('../controllers/index');


router.get('/', videosController.listindex);
router.get('/info/:id', videosController.info);
router.post('/info/:id', videosController.info);
router.post('/results', videosController.results);
router.get('/results', (req, res) => {
    res.render('results');
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;