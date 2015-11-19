var http = require('http');
var dispatch = require('dispatch');
var querystring = require('querystring');

//Including Express
var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//including express middleware
//body-parser 
var bodyParser = require('body-parser');




//include mongoose 
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project-aardvark');


//define our schema
//here at the schema is where you add fields and their rules for your databases
var movieSchema = mongoose.Schema({
   title: String,
   year_of_release: Number,
   category: String



});
 //compile our model
 //informs mongodb available
var Movie = mongoose.model('Movie' , movieSchema);

//adding the middleware
  app.use(bodyParser.urlencoded({extended: true}));




  

//routing using express easy
app.get('/movies', function(req, res){
  Movie.find(function(err, movies){
     if(err){


      console.log(err);

     }else{


        res.json(movies);


     }


});

  });
                   
                    // movies =[ 
                    // {
                    //  title: 'Black Mass',
                    //  category: ['thriller', 'action', 'biopic'],
                    //  main_actors: [
                    //  {
                    //   first_name: 'Johnny',
                    //   last_name: 'Depp'
                    //  },  
                    //  {
                    //    first_name: 'Benedict',
                    //    last_name: 'Cumberbatch'


                    //  }]

                    //  },
                   
                    // {
                    //  title: 'Avengers: age of Ultron',
                    //  category: ['fantasy', 'action'],
                    //  main_actors: [
                    //  {
                    //  first_name: 'Chris',
                    //  last_name: 'Evans'


                    //  }, 
                    //  {
                    //  first_name: 'Robert',
                    //  last_name: 'Jr'



                    //  }]


                    // },
                    // {
                    //  title: 'Straight-Outta-Compton',
                    //  category: ['drama' , ''],
                    //  main_actors: [
                    //  {
                    //  first_name: 'Oshea',
                    //  last_name: 'Jackson'



                    //   }, 
                    //   {

                    // first_name: 'aldis',
                    // last_name: 'Hodge'



                    //  }
                    //  ]
                    
                      
                    // }

                    // ];

      






app.post('/movies/new', function(req, res){
       console.log(req.body);
       formdata = req.body;
        //    //create an instance of a movie
        // var movie = new Movie(
        // {
        //   title: formdata.title,
        //   year_of_release: formdata.year_of_release
        // }
        // );
         //the code commented below imports data from the mongodb onto the view of the app 
         //thus the code above is rendered useless if the code below is initialized
      var movie = new Movie(formdata);
        movie.save(function(err, movie){
if(err){

  console.log(err);
}else{
 console.log('succesfully saved the movie :-)');
 //
 res.redirect('/movies');
}

});


});

//dispatch is a route handler 
// var server = http.createServer(
//      dispatch({

//        '/movies' : {

//          'GET /' : function(request, response){
//                     movies =[ 
//                     {
//                      title: 'Black Mass',
//                      category: ['thriller', 'action', 'true-story'],
//                      main_actors: [
//                      {
//                       first_name: 'Johnny',
//                       last_name: 'Depp'
//                      },  
//                      {
//                        first_name: 'Benedict',
//                        last_name: 'Cumberbatch'


//                      }]

//                      },
                   
//                     {
//                      title: 'Avengers: age of Ultron',
//                      category: ['fanatsy', 'action'],
//                      main_actors: [
//                      {
//                      first_name: 'Chris',
//                      last_name: 'Evans'


//                      }, 
//                      {
//                      first_name: 'Robert',
//                      last_name: 'Jr'



//                      }]


//                     },
//                     {
//                      title: 'Straight-Outta-Compton',
//                      category: ['drama' , ''],
//                      main_actors: [
//                      {
//                      first_name: 'Oshea',
//                      last_name: 'Jackson'



//                       }, 
//                       {

//                     first_name: 'aldis',
//                     last_name: 'Hodge'



//                      }
//                      ]
                    
                      
//                     }

//                     ];


//                     response.end(JSON.stringify(movies));
//          },
//         '/POST': function(request, response, next){
//          //get parameters from the form 
//        var  formdata;
//          request.on('data', function(chunk){
//             formdata = querystring.parse(chunk.toString());

//          });
            
//            request.on('end', function(){
//         console.log(formdata);
//         //create an instance of a movie
//         var movie = new Movie(
//         {
//           title: formdata.title,
//           year_of_release: formdata.year_of_release



//         }
//         );



            
//            });


//           //syntax for creation of a new instance ...... var name = new name({})
      
         

//         }


//        }
//    })
//      );


      // console.log('visiting %s', request.url);
            // Access-Control-Allow-Origin allows browser to be accessed from other pages 
     //    response.writeHead(200,{
     //       'content-type' : 'application/json',
     //       ' Access-Control-Allow-Origin' : '*'



     //    });



      // response.end(JSON.stringify(message));

      // //  },
      // //  '/movies' : function (request,response){

      // // console.log('visiting %s', request.url);
      // // response.end('this is the movies path');

      // //  },
      // //   '/actors' : function (request,response){

      // // console.log('visiting %s', request.url);
      // // response.end('this is the actors path');

      





app.listen(8085, function(){
   console.log('server runnning on http://127.0.0.1:8085');
 


});