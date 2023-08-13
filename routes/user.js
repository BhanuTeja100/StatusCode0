const express = require('express');
const router = express.Router();

const {signup, login, logout} = require('../controllers/userController');

const {isLoggedIn} = require('../middlewares/user');

// test route
router.route("/loginpage").get((req, res) => {
    res.render("login");
});

router.route("/signuppage").get((req, res) => {
    res.render("signup");
});

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);

module.exports = router;