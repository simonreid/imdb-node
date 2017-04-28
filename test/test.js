var request = require("request"),
    assert = require('assert'),
    app = require("../server.js"),
    base_url = "http://localhost:3000/";

describe("Basic Server Functionality", function() {
  describe("GET / and api/search", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });

    it("imdb api returns status code 200 and at least 1 result", function(done) {
      request.get(base_url + 'api/search?name=snatch', function(error, response, body) {
        //check response
        assert.equal(200, response.statusCode);
        //ensure first item has a title as a quick test
        assert.notEqual(JSON.parse(body).title, null);
        app.closeServer();
        done();
      });
    });
  });
});
