const express = require('express')
const router = express.Router()
var format = require('util').format;
var multiparty = require('multiparty');


const path = require('path');
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//user controller
var postController = require('../src/controllers/postController')

var db = require('../db/db');
const _dirname = '../views/';
// middleware that is specific to this router





//post routes
//router.get('/posts/', postController.post_create);
router.get('/posts/create', postController.post_create);
router.post('/posts/create', postController.post_save);
router.get('/posts/', postController.posts);

module.exports = router