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
		backgroundColor: colors.chartsBackground,
		backgroundGradientFrom: colors.chartsBackground,
		backgroundGradientTo: colors.chartsBackground,
		color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		showBarTops: false,
		withInnerLines: false,
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
