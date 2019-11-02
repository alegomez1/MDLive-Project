const express = require('express')
const router = express.Router()

let list = require('./list.json')

//Route to get all items
router.get('/', (req,res,next)=>{
    res.json(list)
})

//Route to search by ID with start and max IDs
router.get('/range=by=id_start=:startID&max=:maxID', (req,res,next) =>{

    let appArray = []

    for(let i= req.params.startID-1; i< req.params.maxID; i++){
        appArray.push(list[i])
    }
    res.json(appArray)
 
})
//Route to search by name with start and max names
router.get('/range=by=name_start=:startName&max=:maxName', (req,res,next)=>{

    let startID = 0
    let maxID = 0
    let appArray = []

     for(let i = 0; i<list.length; i++){
        if(list[i].name === req.params.startName){
            startID = list[i].id
            // console.log('start ID', startID)
        }else if(list[i].name === req.params.maxName){
            maxID = list[i].id
            // console.log('max ID', maxID)
        }
    }
    if(startID!=0 && maxID!=0){
        for(let i = startID-1; i<maxID; i++){
            appArray.push(list[i])
        }
    }
    res.json(appArray)
})
module.exports = router