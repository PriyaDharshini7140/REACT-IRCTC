const express =  require("express")
const router =  express.Router()
const { MongoClient ,ObjectId} = require('mongodb');
const { checkPermission } = require("../middleware/CheckPermission");
const url = 'mongodb://localhost:27017';


router.get("/getBooking",checkPermission(),(req,res)=>{
    MongoClient.connect(url,(err,con)=>{
        var db = con.db("irctc")
        db.collection("bookings").find().toArray((err,data)=>{
            console.log(data);
            res.send(data)
        })
        })
})

router.get("/getBookingActive",checkPermission(),(req,res)=>{
    MongoClient.connect(url,(err,con)=>{
        var db = con.db("irctc")
        db.collection("bookings").find({record_status: 1}).toArray((err,data)=>{
            console.log(data);
            res.send(data)
        })
        })
})

router.post("/getBookingParticular",checkPermission(),(req,res)=>{
    MongoClient.connect(url,(err,con)=>{
    var db = con.db("irctc")
     db.collection("bookings").findOne({_id:ObjectId(req.body._id)},(err,data)=>{
       res.send(data)
     })
     
    });
  
})

router.post("/booking",checkPermission(),(req,res)=>{
    console.log(req.body)
    MongoClient.connect(url,(err,con)=>{
    var db = con.db("irctc")
     db.collection("bookings").insertOne(req.body,(err,data)=>{
         console.log(data.insertedId);
         res.send(data.insertedId)
     })
    });
})


router.patch('/deleteBooking-soft',checkPermission(),(req,res)=>{
    console.log(req.params);
    MongoClient.connect(url,(err,con)=>{
        var db = con.db("irctc")
         db.collection("bookings").updateOne({_id:ObjectId(req.body._id)},
         {
             $set:{
                record_status:0
             }
         },
         function(err,data){
             console.log(data)
             res.send("deleted successfully")
         })
        });
})

router.patch('/updateCount',checkPermission(),(req,res)=>{
    console.log(req.body);
    MongoClient.connect(url,(err,con)=>{
        var db = con.db("irctc")
         db.collection("bookings").updateOne({_id:ObjectId(req.body._id)},
         {
             $set:{
                 pnrno:"PNR-"+req.body._id,
                 passengerCount:req.body.passengerCount,
               
             }
         },
         function(err,data){
             console.log(data)
             res.send("updated successfully")
         })
        });
})

router.patch('/updateStatus',checkPermission(),(req,res)=>{
    console.log(req.body);
    MongoClient.connect(url,(err,con)=>{
        var db = con.db("irctc")
         db.collection("bookings").updateOne({_id:ObjectId(req.body._id)},
         {
             $set:{
                 amount:req.body.amount,
                 status:req.body.status
               
             }
         },
         function(err,data){
             console.log(data)
             res.send("updated successfully")
         })
        });
})
router.delete('/deleteBooking/:id',checkPermission(),(req,res)=>{
    console.log(req.params);
    MongoClient.connect(url,(err,con)=>{
        var db = con.db("irctc")
         db.collection("bookings").deleteOne({_id:ObjectId(req.params.id)},(err,data)=>{
             console.log(data);
             res.send("deleted successfully")
         })
        });
})


module.exports = router;