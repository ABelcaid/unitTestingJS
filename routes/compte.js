const express = require('express')
let Compte = require('../models/compte.model');
const router = express.Router();




router.get('/', (req,res) =>{
  
  Compte.find()
  .then((Compte) => res.json(Compte))
  .catch((err) => res.status(400).json("Error :" + err));

});




router.route("/add").post((req, res) => {
  
  
  
  const owner_id = req.body.owner_id;

  const agence_id = req.body.agence_id;
  
 


    // Validate Request
    if(!owner_id || !agence_id || !solde) {
      return res.status(400).send({
          message: "filde content can not be empty"
      });
  }

   
  
    const ComptePush = new Compte({
      
      owner_id,
      agence_id,
      solde
     
    });
  
    ComptePush
      .save()
      .then((data) => {
        res.send(data);
        res.json("Compte successfully added")
        
      }).catch((err) =>  res.status(400).json("Error :" + err));
     
  });



router.route("/update/:id").put((req, res) => {


  const owner_id = req.body.owner_id;

  const agence_id = req.body.agence_id;
  
  const solde = req.body.solde;


  // Validate Request
  if(!owner_id || !agence_id || !solde) {
    return res.status(400).send({
        message: "filde content can not be empty"
    });
}

    // Find  and update it with the request body

    Compte.findByIdAndUpdate(req.params.id,{
      owner_id: req.body.owner_id,
      agence_id: req.body.agence_id,
      solde: req.body.solde,

    },{new: true})

    .then(Compte => {
      if(!Compte) {

        return res.status(404).send({
          message: "Compte not found with id " + req.params._id
      });

      }
      res.send(Compte);
    }).catch(err => {

      if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Compte not found with id " + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Error updating Compte with id " + req.params.id
    });

    })


})



router.route("/delete/:id").delete((req, res) => {

Compte.findByIdAndRemove(req.params.id)
.then(Compte=> {
  if (!Compte) {

    return res.status(404).send({
      message : "Compte not found with id " + req.params.id
    });
    
  }
  res.send({
    message : "Compte deleted successfully !" });
}).catch(err =>{
  if (err.kind === 'ObjectId' || err.name === 'NotFound') {

    return res.status(404).send({
      message : 'Compte not found with id ' + req.params.id
    });
    
  }
  return res.status(404).send({
    message : 'Could not delete note with id ' + req.params.id
  });
})
    



  
 
})



  


module.exports = router;