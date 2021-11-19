import React from 'react'
import Banner from './Banner/Banner'
import ListPoster from './ListerPoster'
import MovieList from './MovieList/MovieList'

export default function Home() {
    return (
        <div >
            <ListPoster/>
            <MovieList/>
        </div>
    )
}
