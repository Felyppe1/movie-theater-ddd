import { randomUUID } from 'crypto'

export enum CHAIR_STATUS {
    AVAILABLE,
    OCCUPIED,
    BLOCKED,
}

export type ChairProps = {
    id: string
    status: CHAIR_STATUS
}

export class Chair {
    id: string
    status: CHAIR_STATUS

    static create(status: CHAIR_STATUS) {
        return new Chair({
            id: randomUUID(),
            status,
        })
    }

    constructor({ id, status }: ChairProps) {
        if (!id) {
            throw Error('id is required')
        }

        if (!status) {
            throw Error('status is required')
        }

        this.id = id
        this.status = status
    }
}
