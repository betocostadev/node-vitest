import { expect, test } from 'vitest'
import { Appointment } from './appointment'

test('create an appointment', () => {
	const startsAt = new Date()
	const endsAt = new Date()
	startsAt.setDate(startsAt.getDate() + 1)
	endsAt.setDate(endsAt.getDate() + 2)

	const appointment = new Appointment({
		customer: 'The customer',
		startsAt,
		endsAt
	})

	expect(appointment).toBeInstanceOf(Appointment)
	expect(appointment.customer).toBe('The customer')
	expect(appointment.startsAt).toBeInstanceOf(Date)
	expect(appointment.endsAt).toBeInstanceOf(Date)
})

test('cannot create appointment with end date before start date', () => {
	const startsAt = new Date()
	const endsAt = new Date()

	endsAt.setDate(startsAt.getDate() - 1)

	expect(() => {
		return new Appointment({
			customer: 'Joaquim',
			startsAt,
			endsAt
		})
	}).toThrow('End date must be after start date')
})
