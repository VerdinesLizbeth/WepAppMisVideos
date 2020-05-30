const router = require('express').Router();

const user_videoController = require('../controllers/user_lisvid');


router.get('/user_lisvid/:id', user_videoController.list);
router.get('/user', user_videoController.list_user);

router.get('/api/user_lisvid/:id', user_videoController.lists);
router.get('/api/user', user_videoController.apiuserlist);

module.exports = router;