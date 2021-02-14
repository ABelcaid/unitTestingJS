const express = require('express')
let GabOperation = require('../models/gabOperation.model');
const router = express.Router();




router.get('/', (req,res) =>{
  
  GabOperation.find()
  .then((GabOperation) => res.json(GabOperation))
  .catch((err) => res.status(400).json("Error :" + err));

});





router.route("/add").post((req, res) => {
  
  const creditCard_id = req.body.creditCard_id;

  const money_requested = req.body.money_requested;
  
 


    // Validate Request
    if(!creditCard_id || !money_requested ) {
      return res.status(400).send({
          message: "filde content can not be empty"
      });
  }

   
  
    const GabOperationPush = new GabOperation({
      
      creditCard_id,
      money_requested
     
    });
  
    GabOperationPush
      .save()
      .then((data) => {
        res.send(data);
        res.json("GabOperation successfully added")
        
      }).catch((err) =>  res.status(400).json("Error :" + err));
     
  });



router.route("/update/:id").put((req, res) => {


  const creditCard_id = req.body.creditCard_id;

  const money_requested = req.body.money_requested;
  



  // Validate Request
  if(!creditCard_id || !money_requested) {
    return res.status(400).send({
        message: "filde content can not be empty"
    });
}

    // Find  and update it with the request body

    GabOperation.findByIdAndUpdate(req.params.id,{
      creditCard_id: req.body.creditCard_id,
      money_requested: req.body.money_requested

    },{new: true})

    .then(GabOperation => {
      if(!GabOperation) {

        return res.status(404).send({
          message: "GabOperation not found with id " + req.params._id
      });

      }
      res.send(GabOperation);
    }).catch(err => {

      if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "GabOperation not found with id " + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Error updating GabOperation with id " + req.params.id
    });

    })


})



router.route("/delete/:id").delete((req, res) => {

GabOperation.findByIdAndRemove(req.params.id)
.then(GabOperation=> {
  if (!GabOperation) {

    return res.status(404).send({
      message : "GabOperation not found with id " + req.params.id
    });
    
  }
  res.send({
    message : "GabOperation deleted successfully !" });
}).catch(err =>{
  if (err.kind === 'ObjectId' || err.name === 'NotFound') {

    return res.status(404).send({
      message : 'GabOperation not found with id ' + req.params.id
    });
    
  }
  return res.status(404).send({
    message : 'Could not delete note with id ' + req.params.id
  });
})
    



  
 
})



  


module.exports = router;