class NotFoundUrlError extends Error {
    constructor(shortCode) {
      super(`Short URL not found: ${shortCode}`);
      this.name = 'NotFoundUrlError';
    }
  }
  
  module.exports = NotFoundUrlError;
  