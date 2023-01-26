const express = require('express')
const app = express()
const port = 3000
app.use(express.json()) // This line is necessary for Express to be able to parse JSON in request body's

const favoriteMovieList = [{
	title: "Star Wars",
	starRating: 5,
	isRecommended: true,
	createdAt: new Date(),
	lastModified: new Date()
},{
	title: "The Avengers",
	starRating: 4,
	isRecommended: true,
	createdAt: new Date(),
	lastModified: new Date()
}];
app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.get('/all-movies', (req, res) => {
    if(req.query.starRating === undefined){
        res.json({
            success: true,
            allMovies: favoriteMovieList
        })
        return;
    }
    if(Number(req.query.starRating) < 0 || Number(req.query.starRating) > 5){
        res.json({
            success: false,
            message: 'starRating must be a number between 0 and 5'
        })
        return;
    }
    const filteredMovies = favoriteMovieList.filter(movie => {
        return movie.starRating < req.query.starRating
    }) 
    res.json({
        success: true,
        allMoviesBelowStarRating: filteredMovies
    })
})

app.get('/single-movie/:title', (req, res) => {
    const movieToSearchFor = req.params.title;
    const movieToReturn = favoriteMovieList.filter(movie => movie.title === movieToSearchFor);
    res.json({
        success: true,
        movie: movieToReturn
    })
})

app.post('/new-movie', (req, res) => {
    if(req.body.title === undefined || typeof(req.body.title) !== 'string'){
        res.json({
            success: false,
            message: 'Title is required and must be a string'
        })
        return;
    }
    if(req.body.starRating === undefined || typeof(req.body.starRating) !== 'number'){
        res.json({
            success: false,
            message: 'starRating is required and must be a number'
        })
        return;
    }if(req.body.isRecommended === undefined || typeof(req.body.isRecommended) !== 'boolean'){
        res.json({
            success: false,
            message: 'isRecommended is required and must be a boolean'
        })
        return;
    }
    const newMovie = {};
    newMovie.title = req.body.title;
    newMovie.starRating = req.body.starRating;
    newMovie.isRecommended = req.body.
    isRecommended;
    newMovie.createdAt = new Date();
    newMovie.lastModified = new Date();
    favoriteMovieList.push(newMovie);
    res.json({
        success: true,

    })
})

app.put('/update-movie/:title', (req, res) => {
    const movieToFind = req.params.title;
    const originalMovieIndex = favoriteMovieList.findIndex(movie => movie.title === movieToFind);
    const originalMovie = favoriteMovieList.find(movie => movie.title === movieToFind);
    console.log(movieToFind);
    if(!originalMovie){
        res.json({
            success: false,
            message: 'Could not find movie'
        })
        return;
    }
    const updatedMovie = {};
    if(req.body.title !== undefined){
        updatedMovie.title = req.body.title;
    }else{
        updatedMovie.title = originalMovie.title;
    }
    if(req.body.starRating !== undefined){
        updatedMovie.starRating = req.body.starRating;
    }else{
        updatedMovie.starRating = originalMovie.starRating;
    }
    if(req.body.isRecommended !== undefined){
        updatedMovie.isRecommended = req.body.isRecommended;
    }else{
        updatedMovie.isRecommended = originalMovie.isRecommended;
    }
    updatedMovie.createdAt = originalMovie.createdAt;
    updatedMovie.lastModified = new Date();
    favoriteMovieList[originalMovieIndex] = updatedMovie;
    res.json({
        success: true
    })
})

app.delete('/delete-movie/:title', (req, res) => {
    const movieToDelete = req.params.title;
    const movieToDeleteIndex = favoriteMovieList.findIndex(movie => movie.title === movieToDelete);
    favoriteMovieList.splice(movieToDeleteIndex, 1);
    res.json({
        success: true
    })
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})