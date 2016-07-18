apiURL = 'http://gostutz.com/crsr/api/v.1'

clippingApp = angular.module 'clippingApp', ['ngSanitize', 'ngRoute', 'cgBusy']

clippingApp.service 'clippingService', ($http) ->
  delete $http.defaults.headers.common['X-Requested-With']

  @obterClippings = (limit, offset) ->
    $http (
      method: 'GET',
      url: apiURL + '/clipping/?sort_by=datapublicacao&sort_desc=true&limit=' + limit + '&offset=' + offset
    )
  @obterClipping = (clippingId) ->
    $http (
      method: 'GET',
      url: apiURL + '/clipping/' + clippingId
    )
  return

clippingApp.controller 'ClippingController', ($scope, $routeParams, clippingService) ->
  $scope.offset = 0
  $scope.limit = 10
  $scope.clippings = []
  $scope.ultimasClippings = []
  if $routeParams.clippingId?
    $scope.listaPrincipalPromise = clippingService.obterClipping($routeParams.clippingId)
    $scope.listaPrincipalPromise.then (dataResponse)-> $scope.clippings[0] = dataResponse.data
  else
    $scope.listaPrincipalPromise = clippingService.obterClippings($scope.limit, $scope.offset)
    $scope.listaPrincipalPromise.then (dataResponse)-> $scope.clippings = dataResponse.data

  $scope.noticiaLateralPromise = clippingService.obterClippings(15, 0)
  $scope.noticiaLateralPromise.then (dataResponse)-> $scope.ultimasClippings = dataResponse.data

  $scope.url = (clipping) -> return clipping.titulo.toLowerCase().replace(/\ /g,'-').replace(/[^\w-]+/g,"") + '/' + clipping.id
  return

clippingApp.config ($routeProvider, $locationProvider) ->
    $routeProvider.
      when '/clipping',
        templateUrl: 'clipping_partial_listagem.html',
        controller: 'ClippingController'
      .
      when '/clipping/:title/:clippingId',
        templateUrl: 'clipping_partial_listagem.html',
        controller: 'ClippingController'

      .
      otherwise
        redirectTo: '/clipping/'

    $locationProvider.html5Mode(true);


clippingApp.value 'cgBusyDefaults',
  message:'Carregando',
  backdrop: false,
  templateUrl: 'loader_template.html',
  delay: 500
