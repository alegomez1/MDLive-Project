const express = require('express')
const router = express.Router()
//Imports the seed data from the list.json file
let list = require('./list.json')

//Route to get all items
router.get('/', (req, res, next) => {

  let rangeBy = req.query.rangeBy
  let startID = req.query.startID
  let maxID = req.query.maxID
  let startName = req.query.startName
  let maxName = req.query.maxName
  let appArray = []

  if(rangeBy != ''){

  switch (rangeBy) {
    case 'id':
      for (let i = startID - 1; i < maxID; i++) {
        appArray.push(list[i])
      }
      res.json(appArray)

      break
    case 'name':
      let startID2 = 0
      let maxID2 = 0

      for (let i = 0; i < list.length; i++) {
        if (list[i].name === startName) {
          startID2 = list[i].id
        } else if (list[i].name === maxName) {
          maxID2 = list[i].id
        }
      }
      if (startID2 != 0 && maxID2 != 0) {
        for (let i = startID2 - 1; i < maxID2; i++) {
          appArray.push(list[i])
        }
      }
      res.json(appArray)
      break;
      default:
          res.json(list)
  }
}else{
    res.json(list)
}


})
//Route to search by ID with start and max IDs
router.get('/range=by=id_start=:startID&max=:maxID', (req, res, next) => {
  let appArray = []

  for (let i = req.params.startID - 1; i < req.params.maxID; i++) {
    appArray.push(list[i])
  }
  res.json(appArray)
})

//Route to search by name with start and max names
router.get('/range=by=name_start=:startName&max=:maxName', (req, res, next) => {
  let startID = 0
  let maxID = 0
  let appArray = []

  for (let i = 0; i < list.length; i++) {
    if (list[i].name === req.params.startName) {
      startID = list[i].id
      // console.log('start ID', startID)
    } else if (list[i].name === req.params.maxName) {
      maxID = list[i].id
      // console.log('max ID', maxID)
    }
  }
  if (startID != 0 && maxID != 0) {
    for (let i = startID - 1; i < maxID; i++) {
      appArray.push(list[i])
    }
  }
  res.json(appArray)
})
module.exports = router
