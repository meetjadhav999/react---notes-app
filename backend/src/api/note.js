const express = require("express")
const Note = require('../models/note')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('',(req,res)=>{
    res.send("good")
})

router.get('/note',auth,async(req,res)=>{
    await req.user.populate({
        path:'Notes',
        options:{
            limit:20
        }
    })
    res.send(req.user.Notes)
})

router.get('/note/:id',auth,async(req,res)=>{
    const note = await Note.findOne({_id:req.params.id,owner:req.user._id})
    if(note){
        return res.status(200).send(note)
    }
    return res.status(400).send("invalid")
})

router.post('/note',auth,async(req,res)=>{
    console.log(req.body)
    const note = new Note({
        ...req.body,
        owner:req.user._id
    })
    console.log("ok")
    try{
        await note.save()
        res.status(201).send("note saved")
    }catch(e){

        res.status(400).send("invalid request")
    }
})

router.delete('/note/:id',auth,async(req,res)=>{
    const note = await Note.findOneAndDelete({_id:req.params.id})
    if(note){
        return res.send(note)
    }
    return res.send("invalid request")
})

module.exports = router;