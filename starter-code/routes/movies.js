const express=require('express');
const router=express.Router();

const Movie = require('../models/movie.js');
const Celebrity=require('../models/celebrity.js');

router.get('/new', (req,res,next)=>{
  Celebrity.find().then(celebrities=>{
    res.render('movies/new', {celebrities});
  }).catch(err=>{
    console.log("Error while fetching Celebrities");
    console.error(err);
    next(err)
  })
  
}); 

router.post('/', (req,res,next)=>{
  const { title, genre, plot, cast }= req.body; 
  Movie.create({title,genre,plot,cast})
  .then(()=>{
    res.redirect('/movies');
  }).catch(err=>{
    console.error(err);
    next(err);
  })
});

router.get('/', (req,res,next)=>{
  Movie.find({},null,{sort:{name:1}}).then(movies=>{
    res.render('movies/index', {movies});
  }).catch(err=>{
    console.error(err);
    next(err);
  });
});

module.exports=router; 