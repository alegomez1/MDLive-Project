let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should;
let expect = chai.expect;
chai.use(chaiHttp);

//****ID TESTS*****//

//Checks to see that all 50 items are in the database
describe('/apps Without range or parameters', () => {

  it('Should return 50 apps/items', function(done) {
    chai.request(server)
    .get('/apps')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(50);
      done();
    });
  });
});

//Checks that range by id with a start query but no end query returns 41 items
describe('/apps?rangeBy=id&start=10', () => {

  it('Should return 41 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=id&start=10')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(41);
      done();
    });
  });
});

//End value greater than 50
describe('/apps?rangeBy=id&start=5&end=500', () => {

  it('Should return 46 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=id&start=5&end=500')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(46);
      done();
    });
  });
});

//Checks that the proper number of items are returned if max is less that start and end values
describe('/apps?rangeBy=id&start=30&end=45&max=4', () => {

  it('Should return 4 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=id&start=30&end=45&max=4')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(4);
      done();
    });
  });
});

//Checks that the proper number of items are returned when max query value is greater than end-start values
describe('/apps?rangeBy=id&start=3&end=25&max=58', () => {

  it('Should return 4 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=id&start=3&end=25&max=58')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(23);
      done();
    });
  });
});

//****NAME TESTS*****//

//Start query passed but no end or max
describe('/apps?rangeBy=name&start=my-app-004', () => {

  it('Should return 47 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=name&start=my-app-004')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(47);
      done();
    });
  });
});

//Start and max query are passed but no end
describe('/apps?rangeBy=name&start=my-app-004&max=10', () => {

  it('Should return 10 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=name&start=my-app-004&max=10')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(10);
      done();
    });
  });
});

//Start and end query are passed but no max
describe('/apps?rangeBy=name&start=my-app-014&end=my-app-036', () => {

  it('Should return 23 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=name&start=my-app-014&end=my-app-036')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(23);
      done();
    });
  });
});

//Start, end, and max queries are passed
describe('/apps?rangeBy=name&start=my-app-011&end=my-app-046&max=7', () => {

  it('Should return 7 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=name&start=my-app-011&end=my-app-046&max=7')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(7);
      done();
    });
  });
});

//Start, end, and max queries are passed, but max value is greater than length of items
describe('/apps?rangeBy=name&start=my-app-010&end=my-app-032&max=70', () => {

  it('Should return 23 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=name&start=my-app-010&end=my-app-032&max=70')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(23);
      done();
    });
  });
});

//End value is beyond 50
describe('/apps?rangeBy=name&start=my-app-010&end=my-app-534', () => {

  it('Should return 41 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=name&start=my-app-010&end=my-app-534')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(41);
      done();
    });
  });
});

