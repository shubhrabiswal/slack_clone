const express = require("express");
const User = require("../models/users.model");
// const requireLogin = require("../middleware/requireLogin");
const sharp = require("sharp");
const multer = require("multer");

const middleware = require("../common-middleware/index");
const userController = require("../controllers/users.controller");


const router = new express.Router();
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jped|png)$/)) {
      return cb(new Error("Please Upload a valid Image file"));
    }

    cb(undefined, true);
  }
});

router.get("/users/me", middleware.requireLogin, userController.userFetch);

router.delete("/users/me", middleware.requireLogin, userController.userDelete);

router.post(
  "/users/me/avatar",
  middleware.requireLogin,
  upload.single("avatar"),
  userController.AvatarUpload
);

router.delete("/users/me/avatar", middleware.requireLogin, userController.AvatarDelete);

router.get("/users/:id/avatar", userController.fetchAvatar);

module.exports = router;