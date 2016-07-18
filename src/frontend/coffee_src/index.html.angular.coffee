apiURL = 'http://gostutz.com/crsr/api/v.1'

homeApp = angular.module 'homeApp', ['cgBusy']
homeApp.service 'noticiaService', ($http) ->
  delete $http.defaults.headers.common['X-Requested-With']

  @obterNoticias = (limit, offset) ->
    $http (
      method: 'GET',
      url: apiURL + '/noticia/?sort_by=datapublicacao&sort_desc=true&limit=' + limit + '&offset=' + offset
    )
  return

homeApp.service 'naMidiaService', ($http) ->
  delete $http.defaults.headers.common['X-Requested-With']

  @obterNaMidias = (limit, offset) ->
    $http (
      method: 'GET',
      url: apiURL + '/na_midia/?sort_by=datapublicacao&sort_desc=true&limit=' + limit + '&offset=' + offset
    )
  return

homeApp.service 'rssService', ($http) ->
  delete $http.defaults.headers.common['X-Requested-With']

  @obterRSSBlogServidorLegal = (numero) ->
    $http (
      method: 'GET',
      url: apiURL + '/rss/blogservidorlegal/' + numero
    )
  @obterRSSDireitoDosConcursos = (numero) ->
    $http (
      method: 'GET',
      url: apiURL + '/rss/direitodosconcursos/' + numero
    )
  return

homeApp.controller 'HomeController', ($scope, noticiaService, naMidiaService, rssService) ->
  $scope.noticia1Promise = noticiaService.obterNoticias(1, 0)
  $scope.noticia1Promise.then (dataResponse)-> $scope.noticia1 = dataResponse.data[0]

  $scope.noticia2Promise = noticiaService.obterNoticias(1, 1)
  $scope.noticia2Promise.then (dataResponse)-> $scope.noticia2 = dataResponse.data[0]

  $scope.naMidia1Promise = naMidiaService.obterNaMidias(1, 0)
  $scope.naMidia1Promise.then (dataResponse)-> $scope.naMidia1 = dataResponse.data[0]

  $scope.rssServidorLegal1Promise = rssService.obterRSSBlogServidorLegal(0)
  $scope.rssServidorLegal1Promise.then (dataResponse)->
    $scope.rssServidorLegal1 = dataResponse.data
    $scope.rssServidorLegal1.resumo = $scope.rssServidorLegal1.resumo.substring(0, $scope.rssServidorLegal1.resumo.indexOf("[&#8230;]")) + "..."

  $scope.rssDireitoDosConcursos1Promise = rssService.obterRSSDireitoDosConcursos(0)
  $scope.rssDireitoDosConcursos1Promise.then (dataResponse)->
    $scope.rssDireitoDosConcursos1 = dataResponse.data
    $scope.rssDireitoDosConcursos1.resumo = $scope.rssDireitoDosConcursos1.resumo.substring(0, $scope.rssDireitoDosConcursos1.resumo.indexOf("&#160;")) + "..."

  $scope.rssDireitoDosConcursos2Promise = rssService.obterRSSDireitoDosConcursos(1)
  $scope.rssDireitoDosConcursos2Promise.then (dataResponse)->
    $scope.rssDireitoDosConcursos2 = dataResponse.data
    $scope.rssDireitoDosConcursos2.resumo = $scope.rssDireitoDosConcursos2.resumo.substring(0, $scope.rssDireitoDosConcursos2.resumo.indexOf("&#160;")) + "..."

  $scope.url = (noticia) -> return noticia.titulo.toLowerCase().replace(/\ /g,'-').replace(/[^\w-]+/g,"") + '/' + noticia.id if noticia?
  return

homeApp.value 'cgBusyDefaults',
  message:'Carregando',
  backdrop: false,
  templateUrl: 'loader_template.html',
  delay: 300
