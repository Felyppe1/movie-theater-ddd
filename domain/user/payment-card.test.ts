import { describe, expect, it } from 'vitest'
import { PaymentCard, PaymentCardProps } from './payment-card'

describe('Payment Card', () => {
    function createPaymentCard(paymentCard?: Partial<PaymentCardProps>) {
        const yearAfterCurrentOne = new Date().getFullYear() + 1

        return PaymentCard.create({
            name: 'Fulano de Tal',
            number: '1234567812345678',
            cvv: '123',
            month: 1,
            year: yearAfterCurrentOne,
            ...paymentCard,
        })
    }

    it('should be able to create a payment card', () => {
        const paymentCard = createPaymentCard()

        expect(paymentCard).toBeInstanceOf(PaymentCard)
    })

    describe('should NOT be able to create a payment card when', () => {
        it('an input parameter is missing', () => {
            expect(() =>
                createPaymentCard({
                    name: '',
                }),
            ).toThrow('name is required')
        })

        it('number length has not 16 digits', () => {
            expect(() =>
                createPaymentCard({
                    number: '1234',
                }),
            ).toThrow('number must have exactly 16 digits')
        })

        it('number has any letter', () => {
            expect(() =>
                createPaymentCard({
                    number: '123456781234567a',
                }),
            ).toThrow('number is not numeric')
        })

        it('cvv length has not 3 digits', () => {
            expect(() =>
                createPaymentCard({
                    cvv: '1',
                }),
            ).toThrow('cvv length is invalid')
        })
    })

    // it('should be able to edit the payment card informations', () => {
    //     const paymentCard = createPaymentCard()
    //     paymentCard.edit({
    //         number: null,
    //         name: 'Testeeee',
    //     })

    // })
})
