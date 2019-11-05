'use strict';

const async = require('async');
const moment = require('moment');
const JWT = require('jwt-simple');
const UNWRITTING_VALUE = 'SDGET%Y/U%&UYHSERG%';

exports.encode_usersapp = async (_objcuapp) => {
   var payload_ursapp = {
      id: _objcuapp.id,
      first_name: _objcuapp.first_name,
      last_name: _objcuapp.last_name,
      email: _objcuapp.email,
      iap: moment().unix(),
      exp: moment().add(1, "days").unix()
   }
   return JWT.encode(payload_ursapp, UNWRITTING_VALUE);
}