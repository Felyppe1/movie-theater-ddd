import { randomUUID } from "crypto"
import { Address } from "./address"
import { Room } from "./room"
import { ChairType } from "./chair-type"

type MovieTheaterProps = {
    id: string
    name: string
    address: Address
    chairTypes: ChairType[]
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
    chairTypes: ChairType[]
    rooms: Room[]
    
    static create({
        name,
        address
    }: CreateMovieTheaterProps) {
        return new MovieTheater({
            id: randomUUID(),
            name,
            address,
            chairTypes: [],
            rooms: []
        })
    }

    constructor({
        id,
        name,
        address,
        chairTypes,
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

        if (!chairTypes) {
            throw new Error('Chair Types are required')
        }

        if (!rooms) {
            throw new Error('Rooms are required')
        }

        this.id = id
        this.name = name
        this.address = address
        this.chairTypes = chairTypes
        this.rooms = rooms
    }
    
    addChairType(newChairType: ChairType) {
        const hasChairType = this.chairTypes.some(chairType => chairType.getName() === newChairType.getName())
        if (hasChairType) {
            throw new Error(`Chair Type ${newChairType.getName()} already exists`)
        }

        this.chairTypes.push(newChairType)
    }

    editChairType({
        chairTypeId,
        chairTypeName,
        chairTypePrice
    }) {
        const chairType = this.chairTypes.find(chairType => chairTypeId === chairType.getId())
        if (!chairType) {
            throw new Error(`Chair Type id ${chairTypeId} not found`)
        }

        chairType.setName(chairTypeName ?? chairType.getName())
        chairType.setPrice(chairTypePrice ?? chairType.getPrice())
    }

    removeChairTypeByName(chairTypeName: string) {
        this.chairTypes = this.chairTypes.filter(chairType => chairTypeName !== chairType.getName())
    }

    addRoom(newRoom: Room) {
        if (!newRoom) {
            throw new Error('Room is required')
        }

        const hasRoomWithSameName = this.rooms.some(room => room.getName() === newRoom.getName())
        if (hasRoomWithSameName) {
            throw new Error(`Room name ${newRoom.getName()} already exists`)
        }

        this.rooms.push(newRoom)
    }

    removeRoomById(roomId: string) {
        this.rooms = this.rooms.filter(room => roomId !== room.getId())
    }
}

