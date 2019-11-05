'use strict';

const getSalt = 10;
const bcrypt = require('bcrypt');
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

async function buildObjectCompany(params) {
   var data = {
      name: params.name,
      description: params.description,
      link: params.link,
      state: params.state,
      created: params.created,
      updated: params.updated,
      last: params.last,
      email: params.email,
      password: await bcrypt.hash(params.password, getSalt),
      address: params.address,
      schedule: params.schedule,
      map: params.map,
      lat: params.lat,
      ing: params.ing
   }
   return data;
}

async function checkEmptyValueCmpy(params) {
   if (params.name !== '' && params.description !== '' && params.link !== '' &&
      params.state !== '' && params.created !== '' && params.updated !== '' &&
      params.last !== '' && params.email !== '' && params.password !== '' &&
      params.address !== '' && params.schedule !== '' && params.map !== '' &&
      params.lat !== '' && params.ing !== '')
      return true;
   return false;
}

async function validateEmailCmpy(email) {
   return re.test(String(email).toLowerCase());
}

async function checkValLog(params) {
   return params.email !== '' && params.password !== '' ? true : false
}

async function validateEmptyIdCpmy(idCmpy) {
   return idCmpy !== null && idCmpy !== undefined && idCmpy !== '' ? true : false;
}

module.exports = {
   checkValLog,
   validateEmailCmpy,
   buildObjectCompany,
   validateEmptyIdCpmy,
   checkEmptyValueCmpy,
}
