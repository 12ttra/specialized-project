const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const categorySchema = Schema({
  subCategoryIds: {
    type: Array,
    required: true,
  },
  cName: {
    type: String,
    required: true,
  },
  cDescription: {
    type: String,
    required: true,
  },
  cImage: {
    type: String,
  },
  cStatus: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    slug: "title",
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
