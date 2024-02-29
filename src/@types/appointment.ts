import { Appointment } from '../entities/appointment'

export interface AppointmentProps {
	id?: string
	customer: string
	startsAt: Date
	endsAt: Date
}

export interface CreateAppointmentRequest {
	customer: string
	startsAt: Date
	endsAt: Date
}

export type DeleteAppointmentRequest = Pick<AppointmentProps, 'id'>

export type DeleteAppointmentResponse = void

export interface UpdateAppointmentRequest extends AppointmentProps {
	id: string
}

export type CreateAppointmentResponse = Appointment
