import { ViewStyle } from "react-native";


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

// ChartConfig
export interface ChartConfig {
	backgroundColor?: string;
	backgroundGradientFrom?: string;
	backgroundGradientFromOpacity?: number;
	backgroundGradientTo?: string;
	backgroundGradientToOpacity?: number;
	fillShadowGradient?: string;
	fillShadowGradientOpacity?: number;
	color: (opacity: number, index?: number) => string;
	labelColor: (opacity: number) => string;
	strokeWidth?: number;
	barPercentage?: number;
	barRadius?: number;
	propsForBackgroundLines?: object;
	propsForLabels?: TextProps;
	decimalPlaces?: number;
	style?: ViewStyle;
  }

export interface StackedBarChartData {
	labels: string[];
	legend: string[];
	data: number[][];
	barColors: string[];
}


interface StackedBarChartProps {
	data: StackedBarChartData;
	width: number;
	height: number;
	chartConfig: ChartConfig;
	style?: ViewStyle;
	barPercentage?: number;
	hideLegend: boolean;
	segments?: number;
}