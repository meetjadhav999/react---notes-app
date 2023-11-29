const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
},{
    timestamps:true
}) 

const Note = mongoose.model('Note',NoteSchema)

module.exports = Note