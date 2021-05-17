const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  id: Number,
  name: String,
  photo: String,
  birth: {
    date: Date,
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

});

module.exports = mongoose.model('profile', profileSchema);