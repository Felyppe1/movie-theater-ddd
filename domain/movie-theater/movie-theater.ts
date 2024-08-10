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

type EditChairTypeProps = {
    chairTypeId: string
    chairTypeName: string
    chairTypePrice: number
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
        if (this.isChairTypeAlreadyRegistered(newChairType.getName())) {
            throw new Error(`Chair Type Name ${newChairType.getName()} already exists`)
        }

        this.chairTypes.push(newChairType)
    }

    editChairType({
        chairTypeId,
        chairTypeName,
        chairTypePrice
    }: EditChairTypeProps) {
        const chairType = this.chairTypes.find(chairType => chairTypeId === chairType.getId())
        if (!chairType) {
            throw new Error(`Chair Type id ${chairTypeId} not found`)
        }

        if (this.isChairTypeAlreadyRegistered(chairTypeName)) {
            throw new Error(`Chair Type Name ${chairTypeName} already exists`)
        }

        chairType.setName(chairTypeName ?? chairType.getName())
        chairType.setPrice(chairTypePrice ?? chairType.getPrice())
    }

    removeChairTypeById(chairTypeId: string) {
        this.chairTypes = this.chairTypes.filter(chairType => chairTypeId !== chairType.getId())
    }

    isChairTypeAlreadyRegistered(chairTypeName: string) {
        return this.chairTypes.some(chairType => chairTypeName === chairType.getName())
    }

    addRoom(newRoom: Room) {
        if (!newRoom) {
            throw new Error('Room is required')
        }

        const hasRoomWithSameName = this.rooms.some(room => room.getName() === newRoom.getName())
        if (hasRoomWithSameName) {
            throw new Error(`Room name ${newRoom.getName()} already exists`)
        }

        const usedChairTypes = newRoom.getChairTypes()
        const availableChairTypes = this.getAvailableChairTypes()

        usedChairTypes.forEach(usedChairType => {
            if (!availableChairTypes.has(usedChairType)) {
                throw new Error (`Chair Type ${usedChairType} is unavailable`)
            }
        })

        this.rooms.push(newRoom)
    }

    getAvailableChairTypes() {
        const availableChairTypes = new Set<string>()

        for (const chairType of this.chairTypes) {
            availableChairTypes.add(chairType.getName())
        }

        return availableChairTypes
    }

    removeRoomById(roomId: string) {
        this.rooms = this.rooms.filter(room => roomId !== room.getId())
    }
}
