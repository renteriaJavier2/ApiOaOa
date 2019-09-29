'use strict';

const express = require('express');
const routes = express.Router();
const UserDecode = require('../../middleware/Users/decode_user');
const UserController = require('../../controllers/UserControllers/usrs');

routes.post('/user-create/', UserDecode.decode_user, UserController.createNewUser);
routes.post('/user-login/', UserController.loginUser);

routes.get('/user-lists/', UserDecode.decode_user, UserController.listsUsers);
routes.get('/user-view/:id?', UserDecode.decode_user, UserController.viewDetailUser);

routes.put('/user-update/:id?', UserDecode.decode_user, UserController.updateDataUsr);

routes.delete('/user-delete/:id?', UserDecode.decode_user, UserController.deleteInfoUser);

module.exports = routes;