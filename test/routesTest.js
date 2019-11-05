let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
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

//Start query but no end or max values
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

//Start and end query, but no max value
describe('/apps?rangeBy=id&start=15&max=13', () => {

  it('Should return 13 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=id&start=15&max=13')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(13);
      done();
    });
  });
});

//End query but no start or max values
describe('/apps?rangeBy=id&end=20', () => {

  it('Should return 21 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=id&end=20')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(20);
      done();
    });
  });
});

//End and max queries, but no start values
describe('/apps?rangeBy=id&end=30&max=5', () => {

  it('Should return 5 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=id&end=30&max=5')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(5);
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

//Max query value is less that start and end values
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

//Max query value is greater than end-start values
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

//End query passed but no end or max
describe('/apps?rangeBy=name&end=my-app-030', () => {

  it('Should return 30 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=name&end=my-app-030')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(30);
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

//End and max query are passed but no start
describe('/apps?rangeBy=name&end=my-app-034&max=14', () => {

  it('Should return 14 apps/items', function(done) {
    chai.request(server)
    .get('/apps?rangeBy=name&end=my-app-034&max=14')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.have.length(14);
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

