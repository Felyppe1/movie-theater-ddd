import { randomUUID } from "crypto"

type RoomProps = {
    id: string
    name: string
    chairMatrix: ChairMatrix
}

type CreateRoomProps = {
    name: string
    chairMatrix: ChairMatrix
}

export class Room {
    private id: string
    private name: string
    private chairMatrix: ChairMatrix
    
    static create({
        name,
        chairMatrix
    }: CreateRoomProps): Room {
        return new Room({
            id: randomUUID(),
            name,
            chairMatrix
        })
    }

    constructor({
        id,
        name,
        chairMatrix
    }: RoomProps) {
        if (!id) {
            throw new Error('Id is required')
        }

        if (!name) {
            throw new Error('Name is required')
        }

        if (!chairMatrix) {
            throw new Error('Chair Matrix is required')
        }

        this.id = id
        this.name = name
        this.chairMatrix = chairMatrix
    }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }
}

type ChairMatrixProps = {
    matrix: Chair[][]
}

export class ChairMatrix {
    matrix: Chair[][]

    constructor({
        matrix
    }: ChairMatrixProps) {
        if (!matrix || matrix.length === 0) {
            throw new Error('Matrix is required')
        }

        const firstLineLength = matrix[0].length

        for (let n = 1; n < matrix.length; n++) {
            const nLineLength = matrix[n].length
            
            if (nLineLength !== firstLineLength) {
                throw new Error(`The ${n} line length is not equal to the first line's length`)
            }
        } 
    }
}

type ChairProps = {
    type: string
}

export class Chair {
    type: string

    constructor({
        type
    }: ChairProps) {
        if (!type) {
            throw new Error('Type is required')
        }

        this.type = type
    }
}
