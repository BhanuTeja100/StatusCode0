const express = require('express');
const router = express.Router();

const {registerCompany, getAllCompanies} = require('../controllers/companyController');

const {isLoggedIn, customRole} = require('../middlewares/user');

// test route
router.route("/registercompanypage").get((req, res) => {
    res.render("companyregister");
});

// router.route("/signuppage").get((req, res) => {
//     res.render("signup");
// });

router.route('/:id/registercompany').post(isLoggedIn, customRole('admin'), registerCompany);
router.route('/:id/allcompanies').get(isLoggedIn, customRole('admin'), getAllCompanies);

module.exports = router;