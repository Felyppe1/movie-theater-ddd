import { describe, expect, it } from 'vitest'
import { User, UserProps } from './user'
import { Cellphone } from './cellphone'
import { PaymentCard } from './payment-card'

describe('User', () => {
    function createUser(user?: Partial<UserProps>) {
        const yearAfterCurrentOne = new Date().getFullYear() + 1

        return new User({
            id: '1',
            name: 'Fulano de Tal',
            email: 'fulano@gmail.com',
            password: 'f123456789',
            cellphone: new Cellphone({
                ddd: '21',
                number: '911112222',
            }),
            paymentCards: [
                new PaymentCard({
                    id: '1',
                    number: '1234567812345678',
                    name: 'Fulano de Tal',
                    cvv: '123',
                    month: 1,
                    year: yearAfterCurrentOne,
                }),
            ],
            ...user,
        })
    }

    it('should be able to create a user', () => {
        const user = createUser()

        expect(user).toBeInstanceOf(User)
    })

    it('should not be able to create a user when an input parameter is missing', () => {
        expect(() =>
            createUser({
                name: '',
            }),
        ).toThrow('name is required')
    })

    it('should not be able to create a user when password does not meet the requirements', () => {
        expect(() =>
            createUser({
                password: '1234',
            }),
        ).toThrow('password does not meet the requirements')
    })

    it('should not be able to create a user when email does not meet the requirements', () => {
        expect(() =>
            createUser({
                email: 'fulano@.com',
            }),
        ).toThrow('email does not meet the requirements')
    })
})
