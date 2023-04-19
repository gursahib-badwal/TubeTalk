var express = require('express');
var router = express.Router();
var sample_movies = require('../data.js');
var asyncHandler = require('express-async-handler');
var MovieModel = require('../models/movies.model');


router.get("/seed",asyncHandler(
   async (req, res) => {
    const moviesCount = await MovieModel.countDocuments();
    if(moviesCount>0){
        res.send("Seed is already done!");
        return;
    }
    await MovieModel.create(sample_movies);
    res.send("Seed is Done!");
}
))

router.get("/",asyncHandler(
    async (req, res) => {
    const movies = await MovieModel.find();
    res.send(movies);
}
))

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const movies = await MovieModel.find({name: {$regex:searchRegex}})
    res.send(movies);
    }
))

router.get("/tags", asyncHandler(
    async (req, res) => {
      const tags = await MovieModel.aggregate([
        {
          $unwind:'$genre'
        },
        {
          $group:{
            _id: '$genre',
            count: {$sum: 1}
          }
        },
        {
          $project:{
            _id: 0,
            name:'$_id',
            count: '$count'
          }
        }
      ]).sort({count: -1});
  
      const all = {
        name : 'All',
        count: await MovieModel.countDocuments()
      }
  
      tags.unshift(all);
      res.send(tags);
    }
  ))
  

  router.get("/tag/:tagName",asyncHandler(
    async (req, res) => {
      const movies = await MovieModel.find({genre: req.params.tagName})
      res.send(movies);
    }
  ))

router.get("/:movieId", asyncHandler(
    async (req, res) => {
    const movie = await MovieModel.findById(req.params.movieId);
    res.send(movie);
    }
)) 

module.exports = router;