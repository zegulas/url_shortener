class ExpiredUrlError extends Error {
    constructor(shortCode) {
      super(`Short URL has expired: ${shortCode}`);
      this.name = 'ExpiredUrlError';
    }
  }
  
  module.exports = ExpiredUrlError;
  