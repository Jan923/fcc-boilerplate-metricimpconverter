const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

suite('Routing Test', function() {

  after(function() {
    chai.request(server)
      .get('/api')
    });
  
  suite('GET /api/convert to conversion', function() {
    test('Convert a valid input such as 10L: GET request to /api/convert', function() {
    chai
      .request(server) //connect to server
      .keepOpen() //stop refresh
      .get('/api/convert') //get request
      .query('input=10L') //input query
      .end(function(err, res) {
        assert.equal(res.status, 200); //check status
        assert.equal(res.body.initNum, 10); //check initNum
        assert.equal(res.body.initUnit, 'L'); //check initUnit
        assert.approximately(res.body.returnNum, 2.64172, 0.1); //check returnNum
        assert.equal(res.body.returnUnit, 'gal'); //check returnUnit
      })
    })
  })
})

  suite('Routing Test', function() {
    suite('GET /api/convert to conversion', function() {
      test('Convert a invalid input such as 32g: GET request to /api/convert', function() {
      chai
        .request(server) //connect to server
        .keepOpen() //stop refresh
        .get('/api/convert') //get request
        .query('input=32g') //input query
        .end(function(err, res) {
          assert.equal(res.status, 200); //check status
          assert.equal(res.body.initUnit, undefined); //check initUnit
        })
      })
    })
  })

  suite('Routing Test', function() {
    suite('GET /api/convert to conversion', function() {
      test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function() {
      chai
        .request(server) //connect to server
        .keepOpen() //stop refresh
        .get('/api/convert') //get request
        .query('input=3/7.2/4kg') //input query
        .end(function(err, res) {
          assert.equal(res.status, 200); //check status
          assert.equal(res.body.initNum, undefined); //check initNum
        })
      })
    })
  })

  suite('Routing Test', function() {
    suite('GET /api/convert to conversion', function() {
      test('Convert an invalid number such as 3/7.2/4kilomegagram: GET request to /api/convert', function() {
      chai
        .request(server) //connect to server
        .keepOpen() //stop refresh
        .get('/api/convert') //get request
        .query('input=3/7.2/4kilomegagram') //input query
        .end(function(err, res) {
          assert.equal(res.status, 200); //check status
          assert.equal(res.body.initNum, undefined); //check initNum
          assert.equal(res.body.initUnit, undefined); //check initUnit
        })
      })
    })
  })

  suite('Routing Test', function() {
    suite('GET /api/convert to conversion', function() {
      test('Convert with no number such as kg: GET request to /api/convert', function() {
      chai
        .request(server) //connect to server
        .keepOpen() //stop refresh
        .get('/api/convert') //get request
        .query('input=kg') //input query
        .end(function(err, res) {
          assert.equal(res.status, 200); //check status
          assert.equal(res.body.initNum, 1); //check initNum
          assert.equal(res.body.initUnit, 'kg'); //check initUnit
          assert.approximately(res.body.returnNum, 2.20462, 0.1); //check returnNum
          assert.equal(res.body.returnUnit, 'lbs'); //check returnUnit
        })
      })
    })
  })
  
});
