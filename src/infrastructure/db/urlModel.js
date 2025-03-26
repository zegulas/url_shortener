const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },     
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default: null
    }
});

// ⏳ TTL index to auto-delete expired URLs
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const UrlModel = mongoose.model('Url', urlSchema);
module.exports = UrlModel;