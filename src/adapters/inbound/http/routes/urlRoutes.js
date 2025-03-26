const express = require('express');
const router = express.Router();

module.exports = (urlService) => {
    router.post('/shorten', async (req, res, next) => {
        try {
            const { originalUrl, expiresAt } = req.body;

            if (!originalUrl) {
                return res.status(400).json({ error: 'originalUrl is required' });
            }

            const urlEntity = await urlService.createShortUrl(originalUrl, expiresAt);
            res.json({ shortUrl: `http://localhost:3000/${urlEntity.shortCode}` });
        } catch (err) {
            next(err);
        }
    });

    router.get('/:shortCode', async (req, res, next) => {
        try {
            const originalUrl = await urlService.getOriginalUrl(req.params.shortCode);
            res.redirect(originalUrl);
        } catch (err) {
            next(err); // ✅ passed to centralized handler
        }
    });

    return router;
};
