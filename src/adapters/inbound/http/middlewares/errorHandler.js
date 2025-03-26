const NotFoundUrlError = require('../../../../domain/errors/NotFoundUrlError');
const ExpiredUrlError = require('../../../../domain/errors/ExpiredUrlError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundUrlError) {
    return res.status(404).json({ error: err.message });
  }

  if (err instanceof ExpiredUrlError) {
    return res.status(410).json({ error: err.message }); // 410 Gone
  }

  console.error('Unhandled error:', err);
  return res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
