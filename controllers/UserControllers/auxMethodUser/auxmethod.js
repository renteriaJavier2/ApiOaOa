'use strict';

const async = require('async');
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

async function checkEmptyValueUsrs(params) {
   if (params.user_email !== '' && params.user_lastname !== '' &&
      params.user_name !== '' && params.user_pass !== '') {
      return true;
   }
   return false;
}

function validateEmailUsrs(email) {
   return re.test(String(email).toLowerCase());
}

async function checkValueIdUsr(idUrs) {
   return (idUrs !== undefined && idUrs !== '' && idUrs !== null) ? true : false;
}

async function buildObjectCreateNewUser(params) {
   var data = {
      user_pro_id: params.user_pro_id,
      user_type_id: params.user_type_id,
      user_name: params.user_name,
      user_pass: params.user_pass,
      user_lastname: params.user_lastname,
      user_email: params.user_email,
      user_state: params.user_state,
      user_visible: params.user_visible
   }
   return data;
}

module.exports = {
   checkValueIdUsr,
   validateEmailUsrs,
   checkEmptyValueUsrs,
   buildObjectCreateNewUser,
}