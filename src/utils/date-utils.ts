export const setDateByDays = (date: Date, daysToAdd: number): string => {
	date.setDate(date.getDate() + daysToAdd)
	return date.toISOString()
}

export const createDateByDays = (days: number): Date => {
	return new Date(new Date().setDate(new Date().getDate() + days))
}
