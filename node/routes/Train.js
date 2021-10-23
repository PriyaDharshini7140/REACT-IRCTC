const express =  require("express")
const router =  express.Router()
const { MongoClient ,ObjectId} = require('mongodb');
const { checkPermission } = require("../middleware/CheckPermission");
const url = 'mongodb://localhost:27017';




router.post("/addtraindetails",checkPermission(),function(req,res){
    MongoClient.connect(url,function(err,conn){
         var db = conn.db("irctc");
         db.collection("trainss").insertOne(req.body,function(err,data)
         {
         
             res.send(data)
            
         })
     })
 })


 router.get("/deletetraindetails/:id",checkPermission(),function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("irctc");
        db.collection("trainss").deleteOne({_id:ObjectId(req.params.id)},function(err,data)
        {
            res.send(data)   
        })
        })
})




router.patch("/updatetraindetails",checkPermission(),function(req,res){
    MongoClient.connect(url,function(err,conn){
       console.log(req.body)
        var db = conn.db("irctc");
        db.collection("trainss")
        .updateOne(
            {_id:ObjectId(req.body._id)},
            {
                $set:
                {
                    from:req.body.from,
                    to:req.body.to,
                    date:req.body.date,
                    classes:req.body.classes,
                    general:req.body.general
                }
            },
            function(err,data)
            {
              
                res.send(data)
            }
        )
    })
})


// .find({ from, to, date: { $gte: startDate, $lt: endDate } })

router.post("/viewtraindetails",checkPermission(),function(req,res){
console.log(req.body);
    MongoClient.connect(url,(err,con)=>{
        var db = con.db("irctc")
        db.collection("trainss").find({from:req.body.from,to:req.body.to,date:{$gte:req.body.date}}).toArray((err,data)=>
        {
            res.send(data)
        })
        })

})


router.get("/viewtraindetails",checkPermission(),function(req,res){
    MongoClient.connect(url,(err,con)=>{
             var db = con.db("irctc")
             db.collection("trainss").find().toArray((err,data)=>
             {
                 res.send(data)
             })
             })
 })

 module.exports = router;