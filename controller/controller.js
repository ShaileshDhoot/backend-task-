
const Movie = require('../model/movies');
const Rating = require('../model/ratings');
const connection = require('../util/db')


// Get Longest 10 Movies

exports.getLongestMovie =  (req,res)=>{

    const quest = `
    SELECT tconst, primaryTitle, runtimeMinutes, genres
    FROM movies
    ORDER BY runtimeMinutes DESC
    LIMIT 10
    `;

    connection.query(quest, (error,result)=>{
        if(error){
            console.error('Error getting lonagest movies', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }else{
            console.log(result);
            res.json(result);
        }

    })
}

// create new movie in sql table
exports.createNewMovie = (req, res) => {
   

    const { tconst, titleType, primaryTitle, runtimeMinutes, genres } = req.body;

    const quest = `
    INSERT INTO movies (tconst, titleType, primaryTitle, runtimeMinutes, genres)
    VALUES (?, ?, ?, ?, ?)
    `;
        connection.query(quest,  [tconst, titleType, primaryTitle, runtimeMinutes, genres],(error,result)=>{
        if (error) {
            console.error('Error saving new movie:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(result);
            res.json({ message: 'Success' });
        }
    })
}

// Get top rated movies with rating more than 6

exports.getTopRatedMovies = (req, res)=>{

    const quest = `
    SELECT movies.tconst, movies.primaryTitle, movies.genres , ratings.averageRating
    FROM movies
    INNER JOIN ratings
    ON ratings.tconst = movies.tconst
    where ratings.averageRating > 6
    ORDER BY ratings.averageRating DESC
    `;

    connection.query(quest, (error,result)=>{
        if(error){
            console.error('Error getting  movies with rating > 6', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }else{
            console.log(result);
            res.json(result);
        }

    })
}

// Get movies genre-wise with subtotal of no of votes

exports.getMoviesGenrewise= (req,res) =>{

    const quest = `
    SELECT IFNULL(genres, '') AS Genre, IFNULL(primaryTitle, 'TOTAL') AS primaryTitle, SUM(numVotes) AS numVotes
    FROM movies
    INNER JOIN ratings ON movies.tconst = ratings.tconst
    GROUP BY genres, primaryTitle
    WITH ROLLUP   
    `;
    // ROLLUP
    //  creates additional rows in the result set that represent subtotals and a final row that represents the grand total
    connection.query(quest, (error,result)=>{
        if(error){
            console.error('Error getting  movies genre-wise with subtotal of no of votes', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }else{

            console.log(result);
            res.json(result);
        }

    })

}

// Increment runtimeMinutes by :
    // 15 if genre = Documentary
    // 30 if genre = Animation
    // 45 for the rest

exports.updateMovieRuntime = (req, res)=>{

    const quest = `
    UPDATE movies
    SET runtimeMinutes = CASE
    WHEN genres = 'Documentary' THEN runtimeMinutes + 15
    WHEN genres = 'Animation' THEN runtimeMinutes + 30
    ELSE runtimeMinutes + 45
    END;

    `;
    connection.query(quest, (error,result)=>{
        if(error){
            console.error('Error updating movies runtime', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }else{

            console.log(result);
            res.json(result);
        }

    })

}
  


