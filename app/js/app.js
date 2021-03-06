// Mixin underscore.string with lodash
_.mixin(_.str.exports());

// Use mustache style delimiters for the _.template function
_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

angular.module('services', []);
angular.module('controllers', ['services']);
angular.module('directives', ['services']);
angular.module('aerobatic-io', ['ngRoute', 'ngAnimate', 'duScroll', 
  'Aerobatic', 'services', 'controllers', 'directives', 'templates']);

angular.module('aerobatic-io').config(function($routeProvider, $locationProvider, $sceDelegateProvider, aerobaticProvider) {
  // Use the bang prefix for Google ajax crawlability
  // https://developers.google.com/webmasters/ajax-crawling/docs/specification?csw=1
  $locationProvider.html5Mode(true);

  $sceDelegateProvider.resourceUrlWhitelist([
    //Allow same origin resource loads
    'self',
    location.protocol + aerobaticProvider.config.assetPath + '/**'
  ]);

  function templateUrl(path) {
    if (aerobaticProvider.config.buildType === 'debug')
      return aerobaticProvider.config.cdnUrl + '/' + path;
    else
      return path;
  }

  $routeProvider
    .when('/', {
      controller: 'HomeCtrl',
      templateUrl: templateUrl('partials/home.jade')
    })
    .when('/docs/:article?', { 
      controller: 'DocsCtrl',
      templateUrl: templateUrl('partials/docs.jade')
    })
    .when('/blog/:year?/:month?/:day?/:title?', { 
      templateUrl: templateUrl('partials/blog.jade'),
      controller: 'BlogCtrl'
    })
    .when('/features', {
      templateUrl: templateUrl('partials/features.jade')
    })
    .when('/contact', {
      templateUrl: templateUrl('partials/contact.jade') 
    })
    .when('/pricing', {
      templateUrl: templateUrl('partials/pricing.jade')
    })
    .when('/gallery', {
      templateUrl: templateUrl('partials/gallery.jade')
    })
    .otherwise({ 
      redirectTo: '/' 
    });
});

angular.module('aerobatic-io').run(function ($window, $log, $rootScope, $location, analytics, content, aerobatic) {
  $log.info("Angular app aerobatic-io run event");
  analytics.initialize();
  content.initialize();

  $rootScope.$on('$routeChangeStart', function() {
    $window.scrollTo(0, 0);
  });
});
