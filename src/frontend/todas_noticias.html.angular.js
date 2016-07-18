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

  noticiaApp.controller('NoticiaController', function($scope, $routeParams, noticiaService) {
    $scope.limit = 200;

    if($routeParams.offset==="undefined" || $routeParams.offset==null){
      return;
    }else{
      $scope.offset = parseInt($routeParams.offset);
    }

    $scope.noticiaLateralPromise = noticiaService.obterNoticias($scope.limit, $scope.offset*$scope.limit);
    $scope.noticiaLateralPromise.then(function(dataResponse) {
      if ($scope.todasNoticias === "undefined" || $scope.todasNoticias == null) {
        $scope.todasNoticias = [];
      }
      //var temp = $scope.todasNoticias;
      //Array.prototype.push.apply(temp, dataResponse.data);
      $scope.offset = $scope.offset + 1;
      return $scope.todasNoticias = dataResponse.data;
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

  noticiaApp.config(function($sceProvider) {
    return $sceProvider.enabled(false);
  });

noticiaApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/noticias', {
      redirectTo: '/noticias'
    }).when('/todas_noticias/:offset', {
      controller: 'NoticiaController',
      templateUrl: 'todas_noticias_titulo_listagem.html'
    }).otherwise({
      redirectTo: '/todas_noticias/0'
    });
    return $locationProvider.html5Mode(true);
  });


  noticiaApp.value('cgBusyDefaults', {
    message: 'Carregando',
    backdrop: false,
    templateUrl: 'loader_template.html',
    delay: 500
  });

}).call(this);
