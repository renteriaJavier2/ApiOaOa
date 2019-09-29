'use strict';

//const async = require('async');
const models = require('../../models');
const methodCompany = require('./auxMethodCompany/auxMethod');

async function createNewCompany(req, res) {
   try {
      var params = req.body;
      if (await methodCompany.checkEmptyValueCmpy(params)) {
         if (await methodCompany.validateEmailCmpy(params.email)) {

            var info = await methodCompany.buildObjectCompany(params);
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
}

async function listCompanies(req, res) {
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
}

async function viewDetailCompany(req, res) {
   try {
      if (await methodCompany.validateEmptyIdCpmy(req.params.id)) {
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
}

async function updateCompany(req, res) {
   try {
      if (await methodCompany.validateEmptyIdCpmy(req.params.id)) {
         let idCmpy = req.params.id;
         var params = req.body;
         var infoCompany = await methodCompany.buildObjectCompany(params);
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
}

async function deleteCompany(req, res) {
   try {
      if (await methodCompany.validateEmptyIdCpmy(req.params.id)) {
         let idCmpy = req.params.id;
         var data = await models.Companies.destroy({
            limit: 1,
            where: {
               id: idCmpy
            }
         });
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
}

async function loginCompany(req, res){

}

module.exports = {
   loginCompany,
   deleteCompany,
   listCompanies,
   updateCompany,
   createNewCompany,
   viewDetailCompany,
};