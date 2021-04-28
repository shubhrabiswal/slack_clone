const express = require("express");
const User = require("../models/users.model");
const sharp = require("sharp")

exports.userFetch = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).send(req.user);
    } catch (error) {
      res.status(500).send(error);
    }
  };


exports.userDelete = async (req, res) => {
    try {
      await req.user.remove();
      res.send(req.user);
    } catch (error) {
      res.send(error).status(500);
    }
  };

exports.AvatarUpload = async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  };

exports.AvatarDelete = async (req, res) => {
    try {
      req.user.avatar = undefined;
  
      await req.user.save();
      res.send(req.user);
    } catch (error) {
      res.send(error).status(500);
    }
  };

exports.fetchAvatar = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user || !user.avatar) {
        throw new Error();
      }
  
      res.set("Content-type", "image/png");
      res.send(user.avatar);
    } catch (error) {
      res.status(404).send();
    }
};
