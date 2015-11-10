var http = require('http');
var dispatch = require('dispatch');



var server = http.createServer(
	   dispatch({

	     '/' : function (request,response){

	    console.log('visiting %s', request.url);
	    response.end('this is root');

	     },
	     '/movies' : function (request,response){

	    console.log('visiting %s', request.url);
	    response.end('this is the movies path');

	     },
	      '/actors' : function (request,response){

	    console.log('visiting %s', request.url);
	    response.end('this is the actors path');

	     },


	   })
		);






server.listen(8085, function(){
   console.log('server runnning on 127.0.0.1:8085');
 


});