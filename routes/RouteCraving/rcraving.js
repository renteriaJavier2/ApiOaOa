'use strict';

const express = require('express');
const routes = express.Router();
const middleCmpy = require('../../middleware/Companies/decode_company');
const CravingController = require('../../controllers/CravingControllers/craving');

/* -------------------------------------------------------------------------------------------------------------- */ 
routes.route('/craving-create/', middleCmpy.decode_company).post(CravingController.createMyCraving);
/* -------------------------------------------------------------------------------------------------------------- */ 
routes.route('/craving-lists/', middleCmpy.decode_company).get(CravingController.listsCravingByCompany);
routes.route('/craving-lists-ctgs/:id', middleCmpy.decode_company).get(CravingController.listsCravingByCategorys);
/* -------------------------------------------------------------------------------------------------------------- */ 
routes.route('/craving-update/:id', middleCmpy.decode_company).put(CravingController.updateCravingById);
/* -------------------------------------------------------------------------------------------------------------- */ 
routes.route('/craving-delete/:id', middleCmpy.decode_company).delete(CravingController.deleteCraving);
/* -------------------------------------------------------------------------------------------------------------- */ 

module.exports = routes;
