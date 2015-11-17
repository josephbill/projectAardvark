var http = require('http');
var dispatch = require('dispatch');
//include mongoose



var server = http.createServer(
	   dispatch({

	     '/' : function (request,response){
	     	message = {
           type: 'customer',
           text: 'hi how are you'


	     	};

	    // console.log('visiting %s', request.url);
            // Access-Control-Allow-Origin allows browser to be accessed from other pages 
        response.writeHead(200,{
           'content-type' : 'application/json',
           ' Access-Control-Allow-Origin' : '*'



        });



	    response.end(JSON.stringify(message));

	    //  },
	    //  '/movies' : function (request,response){

	    // console.log('visiting %s', request.url);
	    // response.end('this is the movies path');

	    //  },
	    //   '/actors' : function (request,response){

	    // console.log('visiting %s', request.url);
	    // response.end('this is the actors path');

	     }


	   })
		);






server.listen(8085, function(){
   console.log('server runnning on 127.0.0.1:8085');
 


});