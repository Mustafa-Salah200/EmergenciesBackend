const express = require("express");
const usersControllers = require("../controllers/usersControllers");

const router = express.Router();

router
  .route("/")
  .get(usersControllers.fetchUsers)
  .post(usersControllers.createUser);
router
  .route("/:id")
  .get(usersControllers.getUser)
  .delete(usersControllers.deleteUser)
  .patch(usersControllers.updateUser);
router.route("/login").post(usersControllers.login);


module.exports = router;
