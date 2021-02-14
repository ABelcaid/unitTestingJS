const express = require('express')
let MonneyProvider = require('../models/monneyProvider.model');
const router = express.Router();




router.get('/', (req,res) =>{
  
  MonneyProvider.find()
  .then((MonneyProvider) => res.json(MonneyProvider))
  .catch((err) => res.status(400).json("Error :" + err));

});




router.route("/add").post((req, res) => {
  
  const matricule = req.body.matricule;




    // Validate Request
    if(!matricule ) {
      return res.status(400).send({
          message: "filde content can not be empty"
      });
  }

   
  
    const MonneyProviderPush = new MonneyProvider({
      
      matricule
    });
  
    MonneyProviderPush
      .save()
      .then((data) => {
        res.send(data);
        res.json("MonneyProvider successfully added")
        
      }).catch((err) =>  res.status(400).json("Error :" + err));
     
  });



router.route("/update/:id").put((req, res) => {


  const matricule = req.body.matricule;




  // Validate Request
  if(!matricule) {
    return res.status(400).send({
        message: "filde content can not be empty"
    });
}

    // Find  and update it with the request body

    MonneyProvider.findByIdAndUpdate(req.params.id,{
      matricule: req.body.matricule

    },{new: true})

    .then(MonneyProvider => {
      if(!MonneyProvider) {

        return res.status(404).send({
          message: "MonneyProvider not found with id " + req.params._id
      });

      }
      res.send(MonneyProvider);
    }).catch(err => {

      if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "MonneyProvider not found with id " + req.params.id
        });                
    }
    return res.status(500).send({
        message: "Error updating MonneyProvider with id " + req.params.id
    });

    })


})



router.route("/delete/:id").delete((req, res) => {

MonneyProvider.findByIdAndRemove(req.params.id)
.then(MonneyProvider=> {
  if (!MonneyProvider) {

    return res.status(404).send({
      message : "MonneyProvider not found with id " + req.params.id
    });
    
  }
  res.send({
    message : "MonneyProvider deleted successfully !" });
}).catch(err =>{
  if (err.kind === 'ObjectId' || err.name === 'NotFound') {

    return res.status(404).send({
      message : 'MonneyProvider not found with id ' + req.params.id
    });
    
  }
  return res.status(404).send({
    message : 'Could not delete note with id ' + req.params.id
  });
})
    



  
 
})



  


module.exports = router;