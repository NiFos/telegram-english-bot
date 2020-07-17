import 'dotenv/config';
import { getUserWords, addWordToList, deleteAccount, checkWord } from '../../src/db/controllers/userController';
import 'mocha';
import { expect } from 'chai';
import * as mongoose from 'mongoose';


const userIdDoesNotExist = 123;
const userIdWithoutWords = 194244303;
const userIdWithWords = 194244304;
const testingWord = 'Testing word';

describe('Database', () => {
  before((done) => {
    mongoose.connect(process.env.MONGO_TEST);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
      console.log('Connected to test database!');
      done();
    });
  });

  after(done => {
    mongoose.connection.dropCollection(process.env.MONGO_TEST_COLLECTION_NAME)
      .then(() => {
        mongoose.connection.close(done);
      });
  });

  describe('Add words to user', () => {
    it('Adding without error', async () => {
      const response = await addWordToList(userIdWithWords, testingWord);
      expect(response).to.be.true;
    });

    it('Adding without userId and title (should be error)', async () => {
      const response = await addWordToList(null, null);
      expect(response).to.be.false;
    });
  });

  describe('Get user words', () => {
    it('Get user words for learning (with wrong user)', async () => {
      const words = await getUserWords(userIdDoesNotExist);
      expect(words).to.have.lengthOf(0);
    });

    it(`Get user words for learning (user don't have words)`, async () => {
      const words = await getUserWords(userIdWithoutWords);
      expect(words).to.have.lengthOf(0);
    });

    it(`Get user words for learning (user have words)`, async () => {
      const words = await getUserWords(userIdWithWords);
      expect(words).to.have.length.greaterThan(0);
    });
  });

  describe('Check word', () => {
    it('Checking without error', async () => {
      const response = await checkWord(userIdWithWords, testingWord);
      expect(response).to.be.true;
    });

    it('Checking without userId & title', async () => {
      const response = await checkWord(null, '');
      expect(response).to.be.false;
    });

    it('Checking with wrong title', async () => {
      const response = await checkWord(null, 'something else');
      expect(response).to.be.false;
    });
  });

  describe('Delete account', () => {
    it('Deleting without errors', async () => {
      const response = await deleteAccount(userIdWithWords);
      expect(response).to.be.true;
    });

    it('Deleting without userId', async () => {
      const response = await deleteAccount(null);
      expect(response).to.be.false;
    });

    it('Deleting with wrong userId', async () => {
      const response = await deleteAccount(userIdDoesNotExist);
      expect(response).to.be.false;
    });
  });
});