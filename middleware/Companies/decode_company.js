'use strict';

const moment = require('moment');
const JWT = require('jwt-simple');
const UNWRITTING_VALUE = '(//&%$%&(($!""#4';

exports.decode_company = async function (req, res, next) {
   if (!req.headers.authorization) {
      return res.status(403).json({
         message: "La petición no tiene la cabecera de autenticación"
      })
   } else {
      var tokenSend = req.headers.authorization.replace(/['"]+/g, '');
      try {
         var dataRegrex = JWT.decode(tokenSend, UNWRITTING_VALUE, 'RS256');
         if (dataRegrex.exp <= moment().unix()) {
            return res.status(403).json({
               message: "El token ha expirado"
            })
         }
      } catch (excepcion) {
         return res.status(403).json({
            message: "El token no es válido"
         })
      }
      req.company = dataRegrex;
      next();
   }
}