'use strict';

const async = require('async');
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

async function buildcreateNewCompany(params) {
   var data = {
      name: params.name,
      description: params.description,
      link: params.link,
      state: params.state,
      created: params.created,
      updated: params.updated,
      last: params.last,
      email: params.email,
      password: params.password,
      address: params.address,
      schedule: params.schedule,
      map: params.map,
      lat: params.lat,
      ing: params.ing
   }
   return data;
}

async function checkEmptyValueCmpy(params) {

}

function validateEmailCmpy(email) {
   return re.test(String(email).toLowerCase());
}

module.exports = {
   validateEmailCmpy,
   checkEmptyValueCmpy,
   buildcreateNewCompany,

}