const mongoose = require("mongoose");
const schema = mongoose.Schema;

const emergencySchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    responders: {
      type: Array,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
    location: {
      type: Array,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Emergency = mongoose.model("emergency", emergencySchema);
module.exports = Emergency;

// const ob = {
//   "id": 3,
//   "userId" : "31235w3c244",
//   "title": "Woman in Labour, Kaciciru",
//   "Category": "fire",
//   "createAt": "2020-12-29",
//   "level": "medium",
//   "description": "Large fire reported in a residential building.Multiple units affected.Immediate assistance required.",
//   "location": "Gisozi, Ruhango Market",
//   "time": "1:45pm",
//   "responders": [
//     { "name": "Winny", "type": "En route to the scene" },
//     { "name": "Mustafa", "type": "At the scene" },
//     { "name": "Musa", "type": "At the scene" }
//   ],
//   "type": "active",
//   "images": [],
//   "createdBy": "Willam Thomas"
// }