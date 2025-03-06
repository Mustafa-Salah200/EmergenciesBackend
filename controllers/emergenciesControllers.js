const Emergency = require("../models/emergency");

const getTop = (req, res) => {
  Emergency.find(
    {},
    { projection: { _id: 0, category: 1 } }
  ).then((result) => {
    res.status(200).json({
      status: "success",
      length: result.length,
      data: result,
    });
  }).catch(err => console.log(err))

  // res.status(404).json({
  //   status: "success",
  //   data: "documents",
  // });
  // Emergency.find()
  //   .sort({ createdAt: -1 })
  //   .then((result) => {
  //     res.status(200).json({
  //       status: "success",
  //       length: result.length,
  //       data: result,
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(404).json({
  //       status: "fail",
  //       message: "result could not found",
  //     });
  //   });
};
const fetchEmergency = (req, res) => {
  Emergency.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.status(200).json({
        status: "success",
        length: result.length,
        data: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        status: "fail",
        message: "result could not found",
      });
    });
};

const createEmergency = (req, res) => {
  const emergency = new Emergency(req.body);
  emergency
    .save()
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    });
};
const updateEmergency = (req, res) => {
  const id = req.params.id;
  Emergency.findByIdAndUpdate(id, req.body)
    .then((result) => {
      const newOb = Object.assign(result, req.body);
      res.status(200).json({
        status: "success",
        data: newOb,
      });
    })
    .catch((err) => {
      res.status(404).json({
        status: "fail",
        message: "result could not be found",
      });
    });
};
const getEmergency = (req, res) => {
  const id = req.params.id;
  Emergency.findById(id)
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        status: "fail",
        message: "result could not be found",
      });
    });
};
const deleteEmergency = (req, res) => {
  const id = req.params.id;
  Emergency.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: "delete successfully",
      });
    })
    .catch((err) => {
      res.status(404).json({
        status: "fail",
        message: "delete failed",
      });
    });
};

module.exports = {
  fetchEmergency,
  createEmergency,
  updateEmergency,
  getEmergency,
  deleteEmergency,
  getTop,
};
