const express = require("express");
const router = express.Router();
const User = require("../models/user");
const db = require("../config/database");

router.get("/", (req, res) => {
  db.query("select * from users")
    .then((results) => {
      res.json(results);
    })
    .catch((e) => {
      console.log("hata: " + e);
    });
});

module.exports = router;
