import { AppointmentProps } from '../../@types/appointment'
import { Appointment } from '../../entities/appointment'
import { AppointmentsRepository } from '../appointments-repository'

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
	public appointments: Appointment[] = []

	async create(appointment: Appointment) {
		appointment.id = (this.appointments.length + 1).toString()
		this.appointments.push(appointment)
	}

	async findOverlappingAppointments(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
		const overlappingAppointment = this.appointments.find(appointment => {
			const startsBefore = appointment.startsAt.getTime() <= endsAt.getTime()
			const endsAfter = appointment.endsAt.getTime() >= startsAt.getTime()

			if (startsBefore && endsAfter) {
				console.log('Overlapping appointment found:', appointment)
				return true
			}
		})

		if (!overlappingAppointment) {
			return null
		}

		return overlappingAppointment
	}

	// async update(appointment: Appointment) {
	// 	const index = this.appointments.findIndex(a => a.id === appointment.id)
	// 	this.appointments[index] = appointment
	// }

	async delete(id: Pick<AppointmentProps, 'id'>) {
		const index = this.appointments.findIndex(a => a.id === id)
		this.appointments.splice(index, 1)
	}

	// async findByDate(date) {
	// 	return this.appointments.find(
	// 		appointment =>
	// 			appointment.startsAt.getTime() === date.getTime() || appointment.endsAt.getTime() === date.getTime()
	// 	)
	// }

	async list() {
		return this.appointments
	}
}
