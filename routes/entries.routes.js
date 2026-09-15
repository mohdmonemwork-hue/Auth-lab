const router = require("express").Router();
const isSignedIn = require("../middleware/is-signed-in");
const Entry = require("../models/Entry.js");

router.get("/new", isSignedIn, (req, res) => {
  res.render("entries/new.ejs");
});

router.post("/new", isSignedIn, async (req, res) => {
  req.body.isPublic = Boolean(req.body.isPublic);
  req.body.owner = req.session.user._id;
  const createdEntry = await Entry.create({
    title: req.body.title,
    entryBody: req.body.entryBody,
    isPublic: req.body.isPublic,
    owner: req.body.owner,
  });
  res.redirect("/entries");
});

router.get("/all-entries", async (req, res) => {
  const entries = await Entry.find({ isPublic: true });
  res.render("entries/all-entries.ejs", { entries });
});

router.get("/my-entries", isSignedIn, async (req, res) => {
  const entries = await Entry.find({ owner: req.session.user._id });
  res.render("entries/my-entries.ejs", { entries });
});

module.exports = router;
