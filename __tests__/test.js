var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;

describe('middleware', () => {
  var healthInfo, db;

  beforeAll(function (done) {
    MongoClient.connect(
      'mongodb+srv://numanzor:Nu121692.@microservice-tutorial-hq75f.mongodb.net/chronos-access', { useNewUrlParser: true }, function(err, client) {
        if (err) throw new Error(err);
        done();
        db = client.db('chronos-access');
        healthInfo = db.collection('healthinfos');
      }
    );
  });

  test('should have records in the "healthinfos" collection', done => {
   healthInfo.countDocuments(function (err, num) {
      expect(err).to.not.exist;
      expect(num).to.be.above(0);
      done();
    });
  });

  test('should have the right string and date-time fields', done => {
    healthInfo.find().toArray(function (err, data) {
      expect(err).to.not.exist;
      expect(data).to.be.an('Array');
      var dataPoint = data[0];
      expect(dataPoint.currentMicroservice).to.be.a('string').and.not.eql('');
      expect(dataPoint.targetedEndpoint).to.be.a('string').and.not.eql('');
      expect(dataPoint.reqType).to.be.a('string').and.not.eql('');
      expect(dataPoint.timeSent).to.be.a('date').and.not.eql('');
      done();
    });
  });

  afterAll(function () {
    db.close();
  });
});