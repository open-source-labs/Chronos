const { expect } = require('chai');
const { MongoClient } = require('mongodb');

describe('middleware', () => {
  let healthInfo; let
    db;

  beforeAll((done) => {
    MongoClient.connect(
      'mongodb+srv://numanzor:Nu121692.@microservice-tutorial-hq75f.mongodb.net/chronos-access', { useNewUrlParser: true }, (err, client) => {
        if (err) throw new Error(err);
        done();
        db = client.db('chronos-access');
        healthInfo = db.collection('healthinfos');
      },
    );
  });

  test('should have records in the "healthinfos" collection', (done) => {
    healthInfo.countDocuments((err, num) => {
      expect(err).to.not.exist;
      expect(num).to.be.above(0);
      done();
    });
  });

  test('should have the right string and date-time fields', (done) => {
    healthInfo.find().toArray((err, data) => {
      expect(err).to.not.exist;
      expect(data).to.be.an('Array');
      const dataPoint = data[0];
      expect(dataPoint.currentMicroservice).to.be.a('string').and.not.eql('');
      expect(dataPoint.targetedEndpoint).to.be.a('string').and.not.eql('');
      expect(dataPoint.reqType).to.be.a('string').and.not.eql('');
      expect(dataPoint.timeSent).to.be.a('date').and.not.eql('');
      done();
    });
  });

  afterAll(() => {
    db.close();
  });
});
