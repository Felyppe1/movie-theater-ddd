import { randomUUID } from "crypto"
import { Address } from "./address"
import { Room } from "./room"
import { ChairType } from "./chair-type"

type MovieTheaterProps = {
    id: string
    name: string
    address: Address
    chairCatalog: ChairType[]
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
    chairCatalog: ChairType[]
    rooms: Room[]
    
    static create({
        name,
        address
    }: CreateMovieTheaterProps) {
        return new MovieTheater({
            id: randomUUID(),
            name,
            address,
            chairCatalog: [],
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
            throw new Error('Chair Types are required')
        }

        if (!rooms) {
            throw new Error('Rooms are required')
        }

        this.id = id
        this.name = name
        this.address = address
        this.chairCatalog = []
        this.rooms = rooms
        chairCatalog.forEach(chairType => this.addChairType(chairType))
    }

    findChairTypeById(chairTypeId: string) {
        return this.chairCatalog.find(chairType => chairTypeId === chairType.getId())
    }

    findChairTypeByName(chairTypeName: string) {
        return this.chairCatalog.find(chairType => chairTypeName === chairType.getName())
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

        this.chairCatalog.push(newChairType)
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
        const typeIdIsBeingUsedBySomeRoom = this.rooms.some(room => room.isAnyChairUsingTypeId(chairTypeId))

        if (typeIdIsBeingUsedBySomeRoom) {
            throw Error(`Some room is using chair type id ${chairTypeId}`)
        }
        
        this.chairCatalog = this.chairCatalog.filter(chairType => chairTypeId !== chairType.getId())
    }

    getChairCatalog() {
        return this.chairCatalog
    }

    getCatalogChairTypeIds() {
        return this.chairCatalog.map(chairType => chairType.getId())
    }

    addRoom(newRoom: Room) {
        if (!newRoom) {
            throw new Error('Room is required')
        }

        const hasRoomWithSameName = this.rooms.some(room => room.getName() === newRoom.getName())
        if (hasRoomWithSameName) {
            throw new Error(`Room name ${newRoom.getName()} already exists`)
        }

        const catalogChairTypeIds = this.getCatalogChairTypeIds()
        const areAllChairsUsingTypesFromCatalog = newRoom.areAllChairsUsingTypesFromCatalog(catalogChairTypeIds)

        if (!areAllChairsUsingTypesFromCatalog) {
            throw new Error('All chairs in the room should be using chair types from the catalog')
        }

        this.rooms.push(newRoom)
    }

    getUsedChairTypes() {

    }

    removeRoomById(roomId: string) {
        this.rooms = this.rooms.filter(room => roomId !== room.getId())
    }
}
