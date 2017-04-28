var imdbApi = require('../api/imdb/imdbApi');
var config = require('../../config/config');

/**
 * getReq
 *
 * call imdbApi getReq and send result to requestor
 *
 * @param req: request from express
 * @param res: response
 */
exports.getReq = function(req,res) {
  //use api configuration to make request to api
  if(config.api_config){
    if(config.offline == 1){
      res.status(200).send(config.offlineResponse);
    } else {

      /*
      example search object:
      var searchObject = {
        year: 1999,
        id: 'jenny8675309',
        name: 'office'
      };
      */

      var searchObject = {
        year: req.query.year,
        id: req.query.id,
        name: req.query.name
      };

      imdbApi.getReq(config.api_config, searchObject, function(err, results){
        if(!err){
          res.status(200).send(results);
        } else {
          res.status(201).send(err);
        }
      });
    }
  } else {
    res.status(400).send('Error during getReq imdb request. Missing config?');
  }
}
