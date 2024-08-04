type AddressProps = {
    number: number
    complement?: string
    zip: Zip
}

export class Address {
    number: number
    complement?: string
    zip: Zip
    
    constructor({
        number,
        complement,
        zip
    }: AddressProps) {
        if (!number) {
            throw new Error('Number is required')
        }
        if (!zip) {
            throw new Error('Zip Code is required')
        }

        this.number = number
        this.complement = complement
        this.zip = zip
    }
}

type ZipProps = {
    code: string
}

export class Zip {
    code: string
    street: string
    city: string
    state: string

    constructor({ code }: ZipProps) {
        // TODO: use a zip service

        this.code = code
        this.street = 'Rua Deputado José Luís Erthal'
        this.state = 'Rio de Janeiro'
        this.city = 'Niterói'
    }
}