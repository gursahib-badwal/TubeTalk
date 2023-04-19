const mongoose = require('mongoose');


const MovieSchema = new mongoose.Schema(
     {
        name: {type: String, required: true},
        stars: {type: Number, required: true},
        favorite: {type: Boolean, default: false},
        imageUrl: {type: String, required: true},
        genre: {type: [String]}
     }, {
        toJSON: {
            virtuals:true
        },
        toObject: {
            virtuals:true
        },
        timestamps:true
     }
);

const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel;