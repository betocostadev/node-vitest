import { type CreateAppointmentResponse, type CreateAppointmentRequest } from '../@types/appointment'
import { Appointment } from '../entities/appointment'

export class CreateAppointment {
	async execute({ customer, startsAt, endsAt }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
		const appointment = new Appointment({ customer, startsAt, endsAt })

		if (appointment.endsAt <= appointment.startsAt) {
			throw new Error('End date must be after start date')
		}

		if (appointment.customer === '') {
			throw new Error('Customer must be informed')
		}

		return appointment
	}
}
