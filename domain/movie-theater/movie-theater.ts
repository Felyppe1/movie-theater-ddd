import { randomUUID } from "crypto"
import { Address } from "./address"
import { Room } from "./room"

type MovieTheaterProps = {
    id: string
    name: string
    address: Address
    chairCatalog: Map<string, number>
    rooms: Room[]
}

type CreateMovieTheaterProps = {
    name: string
    address: Address
}

export class MovieTheater {
    id: string
    name: string
    address: Address
    chairCatalog: Map<string, number>
    rooms: Room[]
    
    static create({
        name,
        address
    }: CreateMovieTheaterProps) {
        return new MovieTheater({
            id: randomUUID(),
            name,
            address,
            chairCatalog: new Map(),
            rooms: []
        })
    }

    constructor({
        id,
        name,
        address,
        chairCatalog,
        rooms
    }: MovieTheaterProps) {
        if (!id) {
            throw new Error('Id is required')
        }

        if (!name) {
            throw new Error('Name is required')
        }

        if (!address) {
            throw new Error('Address is required')
        }

        if (!chairCatalog) {
            throw new Error('Chair Catalog is required')
        }

        if (!rooms) {
            throw new Error('Room is required')
        }

        this.id = id
        this.name = name
        this.address = address
        this.chairCatalog = chairCatalog
        this.rooms = rooms
    }
}

