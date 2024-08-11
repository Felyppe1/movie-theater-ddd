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
        this.chairTypes = []
        this.rooms = rooms
        chairTypes.forEach(chairType => this.addChairType(chairType))
    }

    findChairTypeById(chairTypeId: string) {
        return this.chairTypes.find(chairType => chairTypeId === chairType.getId())
    }

    findChairTypeByName(chairTypeName: string) {
        return this.chairTypes.find(chairType => chairTypeName === chairType.getName())
    }
    
    addChairType(newChairType: ChairType) {
        const chairTypeFoundById = this.findChairTypeById(newChairType.getId())

        if (chairTypeFoundById) {
            throw new Error(`Chair Type id ${newChairType.getId()} already exists`)
        }

        const chairTypeFoundByName = this.findChairTypeByName(newChairType.getName())
        
        if (chairTypeFoundByName) {
            throw new Error(`Chair Type Name ${newChairType.getName()} already exists`)
        }

        this.chairTypes.push(newChairType)
    }

    editChairType({
        chairTypeId,
        chairTypeName,
        chairTypePrice
    }: EditChairTypeProps) {
        const foundChairType = this.findChairTypeById(chairTypeId)
        
        if (!foundChairType) {
            throw new Error(`Chair Type id ${chairTypeId} not found`)
        }

        const chairTypeFoundByName = this.findChairTypeByName(chairTypeName)
        
        if (chairTypeFoundByName && chairTypeFoundByName.getId() !== chairTypeId) {
            throw new Error(`Chair Type Name ${chairTypeName} already exists`)
        }

        foundChairType.setName(chairTypeName)
        foundChairType.setPrice(chairTypePrice)
    }

    removeChairTypeById(chairTypeId: string) {
        const someRoomIsUsingTypeId = this.rooms.some(room => room.isAnyChairUsingTypeId(chairTypeId))

        if (someRoomIsUsingTypeId) {
            throw Error(`Some room is using chair type id ${chairTypeId}`)
        }
        
        this.chairTypes = this.chairTypes.filter(chairType => chairTypeId !== chairType.getId())
    }

    getChairTypes() {
        return this.chairTypes
    }

    getAvailableChairTypes() {
        const availableChairTypes = new Set<string>()

        for (const chairType of this.chairTypes) {
            availableChairTypes.add(chairType.getName())
        }

        return availableChairTypes
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

    getUsedChairTypes() {

    }

    removeRoomById(roomId: string) {
        this.rooms = this.rooms.filter(room => roomId !== room.getId())
    }
}
