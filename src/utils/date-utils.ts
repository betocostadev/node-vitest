export const setDateByDays = (date: Date, daysToAdd: number): Date => {
	date.setDate(date.getDate() + daysToAdd)
	return date
}

export const createDateByDays = (days: number): Date => {
	return new Date(new Date().setDate(new Date().getDate() + days))
}
