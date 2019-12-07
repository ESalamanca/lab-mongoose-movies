const express=require('express');
const router=express.Router();

const Movie = require('../models/movie.js');
const Celebrity=require('../models/celebrity.js');

router.get('/new', (req,res,next)=>{
  //need to fetch the celebrities in our dB in order to give choice for casting of new movie
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
  //Creation of new movie in DB
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

router.post('/:movie_id/delete', (req,res,next)=>{
  Movie.findByIdAndDelete(req.params.movie_id).then(()=>{
    res.redirect('/movies');
  }).catch(err=>{
    console.error(err);
    next(err);
  })
});

router.get('/:movie_id/edit', (req,res,next)=>{
  //Retrieve the movie information 
  Movie.findById(req.params.movie_id).populate('cast').then(movie=>{
    Celebrity.find().then(celebrities =>{
      const newCelebs = celebrities.map(celeb => ({
        id: celeb._id,
        name: celeb.name,
        inMovie: false,
      }));
      movie.cast=movie.cast.map(celeb=>{return celeb._id});
      newCelebs.forEach(celeb=>{
        if (movie.cast.indexOf(celeb.id)>-1) {
          celeb.inMovie=true;
        }
      })

      res.render('movies/edit', {
        movie: movie,
        newCelebs: newCelebs
      });

      //res.send({movie,newCelebs});

    }).catch(err=>{
      console.error(err);
      next(err);
    });    
  }).catch(err=>{
    console.error(err);
    next(err);
  });
});

router.post('/:movie_id', (req,res,next)=>{
  const {title, genre, plot, cast}=req.body;
  Movie.updateOne({_id: req.params.movie_id}, {$set:{
    title,
    genre,
    plot,
    cast
  }}).then(
    res.redirect(`/movies/${req.params.movie_id}`)

  ).catch(err=>{
    console.error(err);
    next(err);
  })
});

router.get('/:movie_id', (req,res,next)=>{
  Movie.findById(req.params.movie_id)
    .populate('cast')
    .then(movie=>{
      res.render('movies/show',{movie});
    })
    .catch(err=>{
      console.error(err);
      next(err);
    });
});

module.exports=router; 