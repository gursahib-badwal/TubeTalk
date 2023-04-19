const express = require("express");
const router = express.Router();
require('dotenv').config();
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));

const BASE_URL = process.env.TMDB_URL;

router.get("/", async (req, res) => {
  const filter = req.url.split("?")[1] || "";
  const url = `${BASE_URL}/movie/popular?api_key=${
    process.env.TMDB_API_KEY
  }&language=en-US${filter ? "&" + filter : ""}`;
  console.log(url);
  try {
    const movies = await fetch(url);
    const moviesJson = await movies.json();
    res.status(200).json({
      movies: moviesJson,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/movie/:id", async (req, res) => {
  const url = `${BASE_URL}/movie/${req.params.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
    const castURL = `${BASE_URL}/movie/${req.params.id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
    try {
        const movies = await fetch(url);
        const cast = await fetch(castURL);
        const moviesJson = await movies.json();
        const castJson = await cast.json();
        moviesJson.cast = castJson.cast.slice(0, 10);
        moviesJson.crew = castJson.crew.slice(0, 10);
        res.status(200).json({
            movies: moviesJson
        });
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get("/popular/", async (req, res) => {
  const filter = req.url.split("?")[1] || "";
  const url = `${BASE_URL}/movie/top_rated?api_key=${
    process.env.TMDB_API_KEY
  }&language=en-US${filter ? "&" + filter : ""}`;
  try {
    const movies = await fetch(url);
    const moviesJson = await movies.json();
    res.status(200).json({
      movies: moviesJson,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/latest/", async (req, res) => {
  const filter = req.url.split('?')[1] || '';
    const url = `${BASE_URL}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US${filter ? '&' + filter : ''}`
    try {
        const movies = await fetch(url);
        const moviesJson = await movies.json();
        res.status(200).json({
            movies: moviesJson
        });
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get("/upcoming/", async (req, res) => {
  const filter = req.url.split('?')[1] || '';
    const url = `${BASE_URL}/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US${filter ? '&' + filter : ''}`
    try {
        const movies = await fetch(url);
        const moviesJson = await movies.json();
        res.status(200).json({
            movies: moviesJson
        });
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get("/search/", async (req, res) => {
  const filter = req.url.split('?')[1] || '';
  const url = `${BASE_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US${filter ? '&' + filter : ''}`
  try {
      const movies = await fetch(url);
      let moviesJson = await movies.json();
      res.status(200).json({
          movies: moviesJson
      });
  } catch (error) {
      res.status(500).json(error);
  }
});

router.get("/tv/",   async (req, res) => {
  const filter = req.url.split('?')[1] || '';
  const url = `${BASE_URL}/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US${filter ? '&' + filter : ''}`
  console.log('url: ', url);
  try {
      const tvShows = await fetch(url);
      const tvShowsJson = await tvShows.json();
      res.status(200).json({
          tvShows: tvShowsJson
      });
  } catch (error) {
      res.status(500).json(error);
  }
}
);
router.get("/tv/latest/",   async (req, res) => {
  const filter = req.url.split('?')[1] || '';
    const url = `${BASE_URL}/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&language=en-US${filter ? '&' + filter : ''}`
    console.log('url: ', url);
    try {
        const tvShows = await fetch(url);
        const tvShowsJson = await tvShows.json();
        res.status(200).json({
            tvShows: tvShowsJson
        });
    } catch (error) {
        res.status(500).json(error);
    }
}
);
router.get("/tv/popular/",   async (req, res) => {
  const filter = req.url.split('?')[1] || '';
  const url = `${BASE_URL}/tv/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US${filter ? '&' + filter : ''}`
  try {
      const tvShows = await fetch(url);
      const tvShowsJson = await tvShows.json();
      res.status(200).json({
          tvShows: tvShowsJson
      });
  } catch (error) {
      res.status(500).json(error);
  }
}
);
router.get("/tv/search/",   async (req, res) => {
  const filter = req.url.split('?')[1] || '';
  const url = `${BASE_URL}/search/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US${filter ? '&' + filter : ''}`
  console.log('url: ', url);
  try {
      const tvShows = await fetch(url);
      let tvShowsJson = await tvShows.json();
      res.status(200).json({
          tvShows: tvShowsJson
      });
  } catch (error) {
      res.status(500).json(error);
  }
}
);
router.get("/tv/upcoming/", async (req, res) => {
  const filter = req.url.split('?')[1] || '';
    const url = `${BASE_URL}/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&language=en-US${filter ? '&' + filter : ''}`
    console.log('url: ', url);
    try {
        const tvShows = await fetch(url);
        const tvShowsJson = await tvShows.json();
        res.status(200).json({
            tvShows: tvShowsJson
        });
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get("/tv/:id", async (req, res) => {
  const url = `${BASE_URL}/tv/${req.params.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  const castURL = `${BASE_URL}/tv/${req.params.id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  try {
      const tvShows = await fetch(url);
      const cast = await fetch(castURL);
      const tvShowsJson = await tvShows.json();
      const castJson = await cast.json();
      tvShowsJson.cast = castJson.cast.slice(0, 10); // get 10 cast members
      tvShowsJson.crew = castJson.crew.slice(0, 10);
      res.status(200).json({
          tvShows: tvShowsJson
      });
  } catch (error) {
      res.status(500).json(error);
  }
});

router.get("/genres", async (req, res) => {
  const url = `${BASE_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  try {
      const genres = await fetch(url);
      const genresJson = await genres.json();
      res.status(200).json({
          genres: genresJson
      });
  } catch (error) {
      res.status(500).json(error);
  }
});

module.exports = router;
// async (req, res) => {}