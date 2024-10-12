import { Cellphone } from './cellphone'
import { randomUUID } from 'crypto'
import { EditPaymentCard, PaymentCard } from './payment-card'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z]).{8,}$/

type CreateUserProps = {
    name: string
    socialName?: string
    email: string
    password: string
    cellphone: Cellphone
    paymentCards: PaymentCard[]
}

export type UserProps = {
    id: string
    name: string
    socialName?: string
    email: string
    password: string
    cellphone: Cellphone
    paymentCards: PaymentCard[]
}

export class User {
    id: string
    name: string
    socialName?: string
    email: string
    password: string
    cellphone: Cellphone
    paymentCards: PaymentCard[]

    static create({
        name,
        socialName,
        email,
        password,
        cellphone,
        paymentCards,
    }: CreateUserProps) {
        return new User({
            id: randomUUID(),
            name,
            socialName,
            email,
            password,
            cellphone,
            paymentCards,
        })
    }

    constructor({
        id,
        name,
        socialName,
        email,
        password,
        cellphone,
        paymentCards,
    }: UserProps) {
        if (!id) {
            throw Error('id is required')
        }

        if (!name) {
            throw Error('name is required')
        }

        if (!email) {
            throw Error('email is required')
        }

        if (!EMAIL_REGEX.test(email)) {
            throw Error('email does not meet the requirements')
        }

        if (!password) {
            throw Error('password is required')
        }

        if (!PASSWORD_REGEX.test(password)) {
            throw Error('password does not meet the requirements')
        }

        if (!cellphone) {
            throw Error('cellphone is required')
        }

        if (!paymentCards) {
            throw Error('paymentCards is required')
        }

        this.id = id
        this.name = name
        this.socialName = socialName
        this.email = email
        this.password = password
        this.cellphone = cellphone
        this.paymentCards = []
        paymentCards.forEach(newPaymentCard =>
            this.addPaymentCard(newPaymentCard),
        )
    }

    addPaymentCard(newPaymentCard: PaymentCard) {
        const paymentCardFoundById = this.findPaymentCardById(
            newPaymentCard.getId(),
        )

        if (paymentCardFoundById) {
            throw Error(`paymentCard ${newPaymentCard.getId()} already exists`)
        }

        this.paymentCards.push(newPaymentCard)
    }

    editPaymentCard(paymentCardId: string, dataToBeEdited: EditPaymentCard) {
        const paymentCardFound = this.findPaymentCardById(paymentCardId)

        if (!paymentCardFound) {
            throw Error(`paymentCardId ${paymentCardId} not found`)
        }

        const paymentCardFoundByNumber = this.findPaymentCardByNumber(
            dataToBeEdited.number,
        )

        if (
            paymentCardFoundByNumber &&
            paymentCardFoundByNumber.getId() !== paymentCardId
        ) {
            throw new Error(
                `paymentCardNumber ${dataToBeEdited.number} already exists`,
            )
        }

        paymentCardFound.edit(dataToBeEdited)
    }

    removePaymentCardById(paymentCardId: string) {
        // QUESTION: should I verify if the card id was found and throw an error if it was not found?
        this.paymentCards = this.paymentCards.filter(
            paymentCard => paymentCardId !== paymentCard.getId(),
        )
    }

    findPaymentCardById(paymentCardId: string) {
        return this.paymentCards.find(
            paymentCard => paymentCardId === paymentCard.getId(),
        )
    }

    findPaymentCardByNumber(paymentCardNumber: string) {
        return this.paymentCards.find(
            paymentCard => paymentCardNumber === paymentCard.getName(),
        )
    }
}
