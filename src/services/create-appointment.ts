import { type CreateAppointmentResponse, type CreateAppointmentRequest } from '../@types/appointment'
import { Appointment } from '../entities/appointment'
import { AppointmentsRepository } from '../repositories/appointments-repository'

export class CreateAppointment {
	constructor(private appointmentsRepository: AppointmentsRepository) {}
	async execute({ customer, startsAt, endsAt }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
		const appointment = new Appointment({ customer, startsAt, endsAt })

		if (appointment.endsAt <= appointment.startsAt) {
			throw new Error('End date must be after start date')
		}

		if (appointment.customer === '') {
			throw new Error('Customer must be informed')
		}

		const overlappingAppointment = await this.appointmentsRepository.findOverlappingAppointments(startsAt, endsAt)

		if (overlappingAppointment) {
			throw new Error('Appointment overlaps with another appointment')
		}

		await this.appointmentsRepository.create(appointment)

		return appointment
	}
}
