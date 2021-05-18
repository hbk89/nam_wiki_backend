//const profile = require("../models/profile");

const { response } = require("express");
const profile = require("../models/profile");

module.exports = function (app, profileModel) {
  // 전체 조회
  app.get("/api/profiles", function (req, res) {
    profileModel.find(function (err, profiles) {
      if (err) return res.status(500).send({ error: "조회 실패!" });
      res.json(profiles);
    });
  });

  // id 조회
  app.get("/api/profiles/:profile_id", function (req, res) {
    profileModel.findOne({_id: req.params.profile_id}, function(err, profile){
      if(err) return res.status(500).json({error: err});
      if(!profile) return res.status(404).json({error : '이 id의 프로필은 없어!'});
      res.json(profile);
    });
  });

  // 이름 조회
  app.get("/api/profiles/name/:profile_name", function(req, res){
    profileModel.find({name: req.params.profile_name}, function(err, profiles){
      if(err) return res.status(500).json({error: err});
      if(profiles.length === 0) return res.status(404).json({error: '이 name의 프로필은 없어!'});
      res.json(profiles);
    })
  })
  
  // 프로필 생성
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

  // 프로필 업데이트 (검색)
  // app.put("/api/profiles/:profile_id", function (req, res) {
  //   profileModel.findById(req.params.profile_id, function(err, profile){
  //     if(err) return res.status(500).json({error: '디비 실패'});
  //     if(!profile) return res.status(404).json({error: '없는데요?'});

  //     if(req.body.name) profile.name = req.body.name;
  //     if(req.body.birth.date) profile.birth.date = req.body.birth.date;
  //     if(req.body.birth.place) profile.birth.place = req.body.birth.place;

  //     profile.save(function (err) {
  //       if(err) res.status(500).json({error: "업데이트 실패"});
  //       res.json({message: "업데이트 완료!"});
  //     })
  //   })
  // });

  //프로필 업데이트 (검색없이)
  app.put("/api/profiles/:profile_id", function (req, res){
    profileModel.update({_id: req.params.profile_id}, {$set: req.body},function(err, output){
      if(err) res.status(500).json("디비 실패");
      console.log(output);
      if(!output.n) return res.status(404).json("없는데요?");
      res.json({message: "업데이트 완료!"});
    })
  })

  app.delete("/api/profiles/:profile_id", function (req, res) {
    // remove(deprecated) -> deleteOne, deleteMany
    profileModel.deleteOne({ _id: req.params.profile_id }, function (err, output) {
      if (err) res.status(500).json("디비 실패");

      /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
      if(!output.result.n) return res.status(404).json({ error: "book not found" });
      res.json({ message: "book deleted" });
      */
     
      res.status(204).end();
    });
  });
};
