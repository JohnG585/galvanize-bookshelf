'use strict';

const express = require('express');
const humps = require('humps')
const knex = require('../knex');


// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res, next) => {
  if(!req.cookies.token) {
    res.header('Content-Type', 'text/plain');
    res.status(401).send('Unauthorized');
  }
  else {
  knex('favorites')
  .join('books', 'books.id', 'book_id')
    .then((user) => {
      res.send(humps.camelizeKeys(user));
    })
  }
})

router.get(`/check`, (req, res, next) => {
  if(!req.cookies.token) {
    res.header('Content-Type', 'text/plain');
    res.status(401).send('Unauthorized');
  }
  else {
  let bookID = req.query.bookId
  if (bookID === '1') {
    res.status(200).send(true);
  }
  else {
    res.status(200).send(false);
  }
}
});

router.post(`/`, (req, res, next) => {
  if(!req.cookies.token) {
    res.header('Content-Type', 'text/plain');
    res.status(401).send('Unauthorized');
  }
  else {
   let bookID = req.body.bookId;
  knex('favorites')
    .join('books', 'books.id', 'book_id')
    .returning(['id', 'book_id', 'user_id'])
    .insert({ id: req.body.id, book_id: bookID, user_id: 1 })
    .then((book) => {
      res.send(humps.camelizeKeys(book[0]));
    });
  }
});

router.delete(`/`, (req, res, next) => {
  if(!req.cookies.token) {
    res.header('Content-Type', 'text/plain');
    res.status(401).send('Unauthorized');
  }
  else {
  let bookID = req.body.bookId;
  knex('favorites')
    .join('books', 'books.id', 'book_id')
    .returning(['book_id', 'user_id'])
    .del()
    .then((book) => {
      res.send(humps.camelizeKeys(book[0]));
    });
  }
})
module.exports = router;
