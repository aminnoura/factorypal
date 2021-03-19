import React, { FC } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { progressChartData } from '../../graphql/types';
import {ProgressChart} from "react-native-chart-kit";
import { colors } from '../../helpers/colors';

type chartKitsPropTypes = {
	progressData: progressChartData
}

const ProgressChartComponent:FC<chartKitsPropTypes> = ({progressData}) => {
	const chartConfig = {
		barPercentage: 1,
		backgroundColor: colors.green1,
		backgroundGradientFrom: colors.green1,
		backgroundGradientTo: colors.green1,
		color: (opacity = 1) => `rgba(20, 20, 110, ${opacity})`,
		labelColor: (opacity = 1) => `rgba(20, 20, 110, ${opacity})`
	}
	console.log(progressData)

	return (
		<View style={styles.progressBarTopView}>
			<ProgressChart
				data={progressData}
				width={Dimensions.get('window').width}
				height={220}
				strokeWidth={16}
				radius={32}
				chartConfig={chartConfig}
				hideLegend={false}
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

export default ProgressChartComponent;
