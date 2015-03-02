'use strict';

/**
 * @ngdoc overview
 * @name angularCambridgeClassApp
 * @description
 * # angularCambridgeClassApp
 *
 * Main module of the application.
 */
var app = angular.module('angularCambridgeClassApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'snap',
  'Tabletop'
]);

app.config(function($routeProvider, TabletopProvider) {

  // tabletop setup...
  TabletopProvider.setTabletopOptions({
    key: 'https://docs.google.com/spreadsheets/d/1140e2--UGqVbTlSMnVZ3oNLrcLEpnvsnCMbIaI8PlS8/pubhtml',
  });

  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      resolve: {
        tabletopData: 'Tabletop'
      }
    })
    .when('/work', {
      templateUrl: 'views/work.html',
      controller: 'WorkCtrl'
    })
    .when('/play', {
      templateUrl: 'views/play.html',
      controller: 'PlayCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.animation('.page', function() {
  return {
    enter: function(element, done) {
      // set page 20 px south in alpha 0
      TweenMax.to(element, 0, {
        autoAlpha: 0,
        y: 20,
        overwrite: false
      });
      // fade in & bring to y:0
      TweenMax.to(element, 0.5, {
        autoAlpha: 1,
        y: 0,
        delay: .25,
        overwrite: false
      });
    },
    leave: function(element, done) {
      TweenMax.to(element, 0.75, {
        autoAlpha: 0,
        y: 20,
        overwrite: false,
        display: 'none',
        onComplete: removeElement
      });
      function removeElement() {
        element.remove();
        element = null;
      }
    }
  };
});

// make sure our data has loaded, otherwise … it's time for a reeeeeeeeeload!!!
TweenMax.delayedCall(1.5, dataLoadCheck);
function dataLoadCheck() {
  if ($('body').find('.page') == []) {
    window.location.reload();
  }
}