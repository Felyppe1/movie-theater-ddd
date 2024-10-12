export type ExpirationDateProps = {
    month: number
    year: number
}

export class ExpirationDate {
    month: number
    year: number

    constructor({ month, year }: ExpirationDateProps) {
        if (!month) {
            throw Error('month is required')
        }

        if (month < 1 || month > 12) {
            throw Error('month is invalid')
        }

        if (!year) {
            throw Error('year is required')
        }

        const currentMonth = new Date().getMonth() + 1
        const currentYear = new Date().getFullYear()
        if (
            year < currentYear ||
            (year === currentYear && month >= currentMonth)
        ) {
            throw Error('Expiration date has already passed')
        }

        this.month = month
        this.year = year
    }
}
