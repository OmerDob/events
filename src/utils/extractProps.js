module.exports = (obj = {}, props = []) => {
    const addKeyToRes = (res, key) => {
        return obj.hasOwnProperty(key) ?
            {...res, [key]: obj[key]} :
            res;
    };

    return props.reduce(addKeyToRes, {});
};