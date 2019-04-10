const express = require("express");
const router = new express.Router();
const User = require("../db/schema/user");
const authRouter = require("../auth/auth_router");

router.post("/v1/signin", async (req, res) => {
  const { name, password, email, birthDate } = req.body;

  let user = await User.findOne({ email: email });

  if (user) {
    console.log("error", "An user with this email already exists");
    return res.status(400).send();
  }

  user = new User({
    name: name,
    password: password,
    email: email,
    birthDate: birthDate
  });

  try {
    user.setNewToken();
    await user.save();

    res.status(201).send(user.getUserNoPass());
  } catch (err) {
    console.log("Signin error", err);
    res.status(400).send();
  }
});

router.post("/v1/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await User.findWithCredentials(email, password);

    user.setNewToken();

    await user.save();

    res.status(200).send(user.getUserNoPass());
  } catch (err) {
    console.log(err.message ? err.message : err);
    res.status(400).send();
  }
});

router.post("/v1/logout", authRouter.authenticate, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(tokenObj => {
      return tokenObj.token && tokenObj.token !== req.token;
    });
    req.user.tokens = authRouter.cleanExpiredTokens(req.user);
    await req.user.save();
    res.status(200).send(req.user.getUserNoPass());
  } catch (err) {
    console.log("logout error", err.message ? err.message : err);
    res.status(400).send();
  }
});

router.get("/v1/user", authRouter.authenticate, async (req, res) => {
  try {
    try {
      const user = req.user;
      res.status(200).send(user.getUserNoPass());
    } catch (err) {
      console.log(
        "An error occurred while searching by the the passed user.",
        err.message
      );
      res.status(400).send();
    }
  } catch (err) {
    res.status(401).send();
  }
});

router.patch("/v1/user", authRouter.authenticate, async (req, res) => {
  try {
    const updatableProps = ["name", "email", "password", "dateBirth"];
    let user = req.user;
    updatableProps.forEach(prop => {
      if (req.body[prop]) {
        user[prop] = req.body[prop];
      }
    });
    user = await user.save();
    res.status(200).send(user.getUserNoPass());
  } catch (err) {
    console.log(
      "An error occurred while searching by the the passed user.",
      err.message
    );
    res.status(400).send();
  }
});

module.exports = router;
