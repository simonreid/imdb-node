(function(){

angular.module('IMDBSearchCtrl',[])

//lodash
.constant('_', window._)

//service to track all pending xhr requests.
//created in order to enable cancelation (really resolving all unresolved promises) of xhr.
.service('pendingRequests', function() {
  var pending = [];
  this.get = function() {
    return pending;
  };
  this.add = function(request) {
    pending.push(request);
  };
  this.remove = function(request) {
    pending = _.filter(pending, function(p) {
      return p.url !== request;
    });
  };
  this.cancelAll = function() {
    angular.forEach(pending, function(p) {
      p.canceller.resolve();
    });
    pending.length = 0;
  };
})

//http request wrapper to facilitate tracking of requests
.service('httpService', ['$http', '$q', 'pendingRequests', function($http, $q, pendingRequests) {
  this.get = function(url) {
    var canceller = $q.defer();
    pendingRequests.add({
      url: url,
      canceller: canceller
    });
    var requestPromise = $http.get(url, { timeout: canceller.promise });
    //delete from pending list when done
    requestPromise.finally(function() {
      pendingRequests.remove(url);
    });
    return requestPromise;
  };
}])

.controller('IMDBSearchController', ['$scope', '$http', '$q', '$httpParamSerializer', '_', 'httpService', 'pendingRequests',
  function ImdbSearchCtrl($scope, $http, $q, $httpParamSerializer, _ , httpService, pendingRequests) {

    $scope.results = []; //search results object

    $scope.searchCriteria = {name:''}; //search criteria object, for tracking user input. name is default


    var cancelAll = function() {
      pendingRequests.cancelAll();
    };

    $scope.resetCriteria = function() {
      $scope.searchCriteria = {name:''};//reset to default
      $scope.results = [];
    };

    $scope.addCriterion = function(type){
      switch(type){
        case 'year':
          $scope.searchCriteria.year = '';
          break;

        case 'id':
          $scope.searchCriteria.id = '';
          break;
      }
    }

    //get results for current criteria
    $scope.search = function(){
      $scope.loading = true;
      $scope.errorMsg = undefined;//initialize error state

      cancelAll(); //cancel any existing requests
      $scope.results = []; //clear existing results

      //generate query params from object
      //alternatively could have posted the object as http post
      var qs = $httpParamSerializer($scope.searchCriteria);
      console.log('searching for: ' + JSON.stringify($scope.searchCriteria));

      httpService.get(options.server_url + '/api/search?' + qs)
        .then(
          function(data){
            if (data.status != 200) {
              console.log(data.data.message); //log actual error to console
              $scope.errorMsg = "No results from IMDB.  Please try another search.";
            } else {
              //got results
              $scope.results.push(data);//add data to results array
            }
            $scope.loading = false;
        });
    };
  }
]);


})();//end controller
