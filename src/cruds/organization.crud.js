const mongoose = require('mongoose');
const extractProps = require('../extractProps');
const {EventsErrorResourceNotFound} = require('../eventsErrors');

const Organization = mongoose.model('Organization');


const getAll = async (req, res) => {
    let organizations = await Organization.find().exec();

    res
        .status(200)
        .json(organizations)
        .end();
};

const getById = async (req, res) => {
    let organizationId = req.params.id;
    let organization = await Organization.findById(organizationId).exec();

    if (!organization) {
        throw new EventsErrorResourceNotFound({message: `Organization with id ${organizationId} not found.`});
    } else {
        res
            .status(200)
            .json(organization)
            .end();
    }
};

const create = async (req, res) => {
    let newOrganization = new Organization(extractProps(req.body.data, ['name']));
    
    await newOrganization.save();
    
    res
        .status(200)
        .json(newOrganization)
        .end();
};

const updateById = async (req, res) => {
    let newValues = extractProps(req.body.data, ['name']);

    let updatedOrganization = await Organization
        .findByIdAndUpdate(req.params.id, newValues, {new: true})
        .exec();

    res
        .status(200)
        .json(updatedOrganization)
        .end();
};

const deleteById = async (req, res) => {
    let organizationToDelete = await Organization.findById(req.params.id);

    if (!organizationToDelete) {
        throw new EventsErrorResourceNotFound({message: `Organization with id ${organizationId} not found.`});
    }

    await organizationToDelete.delete();

    res
        .status(200)
        .end();
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};