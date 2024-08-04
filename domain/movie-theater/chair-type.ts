import { randomUUID } from "crypto"

type ChairTypeProps = {
    id: string
    name: string
    price: number
}

type CreateChairTypeProps = {
    name: string
    price: number
}

export class ChairType {
    private id: string
    private name: string
    private price: number

    static create({
        name,
        price
    }: CreateChairTypeProps) {
        return new ChairType({
            id: randomUUID(),
            name,
            price
        })
    }

    constructor({
        id,
        name,
        price
    }: ChairTypeProps) {
        if (!id) {
            throw new Error('Id is required')
        }

        if (!name) {
            throw new Error('Type is required')
        }

        if (!price) {
            throw new Error('Price is required')
        }

        this.id = id
        this.name = name
        this.price = price
    }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    getPrice() {
        return this.price
    }

    setName(name: string) {
        this.name = name
    }

    setPrice(price: number) {
        this.price = price
    }
}