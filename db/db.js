import mongoose from 'mongoose'; // Use import instead of require for consistency with ES modules

export const db = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URL)
    console.log('DB connection successful');
  } catch (error) {
    console.log('DB connection failed:', error);
  }
};
