'use strict';

const express = require('express');
const routes = express.Router();
const UserDecode = require('../../middleware/Users/decode_user');
const UserController = require('../../controllers/UserControllers/usrs');

routes.route('/user-create/', UserDecode.decode_user).post(UserController.createNewUser);
routes.route('/user-login/').post(UserController.loginUser);

routes.route('/user-lists/', UserDecode.decode_user).get(UserController.listsUsers);
routes.route('/user-view/:id?', UserDecode.decode_user).get(UserController.viewDetailUser);

routes.route('/user-update/:id?', UserDecode.decode_user).put(UserController.updateDataUsr);

routes.route('/user-delete/:id?', UserDecode.decode_user).delete(UserController.deleteInfoUser);

module.exports = routes;