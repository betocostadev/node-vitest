import { describe, expect, it } from 'vitest'
import { CreateAppointment } from './create-appointment'
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository'
import { createDateByDays } from '../utils/date-utils'
import { Appointment } from '../entities/appointment'

describe('Delete appointments', () => {
	it('should delete an appointment', async () => {
		const appointmentsRepository = new InMemoryAppointmentsRepository()
		const createAppointment = new CreateAppointment(appointmentsRepository)

		const startsAt = createDateByDays(1)
		const endsAt = createDateByDays(2)

		const appointment = await createAppointment.execute({
			customer: 'John Doe',
			startsAt,
			endsAt
		})

		expect(appointment).toBeInstanceOf(Appointment)
		expect(appointment.customer).toBe('John Doe')

		const appointmentsList = await appointmentsRepository.list()
		expect(appointmentsList.length).toBe(1)
		const appointmentId = appointmentsList[0].id
		expect(appointmentsRepository.delete({ id: appointmentId })).resolves.toBeUndefined()
		const appointmentsListUpdated = await appointmentsRepository.list()
		expect(appointmentsListUpdated.length).toBe(0)
	})
})
