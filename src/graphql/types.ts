enum VALUE_TYPE {
	percentage = 'percentage',
	number = 'number',
	secs = 'sec',
	minutes = 'minutes',
	hours = 'hours'
}

enum CATEGORY_TYPE {
	efficiency = 'efficiency',
	shift = 'shift',
	downtime = 'downtime'
}

export interface performanceDataType {
	label: string;
	value: number;
	description: String;
	type: VALUE_TYPE;
	category: CATEGORY_TYPE;
}

export interface PERFORMANCE_DATA_TYPE {
	performanceData: [performanceDataType];
}

type datasetsTypes = {
	data: Number[]
}

export type barChartDataTYPE = {
	labels: string[]
	datasets: datasetsTypes[]
}