const express = require('express')
let UploadSum = require('../models/upload_Sum.model');
const router = express.Router();




router.get('/', (req,res) =>{
  
  UploadSum.find()
  .then((UploadSum) => res.json(UploadSum))
  .catch((err) => res.status(400).json("Error :" + err));

});




router.route("/add").post((req, res) => {
  
  const total_up = req.body.total_up;

  const id_monney_provider = req.body.id_monney_provider;
  
  const gab_id = req.body.gab_id;


    // Validate Request
    if(!total_up || !id_monney_provider || !gab_id) {
      return res.status(400).send({
          message: "filde content can not be empty"
      });
  }

   
  
    const UploadSumPush = new UploadSum({
      
      total_up,
      id_monney_provider,
      gab_id
     
    });
  
    UploadSumPush
      .save()
      .then((data) => {
        res.send(data);
        res.json("UploadSum successfully added")
        
      }).catch((err) =>  res.status(400).json("Error :" + err));
     
  });



router.route("/update/:id").put((req, res) => {


  const total_up = req.body.total_up;

  const id_monney_provider = req.body.id_monney_provider;
  
  const gab_id = req.body.gab_id;


  // Validate Request
  if(!total_up || !id_monney_provider || !gab_id) {
    return res.status(400).send({
        message: "filde content can not be empty"
    });
}

    // Find  and update it with the request body

    UploadSum.findByIdAndUpdate(req.params.id,{
      total_up: req.body.total_up,
      id_monney_provider: req.body.id_monney_provider,
      gab_id: req.body.gab_id,

    },{new: true})

    .then(UploadSum => {
      if(!UploadSum) {

        return res.status(404).send({
          message: "UploadSum not found with id " + req.params._id
      });

      }
      res.send(UploadSum);
    }).catch(err => {

      if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "UploadSum not found with id " + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Error updating UploadSum with id " + req.params.id
    });

    })


})



router.route("/delete/:id").delete((req, res) => {

UploadSum.findByIdAndRemove(req.params.id)
.then(UploadSum=> {
  if (!UploadSum) {

    return res.status(404).send({
      message : "UploadSum not found with id " + req.params.id
    });
    
  }
  res.send({
    message : "UploadSum deleted successfully !" });
}).catch(err =>{
  if (err.kind === 'ObjectId' || err.name === 'NotFound') {

    return res.status(404).send({
      message : 'UploadSum not found with id ' + req.params.id
    });
    
  }
  return res.status(404).send({
    message : 'Could not delete note with id ' + req.params.id
  });
})
    



  
 
})



  


module.exports = router;