const profile = require("../models/profile");

module.exports = function (app, profileModel) {
  app.get("/api/profiles", function (req, res) {
    profileModel.find(function (err, profiles) {
      if (err) return res.status(500).send({ error: "조회 실패!" });
      res.json(profiles);
    });
  });

  app.get("/api/profiles/:profile_id", function (req, res) {
    profileModel.findOne({_id: req.params.profile_id}, function(err, profile){
      if(err) return res.status(500).json({error: err});
      if(!profile) return res.status(404).json({error : 'profile not found'});
      res.josn(profile);
    });
  });

  app.post("/api/profiles", function (req, res) {
    const profile = new profileModel();
    profile.id = req.body.id;
    profile.name = req.body.name;
    profile.birth = {date: new Date(req.body.birth.date), place: req.body.birth.place};

    profile.save(function (err) {
      if (err) {
        console.log(err);
        res.json({ result: 0 });
        return;
      }
      res.json({ result: 1 });
    });
  });

  app.put("/api/profiles/:profile_id", function (req, res) {
    res.end();
  });

  app.delete("api/profiles/:profile_id", function (req, res) {
    res.end();
  });
};
