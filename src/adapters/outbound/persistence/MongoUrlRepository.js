const UrlRepository = require('../../../domain/ports/UrlRepository');
const UrlModel = require('../../../infrastructure/db/urlModel');
const Url = require('../../../domain/entities/Url');

class MongoUrlRepository extends UrlRepository {
    async save(urlEntity) {
        await UrlModel.create(urlEntity.toJSON());
    }

    async findByShortCode(shortCode) {
        const doc = await UrlModel.findOne({ shortCode }).lean(); // lean() returns plain object
        return doc ? new Url(doc) : null;
    }      
}

module.exports = MongoUrlRepository;