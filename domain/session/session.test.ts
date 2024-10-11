import { describe, expect, it } from 'vitest'
import { CreateSessionProps, Session } from './session'
import { TECHNOLOGY } from '../internal-catalog-management/movie'
import { Chair, CHAIR_STATUS } from './chair'

describe('Session', () => {
    function createSession(session?: Partial<CreateSessionProps>) {
        return Session.create({
            roomId: '1',
            movieId: '1',
            datetime: new Date('2024-10-08T21:03:000Z'),
            subtitled: false,
            technology: TECHNOLOGY['2D'],
            chairMatrix: [[Chair.create(CHAIR_STATUS.AVAILABLE)]],
            ...session,
        })
    }

    it('should be able to create a session with valid input', () => {
        const session = createSession()

        expect(session).toBeInstanceOf(Session)
    })

    it('should not be able to create a session when input is invalid', () => {
        expect(() =>
            createSession({
                roomId: '',
            }),
        ).toThrow('roomId is required')
    })

    describe('Chair Matrix', () => {
        it('should not be able to create a session with chair matrix empty', () => {
            expect(() =>
                createSession({
                    chairMatrix: [[]],
                }),
            ).toThrow('chairMatrix is required')
        })

        it('should not be able to create a session when the chair matrix rows have different lengths', () => {
            expect(() =>
                createSession({
                    chairMatrix: [
                        [
                            Chair.create(CHAIR_STATUS.AVAILABLE),
                            Chair.create(CHAIR_STATUS.AVAILABLE),
                        ],
                        [Chair.create(CHAIR_STATUS.AVAILABLE)],
                    ],
                }),
            ).toThrow(
                `The row 2 has a length of 1, which is different from the first row's length: 2`,
            )
        })
    })
})
