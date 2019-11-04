const express = require('express')
const router = express.Router()
//Imports the seed data from the list.json file
let list = require('./list.json')

/**
 * This route processes all the requests made to /apps?
 * It first delcares all of the variables based on the queries of the url
 * Based on what the value of rangeBy is, it runs a switch statement for the case of 'id' or 'name'. Default is to res.json all items
 * Depending on what case runs, it also checks to see what the order is wether it's ascending(asc) or descending(desc), and will res.json the proper array
 */
router.get('/', (req, res, next) => {

  let rangeBy = req.query.rangeBy
  let start = req.query.start
  let end = req.query.end
  let order = req.query.order
  let max = req.query.max
  let appArray = []

  //Makes sure the rangeBy query has a value in it
  if(rangeBy != ''){
  switch (rangeBy) {
    //If rangeBy = id
    case 'id':
      for (let i = start - 1; i < end; i++) {
        if(max!=undefined){
          if(i<max){
            appArray.push(list[i])
          } else{
            i++
          }
        }else{
          appArray.push(list[i])
        }
      }
      if(order === 'asc'){
      res.json(appArray)
    }else if(order === 'desc'){
      res.json(appArray.reverse())
    }else{
      res.json(appArray)
    }
      break
    //If rangeBy = name
    case 'name':
      let start2 = 0
      let end2 = 0

      for (let i = 0; i < list.length; i++) {
        if (list[i].name === start) {
          start2 = list[i].id
        } else if (list[i].name === end) {
          end2 = list[i].id
        }
      }
      if (start2 != 0 && end2 != 0) {

        for (let i = start2 - 1; i < end2; i++) {
          if(max!=undefined){
            if(i<max){
              appArray.push(list[i])
            } else{
              i++
            }
          }else{
            appArray.push(list[i])
          }
        }
        if(order === 'asc'){
          res.json(appArray)
        }else if(order === 'desc'){
          res.json(appArray.reverse())
        }else{
          res.json(appArray)
        }
      }
      break;
      //Default case is to res.json the entire list of items
      default:
          res.json(list)
  }
}else{
    res.json(list)
}
})




// //Route to search by ID with start and max IDs
// router.get('/range=by=id_start=:startID&max=:maxID', (req, res, next) => {
//   let appArray = []

//   for (let i = req.params.startID - 1; i < req.params.maxID; i++) {
//     appArray.push(list[i])
//   }
//   res.json(appArray)
// })

// //Route to search by name with start and max names
// router.get('/range=by=name_start=:startName&max=:maxName', (req, res, next) => {
//   let startID = 0
//   let maxID = 0
//   let appArray = []

//   for (let i = 0; i < list.length; i++) {
//     if (list[i].name === req.params.startName) {
//       startID = list[i].id
//       // console.log('start ID', startID)
//     } else if (list[i].name === req.params.maxName) {
//       maxID = list[i].id
//       // console.log('max ID', maxID)
//     }
//   }
//   if (startID != 0 && maxID != 0) {
//     for (let i = startID - 1; i < maxID; i++) {
//       appArray.push(list[i])
//     }
//   }
//   res.json(appArray)
// })
module.exports = router
