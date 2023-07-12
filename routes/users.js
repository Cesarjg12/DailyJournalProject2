var express = require('express');
var router = express.Router();

const journalCtrl = require('../controllers/journal');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/', journalCtrl.index);
router.get('/new', ensureLoggedIn, journalCtrl.new);
router.get('/:id', journalCtrl.show);
router.post('/', ensureLoggedIn, journalCtrl.create);

module.exports = router;