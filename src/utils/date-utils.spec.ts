import { describe, expect, it } from 'vitest'
import { createDateByDays, setDateByDays } from './date-utils'

describe('DateUtils: SetDateByDays', () => {
	it('should return the current date', () => {
		const now = new Date()
		const changedDate = setDateByDays(now, 0)
		expect(changedDate).toBeInstanceOf(Date)
		expect(changedDate).toEqual(now)
	})

	it('should return the date with 1 day added', () => {
		const now = new Date()
		const datePlusOne = setDateByDays(new Date(), 1)
		expect(datePlusOne).toBeInstanceOf(Date)
		expect(datePlusOne.getDate()).toBe(now.getDate() + 1)
	})

	it('should return the date with 1 day subtracted', () => {
		const now = new Date()
		const dateMinusOne = setDateByDays(new Date(), -1)
		expect(dateMinusOne).toBeInstanceOf(Date)
		expect(dateMinusOne.getDate()).toBe(now.getDate() - 1)
	})
})

describe('DateUtils: CreateDateByDays', () => {
	it('should return the current date', () => {
		const now = new Date()
		const currentDate = createDateByDays(0)
		expect(currentDate).toBeInstanceOf(Date)
		expect(currentDate).toEqual(now)
	})

	it('should return the date with 1 day added', () => {
		const now = new Date()
		const datePlusOne = createDateByDays(1)
		expect(datePlusOne.getDate()).toBe(now.getDate() + 1)
	})

	it('should return the date with 1 day subtracted', () => {
		const now = new Date()
		const dateMinusOne = createDateByDays(-1)
		expect(dateMinusOne.getDate()).toBe(now.getDate() - 1)
	})
})
