import { randomUUID } from 'crypto'
import { ExpirationDate } from './expiration-date'

const ONLY_NUMBERS_REGEX = /^\d+$/

type CreatePaymentCard = {
    number: string
    name: string
    cvv: string
    month: number
    year: number
}

export type EditPaymentCard = {
    number: string
    name: string
    cvv: string
    month: number
    year: number
}

export type PaymentCardProps = {
    id: string
    number: string
    name: string
    cvv: string
    month: number
    year: number
}

export class PaymentCard {
    private id: string
    private number!: string
    private name!: string
    private cvv!: string
    private expirationDate!: ExpirationDate

    static create({ number, name, cvv, month, year }: CreatePaymentCard) {
        return new PaymentCard({
            id: randomUUID(),
            number,
            name,
            cvv,
            month,
            year,
        })
    }

    constructor({ id, number, name, cvv, month, year }: PaymentCardProps) {
        if (!id) {
            throw Error('id is required')
        }

        this.id = id

        this.setNumber(number)
        this.setName(name)
        this.setCvv(cvv)
        this.setExpirationDate(month, year)
    }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    setNumber(number: string) {
        if (!number) {
            throw Error('number is required')
        }

        const numberIsNumeric = ONLY_NUMBERS_REGEX.test(number)

        if (!numberIsNumeric) {
            throw Error('number is not numeric')
        }

        if (number.length !== 16) {
            throw Error('number must have exactly 16 digits')
        }

        this.number = number
    }

    setName(name: string) {
        if (!name) {
            throw Error('name is required')
        }

        this.name = name
    }

    setCvv(cvv: string) {
        if (!cvv) {
            throw Error('cvv is required')
        }

        const cvvIsNumeric = ONLY_NUMBERS_REGEX.test(cvv)

        if (!cvvIsNumeric) {
            throw Error('number is not numeric')
        }

        if (cvv.length !== 3) {
            throw Error('cvv length is invalid')
        }

        this.cvv = cvv
    }

    setExpirationDate(month: number, year: number) {
        this.expirationDate = new ExpirationDate({
            month,
            year,
        })
    }

    edit({ number, name, cvv, month, year }: EditPaymentCard) {
        this.setNumber(number)
        this.setName(name)
        this.setCvv(cvv)
        this.setExpirationDate(month, year)
    }
}
