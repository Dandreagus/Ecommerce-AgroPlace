const express = require('express');
const router = require('express').Router();
const locationGet = require('./locationGet');
const locationDelete = require('./locationDelete');
const locationPost = require('./locationPost');
const locationPut = require('./locationPut');
const timeslotsGet = require('./timeslotsGet')

// Middlewares
router.use(express.json());

// User routes
router.get('/', locationGet);
router.post('/', locationPost);
router.put('/:id', locationPut);
router.get('/:id/timeslots', timeslotsGet)
router.post('/delete/:id', locationDelete);


module.exports = router;
