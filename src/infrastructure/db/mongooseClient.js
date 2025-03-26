const mongoose = require('mongoose');

const connectToMongo = async (retries = 5, delay = 2000) => {
    while (retries) {
      try {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        console.log('✅ MongoDB connected');
        break;
      } catch (err) {
        console.error(`❌ MongoDB connection failed. Retries left: ${retries - 1}`);
        retries--;
        if (!retries) {
          console.error('💥 All retries exhausted. Exiting.');
          process.exit(1);
        }
        await new Promise((res) => setTimeout(res, delay));
      }
    }
};

const disconnectMongo = async () => {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
};
  
module.exports = { connectToMongo, disconnectMongo };