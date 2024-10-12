const ONLY_NUMBERS_REGEX = /^\d+$/

type CellphoneProps = {
    ddd: string
    number: string
}

export class Cellphone {
    ddd: string
    number: string

    constructor({ ddd, number }: CellphoneProps) {
        if (!ddd) {
            throw Error('ddd is required')
        }

        if (!number) {
            throw Error('number is required')
        }

        if (!ONLY_NUMBERS_REGEX.test(ddd)) {
            throw Error('ddd is not numeric')
        }

        if (ddd.length !== 2) {
            throw Error('ddd must have exactly 2 digits')
        }

        if (!ONLY_NUMBERS_REGEX.test(number)) {
            throw Error('number is not numeric')
        }

        // TODO: verify quantity of digits a number must have

        this.ddd = ddd
        this.number = number
    }
}
