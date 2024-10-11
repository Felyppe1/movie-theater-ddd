import { randomUUID } from 'crypto'
import { Address } from './address'
import { Room } from './room'
import { ChairType } from './chair-type'

type MovieTheaterProps = {
    id: string
    name: string
    address: Address
    chairCatalog: ChairType[]
    rooms: Room[]
    schedules: Movie[]
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
    schedules: Movie[]

    static create({ name, address }: CreateMovieTheaterProps) {
        return new MovieTheater({
            id: randomUUID(),
            name,
            address,
            chairCatalog: [],
            rooms: [],
            schedules: [],
        })
    }

    constructor({
        id,
        name,
        address,
        chairCatalog,
        rooms,
        schedules,
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

        if (!schedules) {
            throw new Error('Schedules are required')
        }

        this.id = id
        this.name = name
        this.address = address
        this.chairCatalog = []
        this.rooms = []
        this.schedules = []
        chairCatalog.forEach(newChairType => this.addChairType(newChairType))
        rooms.forEach(newRoom => this.addRoom(newRoom))
        schedules.forEach(newMovie => this.addMovie(newMovie))
    }

    findChairTypeById(chairTypeId: string) {
        return this.chairCatalog.find(
            chairType => chairTypeId === chairType.getId(),
        )
    }

    findChairTypeByName(chairTypeName: string) {
        return this.chairCatalog.find(
            chairType => chairTypeName === chairType.getName(),
        )
    }

    addChairType(newChairType: ChairType) {
        const chairTypeFoundById = this.findChairTypeById(newChairType.getId())

        if (chairTypeFoundById) {
            throw new Error(
                `Chair Type id ${newChairType.getId()} already exists`,
            )
        }

        const chairTypeFoundByName = this.findChairTypeByName(
            newChairType.getName(),
        )

        if (chairTypeFoundByName) {
            throw new Error(
                `Chair Type Name ${newChairType.getName()} already exists`,
            )
        }

        this.chairCatalog.push(newChairType)
    }

    editChairType({
        chairTypeId,
        chairTypeName,
        chairTypePrice,
    }: EditChairTypeProps) {
        const foundChairType = this.findChairTypeById(chairTypeId)

        if (!foundChairType) {
            throw new Error(`Chair Type id ${chairTypeId} not found`)
        }

        const chairTypeFoundByName = this.findChairTypeByName(chairTypeName)

        if (
            chairTypeFoundByName &&
            chairTypeFoundByName.getId() !== chairTypeId
        ) {
            throw new Error(`Chair Type Name ${chairTypeName} already exists`)
        }

        foundChairType.setName(chairTypeName)
        foundChairType.setPrice(chairTypePrice)
    }

    removeChairTypeById(chairTypeId: string) {
        const typeIdIsBeingUsedBySomeRoom = this.rooms.some(room =>
            room.isAnyChairUsingTypeId(chairTypeId),
        )

        if (typeIdIsBeingUsedBySomeRoom) {
            throw Error(`Some room is using chair type id ${chairTypeId}`)
        }

        this.chairCatalog = this.chairCatalog.filter(
            chairType => chairTypeId !== chairType.getId(),
        )
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

        const hasRoomWithSameName = this.rooms.some(
            room => room.getName() === newRoom.getName(),
        )
        if (hasRoomWithSameName) {
            throw new Error(`Room name ${newRoom.getName()} already exists`)
        }

        const catalogChairTypeIds = this.getCatalogChairTypeIds()
        const areAllChairsUsingTypesFromCatalog =
            newRoom.areAllChairsUsingTypesFromCatalog(catalogChairTypeIds)

        if (!areAllChairsUsingTypesFromCatalog) {
            throw new Error(
                'All chairs in the room should be using chair types from the catalog',
            )
        }

        this.rooms.push(newRoom)
    }

    getUsedChairTypes() {}

    removeRoomById(roomId: string) {
        this.rooms = this.rooms.filter(room => roomId !== room.getId())
    }

    findMovieById(movieId: string) {
        return this.schedules.find(movie => movieId === movie.getId())
    }

    addMovie(newMovie: Movie) {
        const movieFoundById = this.findMovieById(newMovie.getId())

        if (movieFoundById) {
            throw new Error(`Movie id ${newMovie.getId()} already exists`)
        }

        this.schedules.push(newMovie)
    }
}

type MovieProps = {
    movieId: string
    exhibitionPeriod: ExhibitionPeriod
}

export class Movie {
    private movieId: string
    private exhibitionPeriod: ExhibitionPeriod

    constructor({ movieId, exhibitionPeriod }: MovieProps) {
        if (!movieId) {
            throw Error('Movie id is required')
        }

        if (!exhibitionPeriod) {
            throw Error('Exhibition period is required')
        }

        this.movieId = movieId
        this.exhibitionPeriod = exhibitionPeriod
    }

    getId() {
        return this.movieId
    }
}

type ExhibitionPeriodProps = {
    start: Date
    end: Date
}

export class ExhibitionPeriod {
    private start: Date
    private end: Date

    constructor({ start, end }: ExhibitionPeriodProps) {
        if (!start) {
            throw new Error('Start is required')
        }

        if (!end) {
            throw new Error('End is required')
        }

        if (end <= start) {
            throw new Error('End must be greater than the start date')
        }

        this.start = start
        this.end = end
    }

    getStart() {
        return this.start
    }

    getEnd() {
        return this.end
    }
}
