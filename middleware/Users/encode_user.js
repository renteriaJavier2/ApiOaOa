'use strict';

const moment = require('moment');
const JWT = require('jwt-simple');
const UNWRITTING_VALUE = 'DGER%&%7567&/)/()&/';

exports.auth_users = function (_objcusr) {
   var playload_usr = {
      user_pro_id: _objcusr.user_pro_id,
      user_type_id: _objcusr.user_type_id,
      user_name: _objcusr.user_name,
      user_lastname: _objcusr.user_lastname,
      user_email: _objcusr.user_email,
      user_state: _objcusr.user_state,
      user_visible: _objcusr.user_visible,
      iap:moment.unix(),
      exp:moment.unix()
   }
   return JWT.encode(UNWRITTING_VALUE, playload_usr);
}