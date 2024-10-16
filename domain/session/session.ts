import { randomUUID } from 'crypto'
import { TECHNOLOGY } from '../internal-catalog-management/movie'
import { Chair } from './chair'

type SessionProps = {
    id: string
    roomId: string
    movieId: string
    datetime: Date
    subtitled: boolean
    technology: TECHNOLOGY
    chairMatrix: Chair[][]
}

export type CreateSessionProps = {
    roomId: string
    movieId: string
    datetime: Date
    subtitled: boolean
    technology: TECHNOLOGY
    chairMatrix: Chair[][]
}

export class Session {
    id: string
    roomId: string
    movieId: string
    datetime: Date
    subtitled: boolean
    technology: TECHNOLOGY
    chairMatrix: Chair[][]

    static create({
        roomId,
        movieId,
        datetime,
        subtitled,
        technology,
        chairMatrix,
    }: CreateSessionProps) {
        return new Session({
            id: randomUUID(),
            roomId,
            movieId,
            datetime,
            subtitled,
            technology,
            chairMatrix,
        })
    }

    constructor({
        id,
        roomId,
        movieId,
        datetime,
        subtitled,
        technology,
        chairMatrix,
    }: SessionProps) {
        if (!id) {
            throw Error('id is required')
        }

        if (!roomId) {
            throw Error('roomId is required')
        }

        if (!movieId) {
            throw Error('movieId is required')
        }

        if (!datetime) {
            throw Error('datetime is required')
        }

        if (subtitled === undefined || subtitled === null) {
            throw Error('subtitled is required')
        }

        if (technology === undefined || technology === null) {
            throw Error('technology is required')
        }

        if (
            !chairMatrix ||
            chairMatrix.length === 0 ||
            chairMatrix[0].length === 0
        ) {
            throw Error('chairMatrix is required')
        }

        const firstRowLength = chairMatrix[0].length

        for (let i = 1; i < chairMatrix.length; i++) {
            const nthRowLength = chairMatrix[i].length

            if (nthRowLength !== firstRowLength) {
                throw new Error(
                    `The row ${i + 1} has a length of ${nthRowLength}, which is different from the first row's length: ${firstRowLength}`,
                )
            }
        }

        this.id = id
        this.roomId = roomId
        this.movieId = movieId
        this.datetime = datetime
        this.subtitled = subtitled
        this.technology = technology
        this.chairMatrix = chairMatrix
    }
}
