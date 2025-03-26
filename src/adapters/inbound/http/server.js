require('dotenv').config();
const startServer = async () => {
    const express = require('express');
    const MongoUrlRepository = require('../../outbound/persistence/MongoUrlRepository');
    const UrlService = require('../../../domain/services/UrlService');
    const createRoutes = require('./routes/urlRoutes');
    const { connectToMongo, disconnectMongo } = require('../../../infrastructure/db/mongooseClient');
    const errorHandler = require('./middlewares/errorHandler');

    await connectToMongo();
  
    const app = express();
    app.use(express.json());
  
    const urlRepository = new MongoUrlRepository();
    const urlService = new UrlService(urlRepository);
    app.use('/', createRoutes(urlService));

    // Centralized error handling middleware (must be last!)
    app.use(errorHandler);
  
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    process.on('SIGINT', async () => {
        await disconnectMongo();
        console.log('🔌 MongoDB disconnected. Server shutting down.');
        process.exit(0);
    });      
  };
  
  startServer().catch((err) => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  });
  