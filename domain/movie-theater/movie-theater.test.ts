import { describe, expect, it } from "vitest"
import { MovieTheater } from "./movie-theater"
import { Address, Zip } from "./address"
import { ChairType } from "./chair-type"

describe('Movie Theater', () => {
    describe('Chair Type', () => {
        function createMovieTheater(chairTypes: ChairType[]) {
            return new MovieTheater({
                id: '1',
                name: 'Movie Theater Test',
                address: new Address({
                    number: 1,
                    zip: new Zip({ code: '12345678' })
                }),
                chairTypes,
                rooms: []
            })
        }

        it.fails('should not be able to edit a chair type that does not exist', () => {
            const movieTheater = createMovieTheater([])

            movieTheater.editChairType({
                chairTypeId: '1',
                chairTypeName: 'Edited normal',
                chairTypePrice: 10
            })
        })

        it('should be able to edit a chair type without modifying anything', () => {
            const movieTheater = createMovieTheater([
                new ChairType({
                    id: '1',
                    name: 'normal',
                    price: 10
                })
            ])

            movieTheater.editChairType({
                chairTypeId: '1',
                chairTypeName: 'normal',
                chairTypePrice: 10
            })
        })

        it('should be able to edit to a chair type name that does not exist yet', () => {
            const movieTheater = createMovieTheater([
                new ChairType({
                    id: '1',
                    name: 'd-box',
                    price: 20
                })
            ])

            movieTheater.editChairType({
                chairTypeId: '1',
                chairTypeName: 'Edited d-box',
                chairTypePrice: 20
            })

            expect(movieTheater.getChairTypes()).toEqual([
                new ChairType({
                    id: '1',
                    name: 'Edited d-box',
                    price: 20
                })
            ])
        })

        it.fails('should not be able to edit a chair type name to an existing one', () => {
            const movieTheater = createMovieTheater([
                new ChairType({
                    id: '1',
                    name: 'd-box',
                    price: 20
                }),
                new ChairType({
                    id: '2',
                    name: 'normal',
                    price: 10
                })
            ])

            movieTheater.editChairType({
                chairTypeId: '1',
                chairTypeName: 'normal',
                chairTypePrice: 20
            })
        })

        it("should be able to edit a chair type price", () => {
            const movieTheater = createMovieTheater([
                new ChairType({
                    id: '1',
                    name: 'd-box',
                    price: 20
                })
            ])

            movieTheater.editChairType({
                chairTypeId: '1',
                chairTypeName: 'd-box',
                chairTypePrice: 50
            })

            expect(movieTheater.getChairTypes()).toEqual([
                new ChairType({
                    id: '1',
                    name: 'd-box',
                    price: 50
                })
            ])
        })
    })
})