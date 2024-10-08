import { describe, it } from 'vitest'
import { CLASSIFICATION, Movie, TECHNOLOGY } from './movie'

describe('Movie', () => {
    function createMovie() {
        return new Movie({
            id: '1',
            name: 'Movie name',
            sinopsis: 'Sinopsis',
            poster: 'path-to-poster',
            classification: CLASSIFICATION['L'],
            technologies: [TECHNOLOGY['2D']],
            subtitled: false,
        })
    }

    it('should be able to create a movie successfully', () => {
        createMovie()
    })

    // it('should not be able to create a movie with any required field missing', () => {
    //     Movie.create()
    // })
})
