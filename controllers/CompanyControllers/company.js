'use strict';

const bcrypt = require('bcrypt');
const models = require('../../models');
const mtdCmpy = require('./auxMethodCompany/auxMethodCmpy');
const middleCmpy = require('../../middleware/Companies/encode_companies');

module.exports = {
   createNewCompany: async (req, res) => {
      try {
         var params = req.body;
         if (await mtdCmpy.checkEmptyValueCmpy(params)) {
            if (await mtdCmpy.validateEmailCmpy(params.email)) {

               var info = await mtdCmpy.buildObjectCompany(params);
               var data = await models.Companies.create(info)

               if (data === null || data.length < 0)
                  return res.status(200).json({
                     code: 'API_C_403',
                     message: 'Fallo al crear la empresa.'
                  });
               return res.status(200).json({
                  data,
                  code: 'API_C_200',
                  message: 'Empresa registrada con éxito.'
               });

            } else {
               return res.status(200).json({
                  code: 'API_C_403',
                  message: 'Formato del correo no válido.'
               });
            }
         } else {
            return res.status(200).json({
               code: 'API_C_403',
               message: 'Debe llenar todos los campos.'
            });
         }

      } catch (error) {
         console.log(JSON.stringify(error));
         return res.status(200).json({
            code: 'API_C_403',
            message: error.message
         });
      }
   },
   listCompanies: async (req, res) => {
      try {
         var data = await models.Companies.findAll({});
         if (data === null || data.length < 0)
            return res.status(200).json({
               code: 'API_C_403',
               message: 'Fallo al crear la empresa.'
            });
         return res.status(200).json({
            data,
            code: 'API_C_200',
            message: 'Empresa registrada con éxito.'
         });
      } catch (error) {
         console.log(JSON.stringify(error));
         return res.status(200).json({
            code: 'API_C_403',
            message: error.message
         });
      }
   },
   viewDetailCompany: async (req, res) => {
      try {
         if (await mtdCmpy.validateEmptyIdCpmy(req.params.id)) {
            let idCmpy = req.params.id;
            var data = await models.Companies.findAll({
               where: {
                  id: idCmpy
               }
            });
            if (data === null || data.length < 0)
               return res.status(200).json({
                  code: 'API_C_403',
                  message: 'No hay Empresa ascociada a este identificador.'
               });
            return res.status(200).json({
               data,
               code: 'API_C_200',
               message: 'Información de la empresa.'
            });
         } else {
            return res.status(200).json({
               code: 'API_C_403',
               message: 'Debe proporcionar un identificador a buscar.'
            });
         }
      } catch (error) {
         console.log(JSON.stringify(error));
         return res.status(200).json({
            code: 'API_C_403',
            message: error.message
         });
      }
   },
   updateCompany: async (req, res) => {
      try {
         if (await mtdCmpy.validateEmptyIdCpmy(req.params.id)) {
            let idCmpy = req.params.id;
            var params = req.body;
            var infoCompany = await mtdCmpy.buildObjectCompany(params);
            var data = await models.Companies.update(infoCompany, {
               returning: true,
               plain: true,
               where: {
                  id: idCmpy
               }
            });

            if (data === null || data.length < 0)
               return res.status(200).json({
                  code: 'API_C_403',
                  message: 'No hay Empresa ascociada a este identificador.'
               });
            return res.status(200).json({
               data,
               code: 'API_C_200',
               message: 'Información de la empresa.'
            });
         } else {
            return res.status(200).json({
               code: 'API_C_403',
               message: 'Debe proporcionar un identificador a buscar.'
            });
         }
      } catch (error) {
         console.log(JSON.stringify(error));
         return res.status(200).json({
            code: 'API_C_403',
            message: error.message
         });
      }
   },
   deleteCompany: async (req, res) => {
      try {
         if (await mtdCmpy.validateEmptyIdCpmy(req.params.id)) {
            let idCmpy = req.params.id;
            var data = await models.Companies.destroy({
               limit: 1, where: { id: idCmpy }});

            if (data == 1)
               return res.status(200).json({
                  data,
                  code: 'API_U_200',
                  message: 'Compañia eliminada con éxito.'
               });

            return res.status(200).json({
               code: 'API_U_403',
               message: 'Fallo al eliminar la compañia. Pruebe nuevamente'
            });

         } else {
            return res.status(200).json({
               code: 'API_C_403',
               message: 'Debe proporcionar un identificador a buscar.'
            });
         }
         
      } catch (error) {
         console.log(JSON.stringify(error));
         return res.status(200).json({
            code: 'API_C_403',
            message: error.message
         });
      }
   },
   loginCompany: async (req, res) => {
      try {
         var params = req.body;
         if (await mtdCmpy.checkValLog(params)) {
            if (await mtdCmpy.validateEmailCmpy(params.email)) {

               var data = await models.Companies.findOne({
                  where: { email: params.email }
               });

               if (Object.keys(data).length > 0) {
                  if (await bcrypt.compare(params.params, data.password)) {
                     var tokenCmpy = await middleCmpy.encode_companies(data);
                     return res.status(200).json({
                        data,
                        tokenCmpy,
                        code: 'API_C_200',
                        message: 'Acceso correcto.'
                     });
                  }//incorrect password. 
                  return res.status(200).json({
                     code: 'API_C_403',
                     message: 'Este correo no existe en los registros.'
                  });
               }// is empty value from infoCmpy.
               return res.status(200).json({
                  code: 'API_C_403',
                  message: 'Este correo no existe en los registros.'
               });
            }//end if from validateEmailCmpy.
            return res.status(200).json({
               code: 'API_C_403',
               message: 'Formato de correo invalido.'
            });
         }// end if drom checkValLog.
         return res.status(200).json({
            code: 'API_C_403',
            message: 'Debe llenar los campos.'
         });

      } catch (error) {
         console.log(JSON.stringify(error));
         return res.status(200).json({
            code: 'API_C_403',
            message: error.message
         });
      }
   }
}