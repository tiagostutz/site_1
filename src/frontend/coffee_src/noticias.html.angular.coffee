apiURL = 'http://gostutz.com/crsr/api/v.1'

noticiaApp = angular.module 'noticiaApp', ['ngSanitize', 'ngRoute', 'cgBusy']
noticiaApp.service 'noticiaService', ($http) ->
  delete $http.defaults.headers.common['X-Requested-With']

  @obterNoticias = (limit, offset) ->
    $http (
      method: 'GET',
      url: apiURL + '/noticia/?sort_by=datapublicacao&sort_desc=true&limit=' + limit + '&offset=' + offset
    )
  @obterNoticia = (noticiaId) ->
    $http (
      method: 'GET',
      url: apiURL + '/noticia/' + noticiaId
    )
  return

noticiaApp.controller 'NoticiaController', ($scope, $routeParams, noticiaService) ->
  $scope.offset = 0
  $scope.limit = 10
  $scope.noticias = []
  $scope.ultimasNoticias = []
  if $routeParams.noticiaId?
    $scope.listaPrincipalPromise = noticiaService.obterNoticia($routeParams.noticiaId)
    $scope.listaPrincipalPromise.then (dataResponse)-> $scope.noticias[0] = dataResponse.data
  else
    $scope.listaPrincipalPromise = noticiaService.obterNoticias($scope.limit, $scope.offset)
    $scope.listaPrincipalPromise.then (dataResponse)-> $scope.noticias = dataResponse.data

  $scope.noticiaLateralPromise = noticiaService.obterNoticias(15, 0)
  $scope.noticiaLateralPromise.then (dataResponse)-> $scope.ultimasNoticias = dataResponse.data

  $scope.url = (noticia) -> return noticia.titulo.toLowerCase().replace(/\ /g,'-').replace(/[^\w-]+/g,"") + '/' + noticia.id
  return

noticiaApp.config ($routeProvider, $locationProvider) ->
    $routeProvider.
      when '/noticias/',
        templateUrl: 'noticias_partial_listagem.html',
        controller: 'NoticiaController'
      .
      when '/noticias/:title/:noticiaId',
        templateUrl: 'noticias_partial_listagem.html',
        controller: 'NoticiaController'
      .
      otherwise
        redirectTo: '/noticias/'

    $locationProvider.html5Mode(true);

noticiaApp.value 'cgBusyDefaults',
  message:'Carregando',
  backdrop: false,
  templateUrl: 'loader_template.html',
  delay: 500
