const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    entryBody: {
      type: String,
      maxLength: 350,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Entry = mongoose.model("Entry", EntrySchema);

module.exports = Entry;
