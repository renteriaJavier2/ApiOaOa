'use strict';

const moment = require('moment');
const JWT = require('jwt-simple');
const UNWRITTING_VALUE = '(//&%$%&(($!""#4';

exports.encode_companies = async function(_objcmpy){
    var payloadCompany = {
        name: _objcmpy.name,
        address: _objcmpy.address,
        iap:moment.unix(),
        exp: moment().add(1, "days").unix()
    }
    return JWT.encode(payloadCompany, UNWRITTING_VALUE)
}