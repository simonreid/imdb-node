var https = require('https');
var qs = require('querystring');
const imdbApi = require('imdb-api');


/**
 * getReq
 * use imdb api to request search results
 * returns either a movie or an episode object
 *
 * @param api_config
 * @param searchObject:
 *  name: string;
 *  id: string;
 *  year: number;
 * @param callback
 */
exports.getReq = function(api_config, searchObject, callback){
    //promise for result data; callback function also available
    //getReq allows for various search params
    imdbApi.getReq(searchObject).then(
      //results, not errors, are coming back as first parameter here!!
      function(results, err){
        callback(err, results);
      }
    )
    //catch a problem with api request
    .catch(function(e){
      callback(e, null);
    });
}

