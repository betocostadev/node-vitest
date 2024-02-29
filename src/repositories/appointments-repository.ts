import { AppointmentProps } from '../@types/appointment'
import { Appointment } from '../entities/appointment'

export interface AppointmentsRepository {
	create(appointment: Appointment): Promise<void>
	findOverlappingAppointments(startsAt: Date, endsAt: Date): Promise<Appointment | null>
	// update(appointment: Appointment): Promise<void>
	delete(id: Pick<AppointmentProps, 'id'>): Promise<void>
	// findByDate(date: Date): Promise<Appointment | null>
	list(): Promise<Appointment[]>
}
