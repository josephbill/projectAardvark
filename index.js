//Including Express
var express = require('express');
//including consolidate 
var cons = require('consolidate');
var app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

//including express middleware
//body-parser 
var bodyParser = require('body-parser');




//include mongoose 
//mongoose allows validation of entries in database 
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project-aardvark');


//define our schema
//here at the schema is where you add fields and their rules for your databases
var movieSchema = mongoose.Schema({
    title: String,
    year_of_release: Number,
    category: String,
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 10

    }

});
//compile our model
//informs mongodb available
var Movie = mongoose.model('Movie', movieSchema);

//express settings
//intiates template engines  
app.engine('html', cons.liquid);
//including jade templating engine 
//the first code puts the path of the jade file
app.set('views', './views');
//initiates jade template engine 
//app.set('view engine', 'jade');
app.set('view engine' , 'html')
//(express)adding the middleware
app.use(bodyParser.urlencoded({
    extended: true
}));


//routing using express easy
//adding jade template 
app.get('/movies', function(req, res) {
    //the following code directs filter actions 
    Movie.find()
        .select('title year_of_release rating')
        .exec(function(err, movies) {
            if (err) {


                console.log(err);

            } else {

                res.render('index', {'movies': movies});
            }
        });

});
//res.json(movies);


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








app.post('/movies/new', function(req, res) {
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
    movie.save(function(err, movie) {
        if (err) {

            console.log(err);
        } else {
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
app.get('/movies/:id', function(req, res) {
    movieId = req.params.id;


    //retrieve data from the mongodb
    Movie.findById(movieId, function(err, movie) {
        if (err) return console.log(err);


        res.json(movie);
    });
});


//put verb....... updating data from the database
app.put('/movies/:id', function(req, res) {
    movieId = req.params.id;
    userRating = req.body.rating;

    //retrieve data from the mongodb
    Movie.findById(movieId, function(err, movie) {
        if (err) return console.log(err);
        movie.rating = userRating;
        movie.save(function(err, movie) {
            if (err) return console.log(err);
            res.json(movie);
        });


    });
});


//delete verb .... to delete data from the database

app.delete('/movies/:id', function(req, res) {
    movieId = req.params.id;

    //removing data
    Movie.remove({
        _id: movieId
    }, function(err) {
        if (err) return console.log(err);


        res.send('Movie was deleted :-)');





    });
});



app.listen(8085, function() {
    console.log('server runnning on http://127.0.0.1:8085');



});
