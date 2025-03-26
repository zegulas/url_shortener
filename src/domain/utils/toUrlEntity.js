const Url = require('../entities/Url');

const toUrlEntity = (data) => {
    return data instanceof Url ? data : new Url(data);
};

module.exports = toUrlEntity;