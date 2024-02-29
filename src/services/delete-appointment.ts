import { DeleteAppointmentRequest, DeleteAppointmentResponse } from '../@types/appointment'
import { AppointmentsRepository } from '../repositories/appointments-repository'

export class DeleteAppointment {
	constructor(private appointmentsRepository: AppointmentsRepository) {}
	async execute(id: DeleteAppointmentRequest): Promise<DeleteAppointmentResponse> {
		if (!id) {
			throw new Error('Id must be informed')
		}

		await this.appointmentsRepository.delete(id)

		return undefined
	}
}
