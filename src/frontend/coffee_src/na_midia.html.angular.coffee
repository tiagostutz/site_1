apiURL = 'http://gostutz.com/crsr/api/v.1'

naMidiaApp = angular.module 'naMidiaApp', ['ngSanitize', 'ngRoute', 'cgBusy']

naMidiaApp.service 'naMidiaService', ($http) ->
  delete $http.defaults.headers.common['X-Requested-With']

  @obterNaMidias = (limit, offset) ->
    $http (
      method: 'GET',
      url: apiURL + '/na_midia/?sort_by=datapublicacao&sort_desc=true&limit=' + limit + '&offset=' + offset
    )
  @obterNaMidia = (naMidiaId) ->
    $http (
      method: 'GET',
      url: apiURL + '/na_midia/' + naMidiaId
    )
  return

naMidiaApp.controller 'NaMidiaController', ($scope, $routeParams, naMidiaService) ->
  $scope.offset = 0
  $scope.limit = 10
  $scope.naMidias = []
  $scope.ultimasNaMidias = []
  if $routeParams.naMidiaId?
    $scope.listaPrincipalPromise = naMidiaService.obterNaMidia($routeParams.naMidiaId)
    $scope.listaPrincipalPromise.then (dataResponse)-> $scope.naMidias[0] = dataResponse.data
  else
    $scope.listaPrincipalPromise = naMidiaService.obterNaMidias($scope.limit, $scope.offset)
    $scope.listaPrincipalPromise.then (dataResponse)-> $scope.naMidias = dataResponse.data

  $scope.noticiaLateralPromise = naMidiaService.obterNaMidias(15, 0)
  $scope.noticiaLateralPromise.then (dataResponse)-> $scope.ultimasNaMidias = dataResponse.data

  $scope.url = (naMidia) -> return naMidia.titulo.toLowerCase().replace(/\ /g,'-').replace(/[^\w-]+/g,"") + '/' + naMidia.id
  return

naMidiaApp.config ($routeProvider, $locationProvider) ->
    $routeProvider.
      when '/na_midia',
        templateUrl: 'na_midia_partial_listagem.html',
        controller: 'NaMidiaController'
      .
      when '/na_midia/:title/:naMidiaId',
        templateUrl: 'na_midia_partial_listagem.html',
        controller: 'NaMidiaController'

      .
      otherwise
        redirectTo: '/na_midia/'

    $locationProvider.html5Mode(true);

naMidiaApp.value 'cgBusyDefaults',
  message:'Carregando',
  backdrop: false,
  templateUrl: 'loader_template.html',
  delay: 500
