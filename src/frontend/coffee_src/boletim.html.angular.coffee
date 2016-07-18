apiURL = 'http://gostutz.com/crsr/api/v.1'

boletimApp = angular.module 'boletimApp', ['ngSanitize', 'ngRoute', 'cgBusy']
boletimApp.service 'boletimService', ($http) ->
  delete $http.defaults.headers.common['X-Requested-With']

  @obterBoletims = (limit, offset) ->
    $http (
      method: 'GET',
      url: apiURL + '/boletim/?sort_by=datadepublicacao&sort_desc=true&limit=' + limit + '&offset=' + offset
    )
  @obterBoletim = (boletimId) ->
    $http (
      method: 'GET',
      url: apiURL + '/boletim/' + boletimId
    )
  return

boletimApp.controller 'BoletimController', ($scope, $routeParams, boletimService) ->
  $scope.offset = 0
  $scope.limit = 10
  $scope.boletins = []
  $scope.ultimasBoletins = []
  if $routeParams.boletimId?
    $scope.listaPrincipalPromise = boletimService.obterBoletim($routeParams.boletimId)
    $scope.listaPrincipalPromise.then (dataResponse)-> $scope.boletins[0] = dataResponse.data
  else
    $scope.listaPrincipalPromise = boletimService.obterBoletims($scope.limit, $scope.offset)
    $scope.listaPrincipalPromise.then (dataResponse)-> $scope.boletins = dataResponse.data

  $scope.noticiaLateralPromise = boletimService.obterBoletims(15, 0)
  $scope.noticiaLateralPromise.then (dataResponse)-> $scope.ultimasBoletins = dataResponse.data

  $scope.url = (boletim) -> return boletim.titulo.toLowerCase().replace(/\ /g,'-').replace(/[^\w-]+/g,"") + '/' + boletim.id
  return

boletimApp.config ($routeProvider, $locationProvider) ->
    $routeProvider.
      when '/boletim/',
        templateUrl: 'boletim_partial_listagem.html',
        controller: 'BoletimController'
      .
      when '/boletim/:title/:boletimId',
        templateUrl: 'boletim_partial_listagem.html',
        controller: 'BoletimController'
      .
      otherwise
        redirectTo: '/boletim/'

    $locationProvider.html5Mode(true);


boletimApp.value 'cgBusyDefaults',
  message:'Carregando',
  backdrop: false,
  templateUrl: 'loader_template.html',
  delay: 500
