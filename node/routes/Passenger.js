var express= require('express')
//var apps = express();
const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017";
const { checkPermission } = require("../middleware/CheckPermission");
var router=express();
router.use(express.urlencoded({ extended: true }))
router.use(express.json());




     router.post("/addpassenger",function(req,res){   
console.log(req.body);
    MongoClient.connect(url,function(err,conn){
     var db = conn.db("irctc");
     db.collection('passenger').insertOne(req.body,function(err,data){
        res.send(data);
     })
   })
})



module.exports = router;