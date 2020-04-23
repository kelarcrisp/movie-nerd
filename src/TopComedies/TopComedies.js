import React, { useEffect, useContext } from 'react';
import classes from './TopComedies.module.css';
import TopComedy from './TopComedy/TopComedy';
import axios from 'axios';
import { MovieContext } from '../Context/MovieContext';
const TopComedies = () => {

    const { newestState, dispatch } = useContext(MovieContext)
    useEffect(() => {
        const getTopMovies = async () => {
            try {
                const data = await axios.get(`https://api.themoviedb.org/3/movie/35/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
                console.log(data, 'comedy data')
                const editedData = data.data.results.map((x) => {
                    return {
                        id: Math.random(), image: x.poster_path, title: x.title, releaseDate: x.release_date
                    }
                })
                console.log(editedData, 'editedData')
                dispatch({ type: 'ADD_COMMEDY_MOVIES', payload: { comedyMovies: editedData } })
            }
            catch (err) {
                console.log(err, 'error in api call')
            }

        }
        getTopMovies();
    }, [dispatch])
    return (
        <>
            <div className={classes.TopComediesLabel}>Top Comedies</div>
            <div className={classes.TopComediesContainer}>


                {newestState.comedyMovies.map(movie => {
                    return <TopComedy
                        key={Math.random()}
                        id={movie.id}
                        image={'https://image.tmdb.org/t/p/w500' + movie.image}
                        title={movie.title}
                        releaseDate={movie.releaseDate}
                    />
                })}


            </div>
        </>
    );
};

export default TopComedies;