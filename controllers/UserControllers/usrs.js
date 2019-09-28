'use strict';

const models = require('../../models');
const bcrypt = require('bcrypt');
const jwtToken = require('../../middleware/Users/encode_user');
var methodUser = require('./auxMethodUser/auxmethod');
var mailerMethod = require('../EmailConfirm/confirm');
const async = require('async');

async function createNewUser(req, res) {
  try {
    var params = req.body;
    var checkValue = await methodUser.checkEmptyValueUsrs(params);

    if (checkValue) {
      if (methodUser.validateEmailUsrs(params.email)) {
        var info = await methodUser.buildUserObject(params);
        var data = await models.Users.create(info);

        if (data !== null && data.length > 0) {
          await mailerMethod.verifyRegister(data.email, data.id);
          return res.status(200).json({
            data,
            code: 'API_U_200',
            message: 'Registro de usuario correcto.'
          });
        }
        return res.status(200).json({
          code: 'API_U_403',
          message: 'Fallo en el registro de usuario.'
        });
      } else {
        return res.status(200).json({
          code: 'API_U_403',
          message: 'Formato de correo no valido.'
        });
      }
    } else {
      return res.status(200).json({
        code: 'API_U_403',
        message: 'Debe llenar todos los campos.'
      });
    }

  } catch (error) {
    return res.status(200).json({
      code: 'API_U_403',
      message: error.message
    });
  }
}

async function listsUsers(req, res) {
  try {
    var data = await models.Users.findAll({});
    if (data !== null && data.length > 0)
      return res.status(200).json({
        data,
        code: 'API_U_200',
        message: 'Listado de usuarios correcto.'
      });
    return res.status(200).json({
      code: 'API_U_403',
      message: 'No hay datos de usuarios.'
    });
  } catch (error) {
    return res.status(200).json({
      code: 'API_U_403',
      message: error.message
    });
  }
}

async function viewDetailUser(req, res) {
  try {
    var idUrs = req.params.id;
    var checkIdUsrs = await methodUser.checkValueIdUsr(idUrs);
    if (!checkIdUsrs) {
      return res.status(200).json({
        code: 'API_U_404',
        message: 'Debe proporcionar un identificador a buscar.'
      });
    } else {
      var data = await models.Users.findOne({
        where: {
          id: idUrs
        }
      });

      if (data !== null && data.length > 0)
        return res.status(200).json({
          data,
          code: 'API_U_200',
          message: 'Detalle del usuario.'
        });
      return res.status(200).json({
        code: 'API_U_403',
        message: 'Este usuario no existe.'
      });
    }
  } catch (error) {
    return res.status(200).json({
      code: 'API_U_403',
      message: error.message
    });
  }
}

async function updateDataUsr(req, res) {
  try {
    var idUrs = req.params.id;
    var checkIdUsrs = await methodUser.checkValueIdUsr(idUrs);
    if (!checkIdUsrs) {
      return res.status(200).json({
        code: 'API_U_404',
        message: 'Debe proporcionar un identificador a buscar.'
      });
    } else {
      var checkUpdateUser = await methodUser.buildUserObject(params);
      var data = await models.Users.update({
        checkUpdateUser
      }, {
        where: {
          id: idUrs
        }
      });
      if (data !== null && data.length > 0)
        return res.status(200).json({
          data,
          code: 'API_U_200',
          message: 'Fallo al actualizar sus datos. Pruebe nuevamente'
        });
      return res.status(200).json({
        code: 'API_U_403',
        message: 'Datos actualizados con éxito.'
      });
    }
  } catch (error) {
    return res.status(200).json({
      code: 'API_U_403',
      message: error.message
    });
  }
}

async function deleteInfoUser(req, res) {
  try {
    var idUrs = req.params.id;
    if (await methodUser.checkValueIdUsr(idUrs)) {
      var data = await models.Users.destroy({
        limit: 1,
        where: {
          id: idUrs
        }
      });

      if (data >= 1)
        return res.status(200).json({
          code: 'API_U_200',
          message: 'Usuario eliminado con éxito.'
        });
      return res.status(200).json({
        code: 'API_U_403',
        message: 'Fallo al eliminar el usuario. Pruebe nuevamente'
      });
    } else {
      return res.status(200).json({
        code: 'API_U_402',
        message: 'Debe proporcionar un identificador a buscar.'
      });
    }
  } catch (error) {
    return res.status(200).json({
      code: 'API_U_403',
      message: error.message
    });
  }
}

async function loginUser(req, res) {
  try {
    var params = req.body;
    if (await methodUser.checkEmptyValueUsrsLogin(params)) {
      if (await methodUser.validateEmailUsrs(params.email)) {
        var infoEmail = await models.Users.findOne({
          where: {
            email: params.email
          }
        });

        if (infoEmail !== null && infoEmail.length > 0) {
          if (await bcrypt.compare(params.user_pass, infoEmail.user_pass)) {
            var token = jwtToken.auth_users(infoEmail);
            return res.status(200).json({
              infoEmail,
              token: token,
              code: 'API_U_403',
              message: 'Inicio de sesión exitoso.'
            });
          } else {
            return res.status(200).json({
              code: 'API_U_403',
              message: 'Contraseña incorrecta. Pruebe nuevamente.'
            });
          }
        } else {
          return res.status(200).json({
            code: 'API_U_403',
            message: 'Este correo no existe en nuestros registros. Pruebe con otro.'
          });
        }
      } else {
        return res.status(200).json({
          code: 'API_U_403',
          message: 'Formato de correo no válido.'
        });
      }
    } else {
      return res.status(200).json({
        code: 'API_U_403',
        message: 'Debe llenar los dos campos.'
      });
    }
  } catch (error) {
    return res.status(200).json({
      code: 'API_U_403',
      message: error.message
    });
  }
}

module.exports = {
  loginUser,
  listsUsers,
  updateDataUsr,
  createNewUser,
  viewDetailUser,
  deleteInfoUser,
}