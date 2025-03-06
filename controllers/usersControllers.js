const User = require("../models/user");

async function findUserByNameOrEmail(query) {
  try {
    const user = await User.findOne({
      $or: [{ name: query.name }, { email: query.email }],
    });
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    return null;
  }
}
const fetchUsers = (req, res) => {
  User.find()
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

const createUser = (req, res) => {
  findUserByNameOrEmail(req.body).then((user) => {
    if (user) {
      res.status(404).json({
        status: "fail",
        message: `try to use another ${
          user.name === req.body.name ? "name" : "email"
        }`,
      });
    } else {
      const user = new User(req.body);
      user
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
    }
  });
};
const updateUser = async (req, res) => {
  const id = req.params.id;

  const getUsers = (await User.find()).filter((user) => user.id !== id);

  // getUsers.map((ele) => {
  //   if (ele.email === req.body.email) {
  //     res.status(404).json({
  //       status: "fail",
  //       message: `try to use another email`,
  //     });
  //   } else if (ele.name === req.body.name) {
  //     res.status(404).json({
  //       status: "fail",
  //       message: `try to use another name`,
  //     });
  //   }
  // });
  User.findByIdAndUpdate(id, req.body)
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
        message: err,
      });
    });
};
const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  User.findOne({ email: email, password: password })
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
const getUser = async (req, res) => {
  const id = req.params.id;
  if (id === "top") {
    let query = await User.find();
    query = await query
      .sort((a, b) => b.point - a.point)
      .map((ele) => {
        return {
          name: ele.name,
          image: `http://localhost:4000/images/${ele._id}/${ele.image}`,
          point: ele.point,
        };
      });
    res.status(200).json({
      status: "success",
      data: query,
    });
  } else {
    User.findById(id)
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
  }
};
const deleteUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
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
  fetchUsers,
  createUser,
  updateUser,
  getUser,
  deleteUser,
  login,
};
