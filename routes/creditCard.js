const express = require('express')
let CreditCard = require('../models/creditCard.model');
const router = express.Router();




router.get('/', (req,res) =>{
  
  CreditCard.find()
  .then((CreditCard) => res.json(CreditCard))
  .catch((err) => res.status(400).json("Error :" + err));

});




router.route("/add").post((req, res) => {
  
  const compte_id = req.body.compte_id;

  const pin = req.body.pin;
  
  const type = req.body.type;


    // Validate Request
    if(!compte_id || !pin || !type) {
      return res.status(400).send({
          message: "filde content can not be empty"
      });
  }

   
  
    const CreditCardPush = new CreditCard({
      
      compte_id,
      pin,
      type
     
    });
  
    CreditCardPush
      .save()
      .then((data) => {
        res.send(data);
        res.json("CreditCard successfully added")
        
      }).catch((err) =>  res.status(400).json("Error :" + err));
     
  });



router.route("/update/:id").put((req, res) => {


  const compte_id = req.body.compte_id;

  const pin = req.body.pin;
  
  const type = req.body.type;


  // Validate Request
  if(!compte_id || !pin || !type) {
    return res.status(400).send({
        message: "filde content can not be empty"
    });
}

    // Find  and update it with the request body

    CreditCard.findByIdAndUpdate(req.params.id,{
      compte_id: req.body.compte_id,
      pin: req.body.pin,
      type: req.body.type,

    },{new: true})

    .then(CreditCard => {
      if(!CreditCard) {

        return res.status(404).send({
          message: "CreditCard not found with id " + req.params._id
      });

      }
      res.send(CreditCard);
    }).catch(err => {

      if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "CreditCard not found with id " + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Error updating CreditCard with id " + req.params.id
    });

    })


})



router.route("/delete/:id").delete((req, res) => {

CreditCard.findByIdAndRemove(req.params.id)
.then(CreditCard=> {
  if (!CreditCard) {

    return res.status(404).send({
      message : "CreditCard not found with id " + req.params.id
    });
    
  }
  res.send({
    message : "CreditCard deleted successfully !" });
}).catch(err =>{
  if (err.kind === 'ObjectId' || err.name === 'NotFound') {

    return res.status(404).send({
      message : 'CreditCard not found with id ' + req.params.id
    });
    
  }
  return res.status(404).send({
    message : 'Could not delete note with id ' + req.params.id
  });
})
    



  
 
})



  


module.exports = router;