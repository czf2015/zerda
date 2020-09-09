import { compare } from './basic.js'

export const getTime = (date) => new Date(date).getTime()

export const dateCompare = (date1, date2) => compare(getTime(date1), getTime(date2))

// Todo:
export const dateFormat = (date) => {
    return new Date(date).toLocaleString()
}