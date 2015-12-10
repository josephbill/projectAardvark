//Including Express
var express = require('express');
//including consolidate 
var cons = require('consolidate');
var app = express();
//allowing cross origin resource sharing 
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
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
app.set('view engine', 'html')
    //(express)adding the middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(bodyParser.json());




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
                // res.json(movies);
                 res.render('index', {'movies': movies});
            }
        });

});
//res.json(movies);


// //new route this get request handles post request
// //the code below allows user to get posted movies
app.get('/movies/new', function(req, res) {


    res.render('new');
});






//this code allows user to post info to the db 
app.post('/movies', function(req, res) {
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


app.get('/movies/:id', function(req, res) {
    movieId = req.params.id;


    //retrieve data from the mongodb
    Movie.findById(movieId, function(err, movie) {
        if (err) return console.log(err);

        res.render('detail', {
            "movie": movie
        });
        // res.json(movie);
    });
});


app.get('/movies/:id/edit', function(req, res) {
    movieId = req.params.id;

    // retrieve the movie from Mongodb
    Movie.findById(movieId, function(err, movie) {
        if (err) return console.log(err);
        res.render('edit', {
            "movie": movie
        });
        // res.json(movie);
    });
});


//put verb....... updating data from the database
// app.put('/movies/:id', function(req, res) {
//     movieId = req.params.id;
//     userRating = req.body.rating;

//     //retrieve data from the mongodb
//     Movie.findById(movieId, function(err, movie) {
//         if (err) return console.log(err);
//         movie.rating = userRating;
//         movie.save(function(err, movie) {
//             if (err) return console.log(err);
//             res.json(movie);
//         });


//     });
// });

function updateMovie(method, req, res) {
    movieId = req.params.id;

    userRating = req.body.rating;
    userTitle = req.body.title;
    userYearOfRelease = req.body.year_of_release;
   

    // retrieve the movie from Mongodb
    Movie.findById(movieId, function(err, movie) {
        if (err) return console.log(err);

        movie.rating = userRating;
        movie.title = userTitle;
        movie.year_of_release = userYearOfRelease;
       

        movie.save(function(err, movie) {
            if (err) return console.log(err);

            if (method === 'PUT') {
                res.json(movie);
            } else {
                res.redirect('/movies/' + movie._id);
            };
        });
    });
}



app.post('/movies/:id/edit', function(req, res) {

    updateMovie('POST', req, res);
});

app.put('/movies/:id', function(req, res) {
    updateMovie('PUT', req, res);
});

function deleteMovie(method, req, res) {
    movieId = req.params.id;

    // retrieve the movie from Mongodb
    Movie.remove({
        _id: movieId
    }, function(err) {
        if (err) return console.log(err);

        if (method === 'GET') {
            res.redirect('/movies');
        } else {
            res.send('Movie was deleted');
        };
    });
}

app.get('/movies/:id/delete', function(req, res) {
    deleteMovie('GET', req, res);
});






//delete verb .... to delete data from the database
app.delete('/movies/:id', function(req, res) {
    deleteMovie('DELETE', req, res);
});



app.listen(8085, function() {
    console.log('server runnning on http://127.0.0.1:8085');



});
