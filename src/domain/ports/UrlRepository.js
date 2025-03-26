// Acts as an interface

class UrlRepository {
    async save(urlEntity) {
        throw new Error('save function not implemented');
    }

    async findByShortCode(shortCode) {
        throw new Error('findByShortCode function not implemented');
    }
}

module.exports = UrlRepository;