const router = require("express").Router();
const Profile = require("../models/profile");

router.get("/", (req, res) => {
  Profile.findAll()
    .then((profiles) => {
      if (!profiles.length)
        return res.status(404).send({
          err: "Profile not found",
        });
      res.send(`find successfully: ${profiles}`);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;