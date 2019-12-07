
const mongoose=require('mongoose'); 
const Celebrity= require('../models/celebrity.js');

const dbName="lab-mongoose-movies";
mongoose.connect(`mongodb://localhost/${dbName}`).catch(err=>{console.error(err);});

const celebrities = [
  {
  name: 'Natalie Portman', 
  occupation: 'Natalie Portman is an actress and filmmaker with dual Israeli and American citizenship.',
  catchPhrase: 'Smart women love smart men more than smart men love smart women'
  },
  {
  name: 'Aretha Franklin', 
  occupation: 'Aretha Franklin was an American singer, songwriter, pianist, and civil rights activist.',
  catchPhrase: "Don't say Aretha is making a comeback, because I've never been away!"
  },
  {
  name: 'Dongni Hou', 
  occupation: 'Dongni Hou is chinese a painter living in Paris',
  catchPhrase: "Feelings that come back are feelings that never left"
  }
]; 

Celebrity.create(celebrities).then(celebrities=>{
  
  console.log(`Created ${celebrities.length} celebrities`); 
  mongoose.connection.close();

}).catch(err=>{console.error(err)});