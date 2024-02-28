import { type AppointmentProps } from '../@types/appointment'

export class Appointment {
	private readonly props: AppointmentProps

	get customer(): string {
		return this.props.customer
	}

	get startsAt(): Date {
		return this.props.startsAt
	}

	get endsAt(): Date {
		return this.props.endsAt
	}

	constructor(props: AppointmentProps) {
		const { startsAt, endsAt } = props

		if (endsAt <= startsAt) {
			throw new Error('End date must be after start date')
		}

		if (startsAt <= new Date()) {
			throw new Error('Start date must be in the future')
		}

		this.props = props
	}
}
