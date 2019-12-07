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
})

module.exports=router; 