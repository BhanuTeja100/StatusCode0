const express = require('express');
const router = express.Router();

const {registerInstitute, getAllInstitues} = require('../controllers/institueController');

const {isLoggedIn, customRole} = require('../middlewares/user');

// test route
router.route("/registerinstitutepage").get((req, res) => {
    res.render("instituteregister");
});

router.route("/allinstitutesview").get((req, res) => {
    res.render("institutesview");
});

router.route('/registerinstitute').post(isLoggedIn, customRole('admin'), registerInstitute);
router.route('/allinstitutes').get(isLoggedIn, customRole('admin'), getAllInstitues);

module.exports = router;