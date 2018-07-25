const express = require('express');
const router = express.Router();
const knex = require('../../../db/knex');
console.log('This is posts.js');

router.get('/', (req, res, next) => {
  knex('posts').select().then( posts => {
    res.json({
      "status" : 200,
      "results" : posts
    })
  })
  .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  knex('posts')
    .insert(req.body)
    .returning('*')
    .then( posts => {
      res.json({
        "status" : 200,
        "results" : posts[0]
      })
    })
    .catch(err => {console.log(err); next(err)})
})

module.exports = router;
