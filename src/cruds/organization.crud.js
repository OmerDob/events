const mongoose = require('mongoose');
const extractProps = require('../utils/extractProps');
const {EventsErrorResourceNotFound, EventsErrorBase} = require('../utils/eventsErrors');

const Organization = mongoose.model('Organization');


const getAll = async (req, res) => {
    let organizations = await Organization.find().exec();

    res
        .status(200)
        .json(organizations)
        .end();
};

const getById = async (req, res) => {
    let organization = await getOrganizationById(req.params.id);

    res
        .status(200)
        .json(organization)
        .end();
};

const create = async (req, res) => {
    let organizationData = extractOrganizationData(req);
    let newOrganization = new Organization(organizationData);

    await validateOrganization(newOrganization, `Could not create organization ${JSON.stringify(organizationData)}.`);
    await newOrganization.save();
    
    res
        .status(201)
        .json(newOrganization)
        .end();
};

const updateById = async (req, res) => {
    let organizationId = req.params.id;
    let organization = await getOrganizationById(organizationId);
    
    Object.assign(organization, extractOrganizationData(req));

    await validateOrganization(organization, `Could not update organization ${organizationId}.`);
    await organization.save();

    res
        .status(200)
        .json(organization)
        .end();
};

const deleteById = async (req, res) => {
    let organizationToDelete = await getOrganizationById(req.params.id);

    await organizationToDelete.delete();

    res
        .status(204)
        .end();
};

const getOrganizationById = async organizationId => {
    let organization = await Organization.findById(organizationId);
    
    if (!organization) {
        throw new EventsErrorResourceNotFound({message: `Organization with id ${organizationId} not found.`});
    }

    return organization;
};

const extractOrganizationData = req => extractProps(req.body.data, ['name']);

const validateOrganization = async (organization, errorMessage) => {
    try {
        await organization.validate();
    } catch (validationResult) {
        let errors = validationResult.errors;
        let reason = Object
            .keys(errors)
            .map(path => errors[path].message)
            .join(' ');
        let message = errorMessage ?
            `${errorMessage} ${reason}` :
            reason;

        throw new EventsErrorBase({
            status: 400,
            message
        });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};