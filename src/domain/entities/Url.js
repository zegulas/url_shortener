class Url {
    constructor({originalUrl, shortCode, createdAt = new Date(), expiresAt = null}) {
        if (!originalUrl) throw new Error('originalUrl is required');
        if (!shortCode) throw new Error('shortCode is required');

        this.originalUrl = originalUrl;
        this.shortCode = shortCode;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }

    hasExpired() {
        if(!this.expiresAt) return false;
        return new Date() > this.expiresAt;
    }

    toJSON() {
        return {
            originalUrl: this.originalUrl,
            shortCode: this.shortCode,
            createdAt: this.createdAt,
            expiresAt: this.expiresAt
        };
    }
}

module.exports = Url; 