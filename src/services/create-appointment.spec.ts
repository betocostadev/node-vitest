import { describe, expect, it } from 'vitest'
import { CreateAppointment } from './create-appointment'
import { Appointment } from '../entities/appointment'
import { createDateByDays } from '../utils/date-utils'
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository'

describe('create an appointment', () => {
	const appointmentsRepository = new InMemoryAppointmentsRepository()

	it('should create an appointment', () => {
		const createAppointment = new CreateAppointment(appointmentsRepository)

		const startsAt = createDateByDays(1)
		const endsAt = createDateByDays(2)

		expect(
			createAppointment.execute({
				customer: 'Testman',
				startsAt,
				endsAt
			})
		).resolves.toBeInstanceOf(Appointment)
	})

	it('should not create appointment with no customer', () => {
		const createAppointment = new CreateAppointment(appointmentsRepository)

		const startsAt = createDateByDays(1)
		const endsAt = createDateByDays(2)

		expect(
			createAppointment.execute({
				customer: '',
				startsAt,
				endsAt
			})
		).rejects.toThrow('Customer must be informed')
	})

	it('should not create appointment with end date iguals or before start date', () => {
		const createAppointment = new CreateAppointment(appointmentsRepository)

		const startsAt = createDateByDays(1)
		const endsAt = createDateByDays(1)

		expect(
			createAppointment.execute({
				customer: 'No bro',
				startsAt,
				endsAt
			})
		).rejects.toThrow('End date must be after start date')
	})

	it('should not create appointment with start date before now', () => {
		const createAppointment = new CreateAppointment(appointmentsRepository)

		const startsAt = createDateByDays(-1)
		const endsAt = new Date()

		expect(
			createAppointment.execute({
				customer: 'Too early',
				startsAt,
				endsAt
			})
		).rejects.toThrow('Start date must be in the future')
	})

	it('should create appointment for John Doe with start date for two days in the future and end date five days in the future', async () => {
		const createAppointment = new CreateAppointment(appointmentsRepository)

		const startsAt = new Date()
		const endsAt = new Date()
		startsAt.setDate(startsAt.getDate() + 2)
		endsAt.setDate(endsAt.getDate() + 5)

		// Await the promise to resolve
		const appointment = await createAppointment.execute({
			customer: 'John Doe',
			startsAt,
			endsAt
		})

		expect(appointment).toBeInstanceOf(Appointment)

		expect(appointment.customer).toBe('John Doe')
		expect(appointment.startsAt).toBeInstanceOf(Date)
		expect(appointment.endsAt).toBeInstanceOf(Date)
		expect(appointment.startsAt).toBe(startsAt)
		expect(appointment.endsAt).toBe(endsAt)
	})

	it('should not create appointment with overlapping dates', () => {
		const createAppointment = new CreateAppointment(appointmentsRepository)

		const startsAt = createDateByDays(1)
		const endsAt = createDateByDays(2)

		expect(
			createAppointment.execute({
				customer: 'Testman',
				startsAt,
				endsAt
			})
		).rejects.toThrow('Appointment overlaps with another appointment')
	})

	it('should create an appointment for the same customer', () => {
		const createAppointment = new CreateAppointment(appointmentsRepository)

		const startsAt = createDateByDays(5)
		const endsAt = createDateByDays(7)

		expect(
			createAppointment.execute({
				customer: 'Testman',
				startsAt,
				endsAt
			})
		).resolves.toBeInstanceOf(Appointment)
	})
})
