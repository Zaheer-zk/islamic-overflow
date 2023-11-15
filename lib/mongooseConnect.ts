import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_CONNECTION_URL) {
    return console.log('Please specify a connection');
  }

  if (isConnected) {
    return console.log('Already connected to mongodb');
  }

  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
      dbName: 'Islamic-overflow',
    });

    console.log('Connected to mongodb');

    isConnected = true;
  } catch (error) {
    console.log('Error connecting to mongodb: ' + error);
  }
};
