const router = require("express").Router();
const validationRequest = require("../../../common/middleware/validationRequest");
const {
  getAllUsers,
  signUp,
  getUser,
  deleteUser,
  updateUser,
  signIn,
} = require("../controller/user.controller");
const { addUserSchema, signInSchema } = require("../joi/userValidation");

router.get("/users", getAllUsers); 
router.get("/user/:id", getUser);
router.post("/signUp", validationRequest(addUserSchema), signUp); 
router.post("/signIn", validationRequest(signInSchema), signIn); 
router.delete("/deleteUser/:_id", deleteUser);
router.patch("/updateUser/:id", updateUser);

module.exports = router;
