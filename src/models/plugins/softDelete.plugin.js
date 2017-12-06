const excludeDeletedMiddleware = function (next) {
    if (!this.options.includeDeleted) {
        this.where('deleted').ne(true);
    }

    next();
};

const filterDeletedSubDocs = (doc, path) => {
    let subDocs = doc.get(path);
    
    doc.set(path, subDocs && subDocs.filter(subDoc => !subDoc.get('deleted')));
    doc.unmarkModified(path);
};

const filterDeletedMiddleware = path => function (doc) {
    if (!this.options.includeDeleted && doc) {
        if (Array.isArray(doc)) {
            doc.forEach(d => filterDeletedSubDocs(d, path));
        } else {
            filterDeletedSubDocs(doc, path);
        }
    }
};

module.exports = (schema, options) => {
    schema.eachPath((path, schemaType) => {
        if (schemaType.schema && schemaType.schema.get('softDelete')) {
            schema.post('find', filterDeletedMiddleware(path));
            schema.post('findOne', filterDeletedMiddleware(path));
            schema.post('findOneAndUpdate', filterDeletedMiddleware(path));
            schema.post('count', filterDeletedMiddleware(path));
        }
    });

    if (schema.get('softDelete')) {
        schema.add({
            deleted: {
                type: Boolean,
                default: false,
                required: true
            }
        });

        schema.methods.delete = function (callback) {
            this.set('deleted', true);
    
            let topEntity = this.ownerDocument ?
                this.ownerDocument() :
                this;

            return topEntity.save(callback);
        };

        schema.pre('find', excludeDeletedMiddleware);
        schema.pre('findOne', excludeDeletedMiddleware);
        schema.pre('findOneAndUpdate', excludeDeletedMiddleware);
        schema.pre('count', excludeDeletedMiddleware);
    }
};