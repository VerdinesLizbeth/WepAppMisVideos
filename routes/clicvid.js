const router = require('express').Router();

const videoController = require('../controllers/clicvideo');
const { isLoggedIn } = require('../vid/auth');
const pool = require('../database');


router.get('/', isLoggedIn, videoController.list);


router.get('/add', (req, res) => {
    pool.query('SELECT * FROM plataforma ', (err, red) => {
        res.render('webvideos/add', {
            red: red
        });
    });
});
router.post('/add', videoController.save);
router.get('/update/:id', videoController.edit);
router.post('/update/:id', videoController.update);
router.get('/delete/:id', videoController.delete);

//---------------------------------------------------------------------
router.get('/api', isLoggedIn, videoController.listapi);


router.get('/api/add', (req, res) => {
    pool.query('SELECT * FROM plataforma ', (err, red) => {
        res.json({
            red: red
        });
    });
});
router.post('/api/add', videoController.saveapi);
router.get('/api/update/:id', videoController.editapi);
router.post('/api/update/:id', videoController.updateapi);
router.get('/api/delete/:id', videoController.deleteapi);



module.exports = router;