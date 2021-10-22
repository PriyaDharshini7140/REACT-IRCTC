var express = require("express");
var router  = express();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { CreateToken } = require('../middleware/CreateToken');
const { MongoClient, ObjectId } = require('mongodb');
var url = "mongodb://localhost:27017";


router.use(express.urlencoded({ extended: true }))
router.use(express.json());

router.post("/addusers", function (req, res) {
    console.log(req.body);
    MongoClient.connect(url,function(err,conn){

        var db = conn.db("irctc");

        db.collection("users").find({Email:req.body.Email})

        .toArray(function(err,data){

          if(data.length===0){
            bcrypt.hash(req.body.password,10,(err,hashedPass)=>{
				if (err) {
					res.json({error:err})
				}
               
                req.body.password = hashedPass
                db.collection('users').insertOne(req.body,function(err,data){

                    res.send(data)
 
                 })    
            })
                                

            }

            else{

                res.send("Email Id is taken" );                    

            }



        })

    })
})

router.post("/login", function (req, res) {
    console.log(req.body);
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("irctc");
        db.collection("users").findOne({Email: req.body.Email},function (err, data) 
            {
                console.log(req.body.Email);
                if (!data) {
                    res.send("user not found")
                   
                }
                else {
                    bcrypt.compare(req.body.password,data.password,function(err,result){
                        console.log(result);
                        if(err){
                            res.json({
                                error:err
                            })
                        }
                        if(result){
                            console.log(data);
                            let token = CreateToken(data);
                            console.log(token);
                            res.send({
                    message:"logged in successfully",
                    _id:data._id,
                  Email:data.Email,
                    password:data.password,
                    token
                            });
                            
                        }else{
                            res.send('password does not match')
                        }
                    })
                }
               
            })

    })
    })

    router.get("/viewuser",function(req,res){
        MongoClient.connect(url,(err,con)=>{
                 var db = con.db("irctc")
                 db.collection("users").find().toArray((err,data)=>
                 {
                     res.send(data)
                 })
                 })
     })



     
    
    module.exports = router;