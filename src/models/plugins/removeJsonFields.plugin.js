module.exports = (schema, options) => {
    let toJSONOptions = schema.get('toJSON') || {};
    let originalTransform = toJSONOptions.transform;

    toJSONOptions.transform = (doc, ret) => {
        options.forEach(field => delete ret[field]);

        return typeof originalTransform == 'function' ?
            originalTransform(doc, ret) :
            ret;
    };
};