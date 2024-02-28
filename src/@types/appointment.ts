import { Appointment } from '../entities/appointment'

export interface AppointmentProps {
	customer: string
	startsAt: Date
	endsAt: Date
}

export interface CreateAppointmentRequest {
	customer: string
	startsAt: Date
	endsAt: Date
}

export type CreateAppointmentResponse = Appointment
