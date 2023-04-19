const { Schema, model } = require("mongoose");

const savedContentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    yearOfRelease: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    contentId: {
        type: String,
        required: true,
    },
    userId: {
        // @TODO: add User model Reference here -- So that we can get the saved content of a particular user
        type: String,
        required: true,
    }
},
    // this will add createdAt and updatedAt fields to the schema
    { timestamps: true }
);

const Content = model("SavedContent", savedContentSchema);
module.exports = Content;
