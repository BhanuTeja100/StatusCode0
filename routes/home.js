const express = require('express');
const router = express.Router();

// test route
router.route("/home").get((req, res) => {
    res.render("home");
});

module.exports = router;