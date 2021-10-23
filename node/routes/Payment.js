const express = require("express");
const router=express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';
const { checkPermission } = require("../middleware/CheckPermission");
router.use(express.urlencoded({extended:true}));
router.use(express.json())


router.post("/insert",checkPermission(),function (req, res) {
    console.log(req.body)
    MongoClient.connect(url, function (err,conn) {
        var db = conn.db("irctc");
        db.collection("payment").insertOne(req.body, function (err, data) {
            res.send(data)
        })
    })
})
module.exports = router
