import { describe, expect, it } from 'vitest'
import { Chair, CHAIR_STATUS } from './chair'

describe('Chair', () => {
    it('should be able to create a chair with valid input', () => {
        const chair = Chair.create(CHAIR_STATUS.AVAILABLE)

        expect(chair).toBeInstanceOf(Chair)
    })
})
