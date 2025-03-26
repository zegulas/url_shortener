const crypto = require('crypto');
const Url = require('../entities/Url');
const toUrlEntity = require('../utils/toUrlEntity');
const NotFoundUrlError = require('../errors/NotFoundUrlError');
const ExpiredUrlError = require('../errors/ExpiredUrlError');

class UrlService {
    constructor(urlRepository) {
        this.urlRepository = urlRepository;
    }

    async createShortUrl(originalUrl, expiresAt = null) {
        const shortCode = crypto.randomBytes(4).toString('hex');

        const urlEntity = new Url({
            originalUrl,
            shortCode,
            expiresAt,
        });

        await this.urlRepository.save(urlEntity);

        return urlEntity;
    }

    async getOriginalUrl(shortCode) {
        const result = await this.urlRepository.findByShortCode(shortCode);
        
        if(!result) {
            throw new NotFoundUrlError(shortCode);
        }

        const urlEntity = toUrlEntity(result);

        if(urlEntity.hasExpired()) {
            throw new ExpiredUrlError(shortCode);
        }

        return urlEntity.originalUrl;
    }
}

module.exports = UrlService;