// Generated by CoffeeScript 1.8.0
(function() {
  var apiURL, camposInteresseApp;

  apiURL = 'http://servidorapi.azurewebsites.net/api';

  camposInteresseApp = angular.module('camposInteresseApp', ['ngSanitize', 'ngRoute', 'cgBusy']);

  camposInteresseApp.service('camposInteresseService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.obterCampoInteresse = function(campoInteresseId) {
      return $http({
        method: 'GET',
        url: apiURL + '/CamposdeInteresse/porid?id=' + campoInteresseId
      });
    };
  });

  camposInteresseApp.service('exemplosAtuacaoService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.obterExemploAtuacao = function(exemploAtuacaoAppItemId) {
      return $http({
        method: 'GET',
        url: apiURL + '/exemplo_atuacao/appItemId/' + exemploAtuacaoAppItemId
      });
    };
  });

  camposInteresseApp.service('citacaoLeadService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.obterCitacaoLead = function(citacaoAppItemId) {
      return $http({
        method: 'GET',
        url: apiURL + '/citacao_lead/appItemId/' + citacaoAppItemId
      });
    };
  });

  camposInteresseApp.controller('CamposInteresseController', function($scope, camposInteresseService, exemplosAtuacaoService, citacaoLeadService) {
    var idCampoInteresseBusca;
    $scope.offset = 0;
    $scope.limit = 10;
    $scope.campoInteresse = null;
    $scope.remuneracaoMenuCSS = "";
    $scope.prerrogativaMenuCSS = "";
    $scope.selecaoMenuCSS = "";
    $scope.exercicioMenuCSS = "";
    $scope.tributoMenuCSS = "";
    $scope.segurancaMenuCSS = "";
    $scope.disciplinaMenuCSS = "";
    $scope.sindicalMenuCSS = "";
    $scope.socialMenuCSS = "";
    $scope.tituloPagina = "";
    $scope.siteURL = "";
    $scope.descricaoPagina = "";
    $scope.siteImageURL = "";
    if (window.location.href.indexOf("remuneracao") !== -1) {
      idCampoInteresseBusca = 259201207;
      $scope.remuneracaoMenuCSS = "active";
      $scope.tituloPagina = "Remuneração";
      $scope.siteURL = "http://servidor.adv.br/interesses-clientes/remuneracao";
    } else if (window.location.href.indexOf("prerrogativa") !== -1) {
      idCampoInteresseBusca = 259834062;
      $scope.prerrogativaMenuCSS = "active";
      $scope.tituloPagina = "Defesa de prerrogativas";
      $scope.siteURL = "http://servidor.adv.br/interesses-clientes/defesa-de-prerrogativas";
    } else if (window.location.href.indexOf("selecao") !== -1) {
      idCampoInteresseBusca = 259837908;
      $scope.selecaoMenuCSS = "active";
      $scope.tituloPagina = "Seleção e provimento";
      $scope.siteURL = "http://servidor.adv.br/interesses-clientes/selecao-e-provimento";
    } else if (window.location.href.indexOf("exercicio") !== -1) {
      idCampoInteresseBusca = 259839232;
      $scope.exercicioMenuCSS = "active";
      $scope.tituloPagina = "Exercício e afastamento";
      $scope.siteURL = "http://servidor.adv.br/interesses-clientes/exercicio-e-afastamento";
    } else if (window.location.href.indexOf("tributo") !== -1) {
      idCampoInteresseBusca = 259841289;
      $scope.tributoMenuCSS = "active";
      $scope.tituloPagina = "Tributos";
      $scope.siteURL = "http://servidor.adv.br/interesses-clientes/tributos";
    } else if (window.location.href.indexOf("seguranca") !== -1) {
      idCampoInteresseBusca = 259862646;
      $scope.segurancaMenuCSS = "active";
      $scope.tituloPagina = "Saúde e segurança do trabalho";
      $scope.siteURL = "http://servidor.adv.br/interesses-clientes/saude-e-seguranca-do-trabalho";
    } else if (window.location.href.indexOf("disciplina") !== -1) {
      idCampoInteresseBusca = 259863671;
      $scope.disciplinaMenuCSS = "active";
      $scope.tituloPagina = "Disciplina, probidade e contas";
      $scope.siteURL = "http://servidor.adv.br/interesses-clientes/disciplina-probidade-e-contas";
    } else if (window.location.href.indexOf("sindical") !== -1) {
      idCampoInteresseBusca = 259864840;
      $scope.sindicalMenuCSS = "active";
      $scope.tituloPagina = "Liberdade sindical e associativa";
      $scope.siteURL = "http://servidor.adv.br/interesses-clientes/liberdade-sindical-e-associativa";
    } else if (window.location.href.indexOf("social") !== -1) {
      idCampoInteresseBusca = 259868355;
      $scope.socialMenuCSS = "active";
      $scope.tituloPagina = "Seguridade social";
      $scope.siteURL = "http://servidor.adv.br/interesses-clientes/seguridade-social";
    }
    $scope.toURL = function(text) {
      return text.toLowerCase().replace(/\ /g, '-').replace(/[^\w-]+/g, "");
    };
    $scope.tituloPaginaURL = $scope.toURL($scope.tituloPagina);
    $scope.campoInteresseFindPromise = camposInteresseService.obterCampoInteresse(idCampoInteresseBusca);
    $scope.campoInteresseFindPromise.then(function(dataResponse) {
      var i, _i, _ref, _results;
      $scope.campoInteresse = dataResponse.data;
      $scope.campoInteresse.citacaoLead = $scope.campoInteresse.aspas[0].title;
      $scope.campoInteresse.loadingAspasPromise = citacaoLeadService.obterCitacaoLead($scope.campoInteresse.aspas[0].appItemId);
      $scope.campoInteresse.loadingAspasPromise.then(function(dataResponse) {
        return $scope.campoInteresse.citacaoLead = dataResponse.data.titulo.replace("<p>", "").replace("</p>", "");
      });
      _results = [];
      for (i = _i = 0, _ref = $scope.campoInteresse.exemplos.length - 1; _i <= _ref; i = _i += 1) {
        $scope.campoInteresse.exemplos[i].load = function() {
          var _selfLocal;
          _selfLocal = this;
          _selfLocal.loadingPromise = exemplosAtuacaoService.obterExemploAtuacao(_selfLocal.appItemId);
          return _selfLocal.loadingPromise.then(function(dataResponse) {
            return _selfLocal.loadedData = dataResponse.data;
          });
        };
        _results.push($scope.campoInteresse.exemplos[i].load());
      }
      return _results;
    });
  });

  camposInteresseApp.filter('htmlToPlaintext', function() {
    return function(text) {
      return String(text).replace(/<[^>]+>/gm, '');
    };
  });

  camposInteresseApp.config(function($routeProvider, $locationProvider) {
    return $locationProvider.html5Mode(true);
  });

  camposInteresseApp.value('cgBusyDefaults', {
    message: 'Carregando',
    backdrop: false,
    templateUrl: 'loader_template.html',
    delay: 500
  });

}).call(this);