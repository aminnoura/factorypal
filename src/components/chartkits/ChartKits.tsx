import React, { FC } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { StackedBarChartDataType } from '../../graphql/types';
import {StackedBarChart} from "react-native-chart-kit";
import { colors } from '../../helpers/colors';

type chartKitsPropTypes = {
	stackedBarChartData: StackedBarChartDataType[]
	setActiveCategory: Function
}

const ChartKits:FC<chartKitsPropTypes> = ({stackedBarChartData, setActiveCategory}) => {
	const chartConfig = {
		barPercentage: 1.3,
		backgroundColor: colors.green2,
		backgroundGradientFrom: colors.green2,
		backgroundGradientTo: colors.green2,
		color: (opacity = 1) => `rgba(20, 20, 110, ${opacity})`,
		labelColor: (opacity = 1) => `rgba(20, 20, 110, ${opacity})`
	}

	return (
		<SafeAreaView style={styles.safeAreaViewStyle}>
			<ScrollView nestedScrollEnabled = {true} contentContainerStyle={styles.scrollViewStyle} contentInsetAdjustmentBehavior="automatic" horizontal={true}>
				<View style={styles.groupStackBarViewStyle}>
					{stackedBarChartData && stackedBarChartData.length>0 && stackedBarChartData.map( (stackedBarData, index) =>{
						return (
							<TouchableOpacity activeOpacity={1} key={index} onPress={()=>setActiveCategory(stackedBarData.category)}>
								<StackedBarChart
									style={styles.graphStyle}
									data={stackedBarData}
									width={250}
									height={320}
									chartConfig={chartConfig}
									withHorizontalLabels={true}
									hideLegend={false}
								/>
							</TouchableOpacity>
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
		width: Dimensions.get('window').width
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
