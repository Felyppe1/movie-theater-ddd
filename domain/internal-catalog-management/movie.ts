import { randomUUID } from 'crypto'

export enum TECHNOLOGY {
    '2D',
    '3D',
    'IMAX',
    'DOLBY_CINEMA',
    '4DX',
    'D_BOX',
}

export enum CLASSIFICATION {
    'L',
    'A12',
    'A14',
    'A16',
    'A18',
}

type MovieProps = {
    id: string
    name: string
    sinopsis: string
    poster: string
    classification: CLASSIFICATION
    technologies: TECHNOLOGY[]
    subtitled: boolean
}

type CreateMovieProps = {
    name: string
    sinopsis: string
    poster: string
    classification: CLASSIFICATION
    technologies: TECHNOLOGY[]
    subtitled: boolean
}

export class Movie {
    id: string
    name: string
    sinopsis: string
    poster: string
    classification: CLASSIFICATION
    technologies: TECHNOLOGY[]
    subtitled: boolean

    static create({
        name,
        sinopsis,
        poster,
        classification,
        technologies,
        subtitled,
    }: CreateMovieProps) {
        return {
            id: randomUUID(),
            name,
            sinopsis,
            poster,
            classification,
            technologies,
            subtitled,
        }
    }

    constructor({
        id,
        name,
        sinopsis,
        poster,
        classification,
        technologies,
        subtitled,
    }: MovieProps) {
        if (!id) {
            throw Error('Id is required')
        }

        if (!name) {
            throw Error('Name is required')
        }

        if (!sinopsis) {
            throw Error('Sinopsis is required')
        }

        if (!poster) {
            throw Error('Poster is required')
        }

        if (!classification) {
            throw Error('Classification is required')
        }

        if (!technologies || technologies.length === 0) {
            throw Error('Technologies is required')
        }

        if (subtitled === undefined || subtitled === null) {
            throw Error('Subtitled is required')
        }

        this.id = id
        this.name = name
        this.sinopsis = sinopsis
        this.poster = poster
        this.classification = classification
        this.technologies = technologies
        this.subtitled = subtitled
    }
}
