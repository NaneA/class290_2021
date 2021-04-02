const express = require('express');
const router = express.Router();
const admin = require('./admin.service');
const asyncHandler = require('express-async-handler');

router.patch('/unlock-user/:id', asyncHandler(async (req,res) =>{
   // const {username}= req.body;
 
    const {id} = req.params;
    await admin.unlock(id, req.user);
    res.send({message : 'User has successfully been unlocked!' })
}))

router.patch('/lock-user/:id', asyncHandler(async (req,res) =>{
    
    const {id} = req.params;
    await admin.lock(id,req.user);
    res.send({message : 'User has successfully been locked!' })
}))
module.exports = router;
//.status(200)