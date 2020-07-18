import mongoose from 'mongoose';

const mongourl = process.env.MONGO || '';

export function connectMongo(): void {
  mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to Mongodb');
  });
}