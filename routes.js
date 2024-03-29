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
  if (rangeBy != '') {
    switch (rangeBy) {
      //If rangeBy = id
      case 'id':

          if(start === undefined){ //Accounts for when no start value is passed
            start = 1
          }
         if(max!=undefined){ //This accounts for when the value of max is less than the value of start
          max = Number(max) + (Number(start) - 1)
         }
         if(Number(end)>50){ //If end query is greater than 50 it sets end equal to 50
           end = 50
         }
         if(end === undefined){ //This accounts for times when no end value is passed
           end = list.length
         }
      

        /**
         * This for-loop goes through the list.json file based on the start and end query values
         * If i is less than the max query value indicated, it adds it to the appArray variable, other wise it just iterates i
         * If there is no max query value, it adds the items from the start to end values of the list.json
         */

        for (let i = start - 1; i < end; i++) {
          
            if(max!=undefined){
            if (i < max) {
              appArray.push(list[i])
            } else {
              i++
            }

          }
          else{
            appArray.push(list[i])
          }
          }
        
        //Depending on the order query value, it will res.json the appArray regularly, or reversed
        if (order === 'asc') {
          res.json(appArray)
        } else if (order === 'desc') {
          res.json(appArray.reverse())
        } else {
          res.json(appArray)
        }
        break
      //If rangeBy = name
      case 'name':

        let start2 = 0
        let end2 = 0

        if(start === undefined){ //This accounts for when no start value is passed
          start = 'my-app-001'
        }
        if(end === undefined){ //This accounts for when no end value is passed
          end = 'my-app-050'
        }
        /**
         * This for-loop finds the IDs of the start and end app names
         * These IDs are then assigned to the start2 and end2 variables whcih are used in the next loop
         */
        for (let i = 0; i < list.length; i++) {
          if (list[i].name === start) {
            start2 = list[i].id
          } else if (list[i].name === end) {
            end2 = list[i].id
              break
          }
         else if(i===49){
            end2 = 50
          }
        }
        //This if statement checks to make sure these variables have an actual value
        if (start2 != 0 && end2 != 0) {


          if(max!=undefined){ //This accounts for when the value of max is less than the value of start2
            max = Number(max) + (Number(start2) - 1)
           }
          /**
           * This for-loop goes through the list.json file based on the start and end query values
           * If i is less than the max query value indicated, it adds it to the appArray variable, other wise it just iterates i
           * If there is no max query value, it adds the items from the start to end values of the list.json
           */
          for (let i = start2 - 1; i < end2; i++) {
            if (max != undefined) {
              if (i < max) {
                appArray.push(list[i])
              } else {
                i++
              }
            } else {
              appArray.push(list[i])
            }
          }
          //Depending on the order query value, it will res.json the appArray regularly, or reversed
          if (order === 'asc') {
            res.json(appArray)
          } else if (order === 'desc') {
            res.json(appArray.reverse())
          } else {
            res.json(appArray)
          }
        }
        break
      //Default case is to res.json the entire list of items
      default:
        res.json(list)
    }
  } else {
    res.json(list)
  }
})

module.exports = router