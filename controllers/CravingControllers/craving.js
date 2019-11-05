'use strict';

const models = require('../../models');
const methodAux = require('./auxMethodCraving/auxmethodcrg');

module.exports = {
   createMyCraving: async (req, res) => {
      try {
         var params = req.body;
         params.idCmpy = req.cmpy.id;
         var infoCV = await methodAux.buildCreateMyCraving(params);
         var data = await models.Cravings.create(infoCV);

         if (data !== null) {
            return res.status(200).json({
               data,
               code: 'API_CR_200',
               messsage: 'Ha creado un antojo.'
            });
         }

         return res.status(200).json({
            code: 'API_CR_403',
            messsage: 'Algo pasó.'
         });

      } catch (error) {
         console.log(error)
         return res.status(200).json({
            code: 'API_CR_500',
            messsage: error.messsage
         });
      }
   },
   listsCravingByCompany: async (req, res) => {
      try {
         var idCmpy = req.cmpy.id;
         var data = await models.Cravings.findAll({
            where: { companyId: idCmpy }
         });

         if (data !== null) {
            return res.status(200).json({
               data,
               code: 'API_CR_200',
               messsage: 'Listado de sus antojos.'
            });
         }

         return res.status(200).json({
            code: 'API_CR_403',
            messsage: 'Algo pasó.'
         });

      } catch (error) {
         console.log(error)
         return res.status(200).json({
            code: 'API_CR_500',
            messsage: error.messsage
         });
      }
   },
   viewDetailCraving: async (req, res) => {
      try {
         var idCrav = req.params.id;
         var data = await models.Cravings.findAll({
            limit: 1, where: { id: idCrav }
         });

         if (data !== null) {
            return res.status(200).json({
               data,
               code: 'API_CR_200',
               messsage: 'Detalle del antojos.'
            });
         }

         return res.status(200).json({
            code: 'API_CR_403',
            messsage: 'Algo pasó.'
         });

      } catch (error) {
         console.log(error)
         return res.status(200).json({
            code: 'API_CR_500',
            messsage: error.messsage
         });
      }
   },
   deleteCraving: async (req, res) => {
      try {
         var idCrav = req.params.id;
         var data = await models.Cravings.destroy({
            wehre: { id: idCrav }
         });

         if (data == 1) {
            return res.status(200).json({
               code: 'API_CR_200',
               messsage: 'Antojo eliminado.'
            });
         }

         return res.status(200).json({
            code: 'API_CR_403',
            messsage: 'Algo pasó.'
         });

      } catch (error) {
         console.log(error)
         return res.status(200).json({
            code: 'API_CR_500',
            messsage: error.messsage
         });
      }
   },
   listsCravingByCategory: async (req, res) => {
      try {
         var idCmpy = req.cmpy.id;
         var idCatCrav = req.params.id;
         var data = await models.Cravings.findAll({
            where: {
               companyId: idCmpy,
               cravingCtgId: idCatCrav
            }
         });

         if (data !== null) {
            return res.status(200).json({
               data,
               code: 'API_CR_200',
               messsage: 'Detalles del antojos según la categoría.'
            });
         }

         return res.status(200).json({
            code: 'API_CR_403',
            messsage: 'Algo pasó.'
         });
         
      } catch (error) {
         console.log(error)
         return res.status(200).json({
            code: 'API_CR_500',
            messsage: error.messsage
         });
      }
   }
}