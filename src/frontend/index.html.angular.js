// Generated by CoffeeScript 1.8.0
(function() {
  var apiURL, homeApp;

  apiURL = 'http://api.servidor.adv.br/crsr/api/v.1';

  homeApp = angular.module('homeApp', ['cgBusy']);

  homeApp.service('noticiaService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.obterNoticias = function(limit, offset) {
      return $http({
        method: 'GET',
        url: apiURL + '/noticia/?sort_by=datapublicacao&sort_desc=true&limit=' + limit + '&offset=' + offset
      });
    };
  });

  homeApp.service('naMidiaService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.obterNaMidias = function(limit, offset) {
      return $http({
        method: 'GET',
        url: apiURL + '/na_midia/?sort_by=datapublicacao&sort_desc=true&limit=' + limit + '&offset=' + offset
      });
    };
  });

  homeApp.service('rssService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.obterRSSBlogServidorLegal = function(numero) {
      return $http({
        method: 'GET',
        url: apiURL + '/rss/blogservidorlegal/' + numero
      });
    };
    this.obterRSSDireitoDosConcursos = function(numero) {
      return $http({
        method: 'GET',
        url: apiURL + '/rss/direitodosconcursos/' + numero
      });
    };
  });

  homeApp.service('infogreveService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.obterNoticias = function(limit, offset) {
      return $http({
        method: 'GET',
        url: 'http://api.infogreve.com.br:3001/noticias/?sort_by=data-de-publicacao&limit=' + limit + '&offset=' + offset
      });
    };
  });

  homeApp.service('destaqueService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.obterDestaques = function(limit, offset) {
      return $http({
        method: 'GET',
        url: apiURL + '/destaque/?sort_by=app_item_id&sort_desc=true&limit=' + limit + '&offset=' + offset
      });
    };
  });

  homeApp.controller('HomeController', function($scope, noticiaService, naMidiaService, rssService, infogreveService, destaqueService) {
    $scope.url = function(noticia) {
      if (noticia != null) {
        return noticia.titulo.toLowerCase().replace(/\ /g, '-').replace(/[^\w-]+/g, "") + '/' + noticia.id;
      }
    };
    $scope.noticia1Promise = noticiaService.obterNoticias(1, 0);
    $scope.noticia1Promise.then(function(dataResponse) {
      return $scope.noticia1 = dataResponse.data[0];
    });
    $scope.noticia2Promise = noticiaService.obterNoticias(1, 1);
    $scope.noticia2Promise.then(function(dataResponse) {
      return $scope.noticia2 = dataResponse.data[0];
    });
    $scope.naMidia1Promise = naMidiaService.obterNaMidias(1, 0);
    $scope.naMidia1Promise.then(function(dataResponse) {
      return $scope.naMidia1 = dataResponse.data[0];
    });
    $scope.rssServidorLegal1Promise = rssService.obterRSSBlogServidorLegal(0);
    $scope.rssServidorLegal1Promise.then(function(dataResponse) {
      $scope.rssServidorLegal1 = dataResponse.data;
      return $scope.rssServidorLegal1.resumo = $scope.rssServidorLegal1.resumo.substring(0, $scope.rssServidorLegal1.resumo.indexOf("[&#8230;]")) + "...";
    });
    $scope.rssDireitoDosConcursos1Promise = rssService.obterRSSDireitoDosConcursos(0);
    $scope.rssDireitoDosConcursos1Promise.then(function(dataResponse) {
      $scope.rssDireitoDosConcursos1 = dataResponse.data;
      return $scope.rssDireitoDosConcursos1.resumo = $scope.rssDireitoDosConcursos1.resumo.substring(0, $scope.rssDireitoDosConcursos1.resumo.indexOf("&#160;")) + "...";
    });
    $scope.noticiaInfogrevePromise = infogreveService.obterNoticias(1, 0);
    $scope.noticiaInfogrevePromise.then(function(dataResponse) {
      $scope.noticiaInfogreve = dataResponse.data[0];
      $scope.noticiaInfogreve.url = "http://www.infogreve.com.br/noticia.html#!/" + $scope.url($scope.noticiaInfogreve);
      return $scope.noticiaInfogreve.resumo = $scope.noticiaInfogreve.chamada + "...";
    });
    $scope.destaques = [];
    $scope.destaques[0] = {};
    $scope.destaques[1] = {};
    $scope.destaques[2] = {};
    $scope.destaquesPromise = destaqueService.obterDestaques(3, 0);
    $scope.destaquesPromise.then(function(dataResponse) {
      $scope.destaques = dataResponse.data;
      if (!$scope.destaques[0].titulo) {
        jQuery(jQuery(".text_holder")[0]).css("background", "transparent");
      }
      if (!$scope.destaques[1].titulo) {
        jQuery(jQuery(".text_holder")[1]).css("background", "transparent");
      }
      if (!$scope.destaques[2].titulo) {
        return jQuery(jQuery(".text_holder")[2]).css("background", "transparent");
      }
    });
  });

  homeApp.value('cgBusyDefaults', {
    message: 'Carregando',
    backdrop: false,
    templateUrl: 'loader_template.html',
    delay: 300
  });

}).call(this);
