import React, { FC } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { barChartDataTYPE } from '../../graphql/types';
import {BarChart} from "react-native-chart-kit";
import { colors } from '../../helpers/colors';

type chartKitsPropTypes = {
	efficiencyChartData: barChartDataTYPE
}

const BarChartComponent:FC<chartKitsPropTypes> = ({efficiencyChartData}) => {
	const chartConfig = {
		barPercentage: 1,
		backgroundColor: colors.green3,
		backgroundGradientFrom: colors.green3,
		backgroundGradientTo: colors.green3,
		color: (opacity = 1) => `rgba(20, 20, 50, ${opacity})`,
		labelColor: (opacity = 1) => `rgba(20, 20, 50, ${opacity})`,
		showBarTops: true,
		withInnerLines: true,
	}

	return (
		<View style={styles.progressBarTopView}>
			<BarChart
				data={efficiencyChartData}
				width={Dimensions.get('window').width}
				height={220}
				chartConfig={chartConfig}
				yAxisLabel=""
				yAxisSuffix=""
				fromZero={true}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	progressBarTopView: {
		display: 'flex',
		width: Dimensions.get('window').width,
		marginBottom: 10
	}
})

export default BarChartComponent;
