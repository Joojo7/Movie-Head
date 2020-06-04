var apikey = "&apikey=542035b7"
const moviePlaceHolder = '../img/movie_placegoler.png'

$(document).ready(() =>{ 
    $('#searchForm').on('submit', (e) => {
       let searchText = $('#searchText').val();
        console.log('searchText:', searchText)
        getMovies(searchText);
        e.preventDefault(); 
    });
});

function getMovies(searchText){
    axios.get('https://www.omdbapi.com?s='+searchText+apikey)
    .then((response)=> {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each (movies, (index, movie) =>{

            if (movie.Poster === 'N/A' ) {
                movie.Poster = moviePlaceHolder;
            }
           output += `
                <div class="col-lg-4 mb-4">
                <!--Card-->
                <div class="card wow fadeIn" data-wow-delay="0.4s">

                    <!--Card image-->
                    <img class="img-fluid" src="${movie.Poster }">

                    <!--Card content-->
                    <div class="card-body">
                        <!--Title-->
                        <h5 class="card-title">${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-info" href="#">Movie Details</a>
                    </div>

                </div>
                <!--/.Card-->
            </div>
            `;
        });
        
        $('#movies').html(output);
    })
    .catch((err)=> {
        console.log(err);
    })
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
var news = window.open('movie.html');
    return false;
    
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    
    axios.get('https://www.omdbapi.com?i='+movieId+apikey)
    .then((response)=> {
        console.log(response);
        let movie = response.data;
        
        let output = `
             <div class="row " >
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thunbnail">
                </div>
                <div class="col-md-8 text-left">
                    <h2 style="color:#1cffff;">${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="lists" style="color:#1cffff;"><strong style="color:white;"><span class="imdb">IMDb</span> </strong>: ${movie.imdbRating}<span class="rottentomatoes"> RT</span>${movie.Ratings[1].Value}<i class="fa fa-clock"></i> ${movie.Runtime}</li>
                        <li class="lists" style="color:#1cffff;"><strong style="color:white;">Genre: </strong>${movie.Genre}</li>
                        <li class="lists" style="color:#1cffff;"><strong style="color:white;">Released: </strong>${movie.Released}</li>
                        <li class="lists" style="color:#1cffff;"><strong style="color:white;">Rated: </strong>${movie.Rated}</li>
                        
                        <li class="lists" style="color:#1cffff;"><strong style="color:white;">Director: </strong>${movie.Director}</li>
                        <li class="lists" style="color:#1cffff;"><strong style="color:white;">Writer: </strong>${movie.Writer}</li>
                        <li class="lists" style="color:#1cffff;"><strong style="color:white;">Actors: </strong>${movie.Actors}</li>
                        <li class="lists" style="color:#1cffff;"><strong style="color:white;">Language: </strong>${movie.Language}</li>
                        <li class="lists" style="color:#1cffff;"><strong style="color:white;">Plot: </strong>${movie.Plot}</li>
                    </ul>
            <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary text-center">View imdb</a>
            <a href="index.html" class="btn btn-default text-center">Back to search</a>
                </div>
            </div>
    <div class="row">
        <div class="col-md-12">
            
        </div>
    </div>

            `;
        $('#movie').html(output);
    })
    .catch((err)=> {
        console.log(err);
    })
}