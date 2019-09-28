'use strict';

const express = require('express');
const routes = express.Router();
const UserController = require('../../controllers/UserControllers/usrs');

routes.post('/user-create/', UserController.createNewUser);
routes.post('/user-login/', UserController.loginUser);

routes.get('/user-lists/', UserController.listsUsers);
routes.get('/user-view/:id?', UserController.viewDetailUser);

routes.put('/user-update/:id?', UserController.createNewUser);

module.exports = routes;