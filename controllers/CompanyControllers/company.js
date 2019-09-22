'use strict';

const async = require('async');
const models = require('../../models');
const methodCompany = require('./auxMethodCompany/auxMethod');

async function createNewCompany(req, res) {
   try {
      var params = req.body;
      var checkValue = await methodCompany.checkEmptyValueCmpy(params);
      if (checkValue) {
         if (methodCompany.validateEmailCmpy(params.email)) {
            var info = await methodCompany.buildcreateNewCompany(params);
            var data = await models.Companies.create(info);
         } else {

         }
      } else {

      }

   } catch (error) {
      console.log(JSON.stringify(error));
   }
}

module.exports = {
   createNewCompany,
}