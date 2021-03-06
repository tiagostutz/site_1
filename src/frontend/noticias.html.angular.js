// Generated by CoffeeScript 1.8.0
(function() {
  var apiURL, noticiaApp;

  apiURL = 'http://api.servidor.adv.br/crsr/api/v.1';

  noticiaApp = angular.module('noticiaApp', ['ngSanitize', 'ngRoute', 'cgBusy']);

  noticiaApp.service('noticiaService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.obterNoticias = function(limit, offset) {
      return $http({
        method: 'GET',
        url: apiURL + '/noticia/?sort_by=datapublicacao&sort_desc=true&limit=' + limit + '&offset=' + offset
      });
    };
    this.obterNoticia = function(noticiaId) {
      return $http({
        method: 'GET',
        url: apiURL + '/noticia/' + noticiaId
      });
    };
  });

  noticiaApp.controller('NoticiaController', function($scope, $routeParams, $rootScope, noticiaService) {
    $scope.offset = 0;
    $scope.limit = 10;
    $scope.noticias = [];
    $scope.ultimasNoticias = [];
    $scope.siteURL = window.location.href;
    $scope.noticiaRefURL = "";
    if ($routeParams.noticiaId != null) {
      $scope.listaPrincipalPromise = noticiaService.obterNoticia($routeParams.noticiaId);
      $scope.listaPrincipalPromise.then(function(dataResponse) {
        $scope.noticias[0] = dataResponse.data;
        $scope.noticiaRefURL = $scope.url($scope.noticias[0]);
        $rootScope.pageTitle = $scope.noticias[0].titulo;
        return $rootScope.pageDescription = $scope.noticias[0].texto.replace(/<[^>]+>/gm, '').substring(0, 400) + "...";
      });
    } else {
      $scope.listaPrincipalPromise = noticiaService.obterNoticias($scope.limit, $scope.offset);
      $scope.listaPrincipalPromise.then(function(dataResponse) {
        $scope.noticias = dataResponse.data;
        $scope.noticiaRefURL = $scope.url($scope.noticias[0]);
        // $rootScope.pageTitle = $scope.noticias[0].titulo;
        // return $rootScope.pageDescription = $scope.noticias[0].texto.replace(/<[^>]+>/gm, '').substring(0, 400) + "...";
      });
    }
    $scope.noticiaLateralPromise = noticiaService.obterNoticias(15, 0);
    $scope.noticiaLateralPromise.then(function(dataResponse) {
      return $scope.ultimasNoticias = dataResponse.data;
    });
    $scope.url = function(noticia) {
      return noticia.titulo.toLowerCase().replace(/\ /g, '-').replace(/[^\w-]+/g, "") + '/' + noticia.id;
    };
    $scope.urltwitter = function(noticia) {
      var title;
      title = '';
      if ($routeParams.noticiaId == null) {
        title = "/" + noticia.titulo.toLowerCase().replace(/\ /g, '-').replace(/[^\w-]+/g, "") + '/' + noticia.id;
      }
      return "http://platform.twitter.com/widgets/tweet_button.ff7d9077a26377d36b6a53b1a95be617.en.html#_=1418920477717&count=horizontal&id=twitter-widget-0&lang=en&original_referer=" + encodeURIComponent(window.location.href) + "&size=m&text=@ceradvogados:&url=" + encodeURIComponent(window.location.href + title);
    };
    $scope.urlfacebook = function(noticia) {
      var title;
      title = '';
      if ($routeParams.noticiaId == null) {
        title = "/" + noticia.titulo.toLowerCase().replace(/\ /g, '-').replace(/[^\w-]+/g, "") + '/' + noticia.id;
      }
      return "http://www.facebook.com/plugins/like.php?href=" + encodeURIComponent(window.location.href + title) + "&layout=button_count&show_faces=false&width=90&action=like&font=verdana&colorscheme=light&locale=pt_BR";
    };
    $scope.urlgoogle = function(noticia) {
      var title;
      title = '';
      if ($routeParams.noticiaId == null) {
        title = "/" + noticia.titulo.toLowerCase().replace(/\ /g, '-').replace(/[^\w-]+/g, "") + '/' + noticia.id;
      }
      return "https://plusone.google.com/_/+1/fastbutton?bsv&size=medium&hl=en-US&url=" + window.location.href + title + "&parent=" + window.location.href;
    };
  });

  noticiaApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/noticias', {
      templateUrl: 'noticias_partial_listagem.html',
      controller: 'NoticiaController'
    }).when('/noticias/:title/:noticiaId', {
      templateUrl: 'noticias_partial_listagem.html',
      controller: 'NoticiaController'
    }).otherwise({
      redirectTo: '/noticias'
    });
    return $locationProvider.html5Mode(true);
  });

  noticiaApp.config(function($sceProvider) {
    return $sceProvider.enabled(false);
  });

  noticiaApp.value('cgBusyDefaults', {
    message: 'Carregando',
    backdrop: false,
    templateUrl: 'loader_template.html',
    delay: 500
  });

}).call(this);
