const { Router } = require("express");
const router = Router();
const {
  userRegister,
  userLogin,
  logout_get,
  getUsers,
} = require("../controller/user");
const { requireAuth, checkUser } = require("../Middleware/requireAuth");

const posts = [
  { id: 1, title: "title 1", body: "body 1" },
  { id: 2, title: "title 2", body: "body 2" },
];

router.post("/check", checkUser);
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", logout_get);

router.get("/users", getUsers);

router.get("/posts", requireAuth, (req, res) => {
  res.json(posts);
});

module.exports = router;
