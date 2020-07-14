import * as Mongoose from 'mongoose';

const mongourl = process.env.MONGO || '';

export function connectMongo() {
  Mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  });
  const db = Mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to Mongodb');
  });
}