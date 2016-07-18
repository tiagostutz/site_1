// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var compress       = require('compression');
var app            = express();
var prerender      = require('prerender-node').set('prerenderServiceUrl', 'http://localhost:3000/').set('prerenderToken', 's7zDfbP07ipE4JZKETcm');
var request           = require('request');

port = process.env.PORT || 8000;

app.use('/*', function(req, res, next) {
  //if (req.headers.host.match(/^www/) !== null ) {
   // res.redirect(301, 'http://' + req.headers.host.replace(/^www\./, '') + req.originalUrl);
    //res.end();
  //} else {
    next();
  //}
});

app.use(express.static(__dirname + '/frontend/', { maxAge: 864 * 7 /* 1d */ }));     // set the static files location /public/img will be /img for users

app.use('/imprensa.html', function(req, res){ res.sendfile(__dirname + '/frontend/imprensa.html') } );


function handleSEO(req, res, originalDestination) {
  if (!prerender.shouldShowPrerenderedPage(req))  {
    res.sendfile(__dirname + originalDestination);
  }else{
    request("http://service.prerender.io/http://servidor.adv.br"+req.originalUrl).pipe(res);
  }
}

app.use('/contato*', function(req, res){ handleSEO(req, res, '/frontend/contato.html'); } );
app.use('/segmentos/*', function(req, res){ handleSEO(req, res, '/frontend/segmentos.html'); } );
app.use('/perfis-clientes/*', function(req, res){ handleSEO(req, res, '/frontend/segmentos.html'); } );
app.use('/perfil-cliente/*', function(req, res){ handleSEO(req, res, '/frontend/segmentos.html'); } );
app.use('/perfis/*', function(req, res){ handleSEO(req, res, '/frontend/segmentos.html'); } );
app.use('/perfil/*', function(req, res){ handleSEO(req, res, '/frontend/segmentos.html'); } );

app.use('/campos_interesse/*', function(req, res){ handleSEO(req, res, '/frontend/campos_interesse.html'); } );
app.use('/interesses/*', function(req, res){ handleSEO(req, res, '/frontend/campos_interesse.html'); } );
app.use('/interesses-clientes/*', function(req, res) { handleSEO(req, res, '/frontend/campos_interesse.html'); });
app.use('/interesse-clientes/*', function(req, res) { handleSEO(req, res, '/frontend/campos_interesse.html'); });

app.use('/todas_noticias*', function(req, res) { handleSEO(req, res, '/frontend/todas_noticias.html'); });


function serve(baseName) {
  app.use('/' + baseName + '*', function(req, res){
    handleSEO(req, res, '/frontend/' + baseName + '.html');
  });
}

var pages = ['noticias', 'na_midia', 'clipping', 'boletim'];

for (var i = 0; i < pages.length; i++) {
  serve(pages[i]);
};

app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())    // parse application/json
app.use(methodOverride());                  // simulate DELETE and PUT
app.use(compress());

app.listen(port);
console.log('Magic happens on port ' + port);          // shoutout to the user
