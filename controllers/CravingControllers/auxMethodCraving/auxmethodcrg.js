'use strict';

async function buildCreateMyCraving(params) {
   let info = {
      companyId: params.companyId,
      cravingCtgId: params.cravingCtgId,
      hasStock: params.hasStock,
      name: params.name,
      description: params.description,
      price: params.price
   }
   return info;
}

async function buildUpdateCravingById(params) {
   let info = {
      cravingCtgId: params.cravingCtgId,
      hasStock: params.hasStock,
      name: params.name,
      description: params.description,
      price: params.price
   }
   return info;
}

module.exports = {
   buildCreateMyCraving,
   buildUpdateCravingById,
}