'use strict';

const models = require('../../models');
var methodUser = require('./auxMethodUser/auxmethod');
var mailerMethod = require('../EmailConfirm/confirm');
const async = require('async');

async function createNewUser(req, res) {
   try {
      var params = req.body;
      var checkValue = await methodUser.checkEmptyValueUsrs(params);

      if (checkValue) {
         if (methodUser.validateEmailUsrs(params.email)) {
            var info = await methodUser.buildObjectCreateNewUser(params);
            var data = await models.Users.create(info);

            if (data !== null && data.length > 0) {
               await mailerMethod.verifyRegister(data.email, data.id);
               return res.status(200).json({
                  data,
                  code: 'API_U_200',
                  message: 'Registro de usuario correcto.'
               });
            }
            return res.status(200).json({
               code: 'API_U_403',
               message: 'Fallo en el registro de usuario.'
            });
         } else {
            return res.status(200).json({
               code: 'API_U_403',
               message: 'Formato de correo no valido.'
            });
         }
      } else {
         return res.status(200).json({
            code: 'API_U_403',
            message: 'Debe llenar todos los campos.'
         });
      }

   } catch (error) {
      console.log(JSON.stringify(error));
   }
}

async function listsUsers(req, res) {
   try {
      var data = await models.Users.findAll({});
      if (data !== null && data.length > 0)
         return res.status(200).json({
            data,
            code: 'API_U_200',
            message: 'Listado de usuarios correcto.'
         });
      return res.status(200).json({
         code: 'API_U_403',
         message: 'No hay datos de usuarios.'
      });
   } catch (error) {
      console.log(JSON.stringify(error));
   }
}

async function viewDetailUser(req, res) {
   try {
      var idUrs = req.params.id;
      var checkIdUsrs = await methodUser.checkValueIdUsr(idUrs);
      if (!checkIdUsrs) {
         return res.status(200).json({
            code: 'API_U_404',
            message: 'Debe proporcionar un identificador a buscar.'
         });
      } else {
         var data = await models.Users.findOne({
            where: {
               id: idUrs
            }
         });

         if (data !== null && data.length > 0)
            return res.status(200).json({
               data,
               code: 'API_U_200',
               message: 'Detalle del usuario.'
            });
         return res.status(200).json({
            code: 'API_U_403',
            message: 'Este usuario no existe.'
         });
      }
   } catch (error) {
      console.log(JSON.stringify(error));
   }
}

async function updateDataUsr(req, res) {
   try {
      var idUrs = req.params.id;
      var checkIdUsrs = await methodUser.checkValueIdUsr(idUrs);
      if (!checkIdUsrs) {
         return res.status(200).json({
            code: 'API_U_404',
            message: 'Debe proporcionar un identificador a buscar.'
         });
      } else {

      }
   } catch (error) {
      console.log(JSON.stringify(error));
   }
}

module.exports = {
   listsUsers,
   updateDataUsr,
   createNewUser,
   viewDetailUser,
}