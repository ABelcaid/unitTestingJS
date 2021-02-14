const express = require('express');
const Agence = require('../models/agence.model');
const router = express.Router();




router.get('/', (req,res) =>{
  
  Agence.find()
  .then((Agence) => res.json(Agence))
  .catch((err) => res.status(400).json("Error :" + err));

});




router.route("/add").post((req, res) => {
  
  const name = req.body.name;
  const city = req.body.city;
  
 


    // Validate Request
    if(!name || !city) {
      return res.status(400).send({
          message: "fildes content can not be empty"
      });
  }

   
  
    const AgencePush = new Agence({
      
      name,
      city
     
    });
  
    AgencePush
      .save()
      .then((data) => {
        res.send(data);
        res.json("Agence successfully added")
        
      }).catch((err) =>  res.status(400).json("Error :" + err));
     
  });



router.route("/update/:id").put((req, res) => {


  const name = req.body.name;

  const city = req.body.city;
  



  // Validate Request
  if(!name || !city) {
    return res.status(400).send({
        message: "filde content can not be empty"
    });
}

    // Find  and update it with the request body

    Agence.findByIdAndUpdate(req.params.id,{
      name: name,
      city: city,
     

    },{new: true})

    .then(Agence => {
      if(!Agence) {

        return res.status(404).send({
          message: "Agence not found with id " + req.params._id
      });

      }
      res.send(Agence);
    }).catch(err => {

      if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Agence not found with id " + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Error updating Agence with id " + req.params.id
    });

    })


})



router.route("/delete/:id").delete((req, res) => {

Agence.findByIdAndRemove(req.params.id)
.then(Agence=> {
  if (!Agence) {

    return res.status(404).send({
      message : "Agence not found with id " + req.params.id
    });
    
  }
  res.send({
    message : "Agence deleted successfully !" });
}).catch(err =>{
  if (err.kind === 'ObjectId' || err.name === 'NotFound') {

    return res.status(404).send({
      message : 'Agence not found with id ' + req.params.id
    });
    
  }
  return res.status(404).send({
    message : 'Could not delete note with id ' + req.params.id
  });
})
    



  
 
})



  


module.exports = router;