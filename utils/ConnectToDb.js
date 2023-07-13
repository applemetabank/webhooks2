const mongoose = require('mongoose');

async function connectDB() {  
  const dbUri = process.env.MONGODB_URI;
  
  if (!dbUri) {
    throw new Error('MONGODB_URI not set!');
  }
  
  console.log('Connecting to MongoDB...')
  
  for (let i = 0; i < 3; i++) {
    try {
      await mongoose.connect(dbUri, {
        poolSize: 10,
        useNewUrlParser: true,
        useUnifiedTopology: true  
      });
      break;  
    } catch (err) {
       console.log('MongoDB connection failed, retrying...')
    }
  }
  
  console.log('Connected!');
}

async function disconnectDB() {
  await mongoose.disconnect(); 
  console.log('Disconnected from MongoDB');
}

process.on('SIGTERM', disconnectDB);
process.on('SIGINT', disconnectDB);

module.exports = {  
  connectDB,
  disconnectDB,
  db: mongoose   
}