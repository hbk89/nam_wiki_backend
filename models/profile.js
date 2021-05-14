const mongoose = require("mongoose");

// 스키마
const profileSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    photo: String,
    birth: {
      date: String,
      place: String,
    },
    nationality: String,
    body: {
      height: String,
      weight: String,
      bloodType: String,
    },
    family: [
      {
        relation: String,
        name: String,
      },
    ],
    education: {
      elementary: {
        name: String,
        status: String,
      },
      middle: {
        name: String,
        status: String,
      },
      high: {
        name: String,
        status: String,
      },
      university: {
        name: String,
        major: String,
        minor: String,
        status: String,
      },
    },
    military: {
      kind: String,
      status: String,
    },
    contact: {
      mail: String,
      mobile: String,
      etc: [
        {
          name: String,
        },
      ],
    },
  },
);

// 모델 API
const Profile = mongoose.model('Profile', profileSchema);



// 인스턴스
const duck = new Profile({
    id: 1,
    name : '이덕호',
})

const chan = new Profile({
    id: 2,
    name : '최찬미',
})

module.exports = mongoose.model('Profile',profileSchema);