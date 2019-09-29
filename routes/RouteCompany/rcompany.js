'use strict';

const express = require('express');
const routes = express.Router();
const CompanyDecode = require('../../middleware/Companies/decode_company');
const CompanyController = require('../../controllers/CompanyControllers/company');

routes.post('/company-create/', CompanyDecode.decode_company, CompanyController.createNewCompany);
routes.post('/company-login/', CompanyController.loginCompany);

routes.get('/company-lists/', CompanyDecode.decode_company, CompanyController.listCompanies);
routes.get('/company-view/:id?', CompanyDecode.decode_company, CompanyController.viewDetailCompany);

routes.put('/company-update/:id?', CompanyDecode.decode_company, CompanyController.updateCompany);

module.exports = routes;