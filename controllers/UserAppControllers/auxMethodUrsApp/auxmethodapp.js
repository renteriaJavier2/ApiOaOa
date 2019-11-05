'use strict';

const getSalt = 10;
const bcrypt = require('bcrypt');
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

async function buildCreateUserApp(params) {
   let info = {
      first_name: params.first_name,
      last_name: params.last_name,
      email: params.email,
      password: await bcrypt.hash(params.password, getSalt),
   }
   return info;
}

async function buildUpdateUserApp(params) {
   let info = {
      first_name: params.first_name,
      last_name: params.last_name,
      email: params.email,
      password: await bcrypt.hash(params.password, getSalt),
   }
   return info;
}

async function checkEmailApp(email) {
   return re.test(String(email).toLowerCase());
}

async function checkValLog(params){
   return params.email !== '' && params.password !== '' ? true : false;
}

async function checkEmptyValApp(params) {
   if(params.first_name !== '' && params.last_name !== '' && 
      params.email      !== '' && params.password  !== ''){
      return true;
   }
   return false;
}

module.exports = {
   checkValLog,
   checkEmailApp,
   checkEmptyValApp,
   buildUpdateUserApp,
   buildCreateUserApp,
}