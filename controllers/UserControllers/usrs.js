'use strict';

const bcrypt = require('bcrypt');
const models = require('../../models');
var methodUser = require('./auxMethodUser/auxmethodurs');
var mailerMethod = require('../EmailConfirm/confirm');
const jwtToken = require('../../middleware/Users/encode_user');

module.exports = {
  createNewUser: async (req, res) => {
    try {
      var params = req.body;
      if (await methodUser.checkEmptyValueUsrs(params)) {
        if (await methodUser.validateEmailUsrs(params.user_email)) {
          var info = await methodUser.buildUserObject(params);
          var data = await models.Users.create(info);

          if (data === null || data.length < 0) {
            await mailerMethod.verifyRegister(data.email, data.id);
            return res.status(200).json({
              code: 'API_U_200',
              message: 'Fallo en el registro de usuario.'
            });
          }
          return res.status(200).json({
            data,
            code: 'API_U_200',
            message: 'Registro de usuario correcto.'
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
      console.log(error)
      return res.status(200).json({
        code: 'API_U_403',
        message: error.message
      });
    }
  },
  listsUsers: async (req, res) => {
    try {
      var data = await models.Users.findAll({
        attributes: ['id', 'user_pro_id', 'user_type_id', 'user_name', 'user_email', 'user_state', 'user_visible']
      });
      if (data === null || data.length < 0)
        return res.status(200).json({
          code: 'API_U_403',
          message: 'No hay datos de usuarios.'
        });
      return res.status(200).json({
        data,
        code: 'API_U_200',
        message: 'Listado de usuarios correcto.'
      });
    } catch (error) {
      return res.status(200).json({
        code: 'API_U_403',
        message: error.message
      });
    }
  },
  viewDetailUser: async (req, res) => {
    try {
      var idUrs = req.params.id;
      if (!await methodUser.checkValueIdUsr(idUrs)) {
        return res.status(200).json({
          code: 'API_U_404',
          message: 'Debe proporcionar un identificador a buscar.'
        });
      } else {
        var data = await models.Users.findAll({
          attributes: ['id', 'user_pro_id', 'user_type_id', 'user_name', 'user_email', 'user_state', 'user_visible'],
          where: {
            id: idUrs
          }
        });

        if (data === null || data.length < 0)
          return res.status(200).json({
            code: 'API_U_403',
            message: 'Este usuario no existe.'
          });
        return res.status(200).json({
          data,
          code: 'API_U_200',
          message: 'Detalle del usuario.'
        });
      }
    } catch (error) {
      return res.status(200).json({
        code: 'API_U_403',
        message: error.message
      });
    }
  },
  updateDataUsr: async (req, res) => {
    try {
      var idUrs = req.params.id;
      console.log(idUrs)
      if (!await methodUser.checkValueIdUsr(idUrs)) {
        return res.status(200).json({
          code: 'API_U_404',
          message: 'Debe proporcionar un identificador a buscar.'
        });
      } else {
        var params = req.body;
        var checkUpdateUser = await methodUser.buildUserObject(params);

        var data = await models.Users.update(
          checkUpdateUser, {
          returning: true,
          where: {
            id: idUrs
          }
        });
        if (data === null || data.length < 0)
          return res.status(200).json({
            code: 'API_U_403',
            message: 'Fallo al actualizar sus datos. Pruebe nuevamente'
          });
        return res.status(200).json({
          data,
          code: 'API_U_200',
          message: 'Datos actualizados con éxito.'
        });
      }
    } catch (error) {
      return res.status(200).json({
        code: 'API_U_403',
        message: error.message
      });
    }
  },
  deleteInfoUser: async (req, res) => {
    try {
      var idUrs = req.params.id;
      if (await methodUser.checkValueIdUsr(idUrs)) {
        var data = await models.Users.destroy({
          limit: 1,
          where: {
            id: idUrs
          }
        });

        if (data == 1)
          return res.status(200).json({
            data,
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
  },
  loginUser: async (req, res) => {
    try {
      var params = req.body;
      if (await methodUser.checkEmptyValueUsrsLogin(params)) {
        if (await methodUser.validateEmailUsrs(params.user_email)) {
          var data = await models.Users.findOne({
            where: {
              user_email: params.user_email
            }
          });

          if (data === null || data.length < 0) {
            return res.status(200).json({
              code: 'API_U_403',
              message: 'Este correo no existe en nuestros registros. Pruebe con otro.'
            });
          } else {

            if (await bcrypt.compare(params.user_pass, data.user_pass)) {
              var token = await jwtToken.encode_users(data);
              return res.status(200).json({
                data,
                token: token,
                code: 'API_U_200',
                message: 'Inicio de sesión exitosa.'
              })
            } else {
              return res.status(200).json({
                code: 'API_U_403',
                message: 'Contraseña incorrecta. Pruebe nuevamente.'
              });
            }
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
}