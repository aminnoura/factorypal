import React, { FC } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { StackedBarChartDataType } from '../../graphql/types';
import {StackedBarChart} from "react-native-chart-kit";
import { colors } from '../../helpers/colors';

type chartKitsPropTypes = {
	stackedBarChartData: StackedBarChartDataType[]
}

const ChartKits:FC<chartKitsPropTypes> = ({stackedBarChartData}) => {
	const chartConfig = {
		barPercentage: 1,
		backgroundColor: colors.green1,
		backgroundGradientFrom: colors.green1,
		backgroundGradientTo: colors.green1,
		color: (opacity = 1) => `rgba(20, 20, 110, ${opacity})`,
		labelColor: (opacity = 1) => `rgba(20, 20, 110, ${opacity})`
	}

	return (
		<SafeAreaView style={styles.safeAreaViewStyle}>
			<ScrollView contentContainerStyle={styles.scrollViewStyle} contentInsetAdjustmentBehavior="automatic" horizontal={true}>
				<View style={styles.groupStackBarViewStyle}>
					{stackedBarChartData && stackedBarChartData.length>0 && stackedBarChartData.map( (stackedBarData, index) =>{
						return (
							<StackedBarChart
								key={index}
								style={styles.graphStyle}
								data={stackedBarData}
								width={250}
								height={320}
								chartConfig={chartConfig}
								withHorizontalLabels={true}
								hideLegend={false}
							/>
						)
					})}

				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeAreaViewStyle: {
		display: "flex",
		flexGrow: 1,
	},
	scrollViewStyle: {
		display: "flex",
	},
	groupStackBarViewStyle: {
		display: 'flex',
		flexDirection: 'row'
	},
	graphStyle: {
		margin: -1,
	}
});

export default ChartKits;
