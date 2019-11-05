'use strict';

const bcrypt = require('bcrypt');
const models = require('../../models');
const axMtdUsAp = require('./auxMethodUrsApp/auxmethodapp');

module.exports = {
   createUserApp: async (req, res) => {
      try {
         var params = req.body;
         if (await axMtdUsAp.checkEmptyValApp(params)) {
            if (await axMtdUsAp.checkEmailApp(params.email)) {
               var infoUP = await axMtdUsAp.buildCreateUserApp(params);
               var data = await models.User_App.create(infoUP);

               if (data !== null) {
                  return res.status(200).json({
                     data,
                     code: 'API_CR_200',
                     messsage: 'Cuenta creada correctamente.'
                  });
               }//Si falla crear usuario app
               return res.status(200).json({
                  code: 'API_CR_403',
                  messsage: 'Algo pasó. Intente nuevamente.'
               });
            }//si el formato de correo no es válido.
            return res.status(200).json({
               code: 'API_CR_403',
               messsage: 'Formato de correo no válido.'
            });
         }//Si los campos están vacios.
         return res.status(200).json({
            code: 'API_CR_403',
            messsage: 'Debe llenar todos los campos.'
         });

      } catch (error) {
         console.log(error);
         return res.status(200).json({
            code: 'API_CR_500',
            messsage: error.messsage
         });
      }
   },
   //Método que solo será usado por el admin.
   listsUserApp: async (req, res) => {
      try {
         var data = await models.User_App.findAll({});

         if (data !== null) {
            return res.status(200).json({
               data,
               code: 'API_CR_200',
               messsage: 'Listado de usuarios del app.'
            });
         }

         return res.status(200).json({
            code: 'API_CR_404',
            messsage: 'No hay usuarios registrados desde el app.'
         });

      } catch (error) {
         console.log(error);
         return res.status(200).json({
            code: 'API_CR_500',
            messsage: error.messsage
         });
      }
   },
   updateUserApp: async (req, res) => {
      try {
         var params = req.body;
         var idUrsApp = req.params.id;
         var infoUP = await axMtdUsAp.buildUpdateUserApp(params);
         var data = await models.User_App.update(infoUP, {
            plain: true, returning: true, where: { id: idUrsApp }
         });

         if (data[0] == 1) {
            return res.status(200).json({
               data: data[1],
               code: 'API_CR_200',
               messsage: 'Datos actualizados.'
            });
         }

         return res.status(200).json({
            code: 'API_CR_403',
            messsage: 'Algo pasó al actualizar. Intente de nuevo.'
         });

      } catch (error) {
         console.log(error);
         return res.status(200).json({
            code: 'API_CR_500',
            messsage: error.messsage
         });
      }
   },
   //Login para el user_app
   loginUserApp: async (req, res) => {
      try {
         var parmas = req.body;
         if (await axMtdUsAp.checkValLog(params)) {
            if (await axMtdUsAp.checkEmailApp(params)) {
               var data = await models.User_App.findOne({
                  where:{
                     
                  }
               });
            }
         }

      } catch (error) {
         console.log(error);
         return res.status(200).json({
            code: 'API_CR_500',
            messsage: error.messsage
         });
      }
   }
}