const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/celebrity.js'); 

/* GET celebrities page */
router.get('/', (req, res, next) => {

  Celebrity.find({},null, {sort: { name: 1 }}).then(celebrities=>{

    res.render('celebrities/index', {celebrities});

  }).catch(err=>{

    console.error(err);
    next(err);
  })

  
});

module.exports = router;