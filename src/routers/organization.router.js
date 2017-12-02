const express = require('express');
const organizationCrud = require('../cruds/organization.crud');
const catchAsyncErrors = require('../catchAsyncErrors');

const organizationRouter = express.Router();

organizationRouter.get('/', catchAsyncErrors(organizationCrud.getAll));

organizationRouter.get('/:id', catchAsyncErrors(organizationCrud.getById));

organizationRouter.post('/', catchAsyncErrors(organizationCrud.create));

organizationRouter.put('/:id', catchAsyncErrors(organizationCrud.updateById));

organizationRouter.delete('/:id', catchAsyncErrors(organizationCrud.deleteById));

module.exports = organizationRouter;