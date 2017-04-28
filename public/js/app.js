'use strict';
/**
 * @ngdoc overview
 * @name  imdb-node
 * @description
 * # imdb-node
 *
 * Main module of the application.
 */
 var options = {};
options.server_url = "http://localhost:3000";

 angular.module('imdb-app',
 [
 'IMDBSearchCtrl',
 'ngSanitize'//assists with sanitizing html text for display in dom
 ]);
