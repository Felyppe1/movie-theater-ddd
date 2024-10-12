import { describe, expect, it } from 'vitest'
import { ExpirationDate } from './expiration-date'

describe('Expiration Date', () => {
    it('should be able to create an expiration date', () => {
        const fiveYearsAfterCurrentOne = new Date().getFullYear() + 5

        new ExpirationDate({
            month: 1,
            year: fiveYearsAfterCurrentOne,
        })
    })

    describe('should NOT be able to create an expiration date when', () => {
        it('an input parameter is missing', () => {
            const yearAfterCurrentOne = new Date().getFullYear() + 1

            expect(
                () =>
                    new ExpirationDate({
                        month: 0,
                        year: yearAfterCurrentOne,
                    }),
            ).toThrow('month is required')
        })

        it('month is invalid', () => {
            const yearAfterCurrentOne = new Date().getFullYear() + 1

            expect(
                () =>
                    new ExpirationDate({
                        month: 99,
                        year: yearAfterCurrentOne,
                    }),
            ).toThrow('month is invalid')
        })

        it('year is equal the current one and month is greater than the current one', () => {
            const currentYear = new Date().getFullYear()
            const monthAfterCurrentOne = new Date().getMonth() + 1

            expect(
                () =>
                    new ExpirationDate({
                        month: monthAfterCurrentOne,
                        year: currentYear,
                    }),
            ).toThrow('Expiration date has already passed')
        })

        it('year is less than the current one', () => {
            const yearBeforeCurrentOne = new Date().getFullYear() - 1

            expect(
                () =>
                    new ExpirationDate({
                        month: 1,
                        year: yearBeforeCurrentOne,
                    }),
            ).toThrow('Expiration date has already passed')
        })
    })
})
