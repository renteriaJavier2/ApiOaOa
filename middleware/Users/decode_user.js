'use strict';

var jwt_simple = require('jwt-simple');
const moment = require('moment');
const UNWRITTING_VALUE = 'DGER%&%7567&/)/()&/';

exports.decode_user = async function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({
            message: "La petición no tiene la cabecera de autenticación"
        })
    } else {
        var tokenSend = req.headers.authorization.replace(/['"]+/g, '');
        try {
            var dataRegrex = jwt_simple.decode(tokenSend, UNWRITTING_VALUE, 'RS256');
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
        req.usuario = dataRegrex;
        next();
    }
}