const express = require("express");
const { getAwareness, getAboutUs } = require("../controllers/infocontroller");

const router = express.Router();

router.get("/awareness", getAwareness);
router.get("/about", getAboutUs);

module.exports = router;
