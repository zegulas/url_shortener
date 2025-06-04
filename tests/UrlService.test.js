const crypto = require('crypto');
const UrlService = require('../src/domain/services/UrlService');
const Url = require('../src/domain/entities/Url');
const NotFoundUrlError = require('../src/domain/errors/NotFoundUrlError');
const ExpiredUrlError = require('../src/domain/errors/ExpiredUrlError');

describe('UrlService', () => {
  describe('createShortUrl', () => {
    it('creates and saves a new Url entity', async () => {
      const repo = { save: jest.fn() };
      const service = new UrlService(repo);
      jest.spyOn(crypto, 'randomBytes').mockReturnValueOnce(Buffer.from('aabbccdd', 'hex'));

      const result = await service.createShortUrl('https://example.com');

      expect(repo.save).toHaveBeenCalledTimes(1);
      expect(repo.save.mock.calls[0][0]).toBeInstanceOf(Url);
      expect(result.shortCode).toBe('aabbccdd');
      expect(result.originalUrl).toBe('https://example.com');

      crypto.randomBytes.mockRestore();
    });
  });

  describe('getOriginalUrl', () => {
    it('returns the original URL when found and not expired', async () => {
      const urlData = new Url({ originalUrl: 'https://example.com', shortCode: 'abcd1234' });
      const repo = { findByShortCode: jest.fn().mockResolvedValue(urlData) };
      const service = new UrlService(repo);

      const originalUrl = await service.getOriginalUrl('abcd1234');

      expect(originalUrl).toBe('https://example.com');
    });

    it('throws NotFoundUrlError when the short code does not exist', async () => {
      const repo = { findByShortCode: jest.fn().mockResolvedValue(null) };
      const service = new UrlService(repo);

      await expect(service.getOriginalUrl('missing')).rejects.toBeInstanceOf(NotFoundUrlError);
    });

    it('throws ExpiredUrlError when the URL has expired', async () => {
      const expired = new Date(Date.now() - 1000);
      const urlData = new Url({ originalUrl: 'https://example.com', shortCode: 'expired', expiresAt: expired });
      const repo = { findByShortCode: jest.fn().mockResolvedValue(urlData) };
      const service = new UrlService(repo);

      await expect(service.getOriginalUrl('expired')).rejects.toBeInstanceOf(ExpiredUrlError);
    });
  });
});
