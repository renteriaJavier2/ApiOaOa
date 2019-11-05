'use strict';

const express = require('express');
const routes = express.Router();
const CompanyDecode = require('../../middleware/Companies/decode_company');
const CompanyController = require('../../controllers/CompanyControllers/company');

routes.route('/company-create/', CompanyDecode.decode_company).post(CompanyController.createNewCompany);
routes.route('/company-login/').post(CompanyController.loginCompany);

routes.route('/company-lists/', CompanyDecode.decode_company).get(CompanyController.listCompanies);
routes.route('/company-view/:id?', CompanyDecode.decode_company).get(CompanyController.viewDetailCompany);

routes.route('/company-update/:id?', CompanyDecode.decode_company).put(CompanyController.updateCompany);

routes.route('/company-delete/:id?', CompanyDecode.decode_company).delete(CompanyController.deleteCompany);

module.exports = routes;