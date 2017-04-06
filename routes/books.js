'use strict';

const express = require('express');
const knex = require('../knex');
const humps = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
  router.get('/', function(req, res, next) {
  knex('books')
    .orderBy('title')
    .then((books) => {
      res.send(humps.camelizeKeys(books));
    })
    .catch((err) => {
      console.log(err);
      knex.destroy();
    });

})
router.get('/:id', function(req, res, next) {
  const id = req.params.id;

  knex('books')
  .where('id', id)
  .then((book) => {
    res.send(humps.camelizeKeys(book[0]));
  })
  .catch((err) => {
    console.log(err);
    knex.destroy();
  });
})
router.post('/', ev(validations.post), function(req, res, next) {
  const newBook = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    coverUrl: req.body.coverUrl
  }
  knex('books')
  .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url'])
  .insert({ title: newBook.title, author: newBook.author, genre: newBook.genre, description: newBook.description, cover_url: newBook.coverUrl })
  .then((book) => {
    res.send(humps.camelizeKeys(book[0]));
  })
  .catch((err) => {
    console.log(err);
    knex.destroy();
  });
})
router.patch('/:id', function(req, res, next) {
  let id = req.params.id;
  let body = req.body;
  knex('books')
  .returning(['id', 'title', 'author', 'genre', 'description', 'cover_url'])
  .where('id', id)
  .update({ title: body.title, genre:body.genre, author: body.author, description: body.description, cover_url: body.coverUrl })
  .then((book) => {
    res.send(humps.camelizeKeys(book[0]));
  })
  .catch((err) => {
    knex.destroy();
  });
});
router.delete('/:id', function(req, res, next) {
  knex('books')
  .returning(['title', 'author', 'genre', 'description', 'cover_url'])
  .where('id', req.params.id)
  .del()
  .then((book) => {
    res.send(humps.camelizeKeys(book[0]));

  })
  .catch((err) => {
    console.log(err);
    knex.destroy();
  });

})

module.exports = router;
