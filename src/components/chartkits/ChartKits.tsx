import React, { ReactElement, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Dimensions, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { barChartDataTYPE, PERFORMANCE_DATA_TYPE } from '../../graphql/types';
import { GET_PERFORMANCE_DATA } from '../../graphql/queries';
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart
  } from "react-native-chart-kit";
import { colors } from '../../helpers/colors';


type BarChartData = {
	labels: Array<String>;
	datasets: Array<DataSet>;
};

const dataff: BarChartData = {
	labels: ['9/19', '9/20', '9/21', '9/22', '9/23', '9/24', '9/25'],
	datasets: [
	  {
		data: [5, 0, 2, 4, 6, 3, 0],
	  },
	],
  };

const ChartKits: () => ReactElement = () => {
	const [barChartData,setBarChartData] = useState<barChartDataTYPE>({
		labels : [],
		datasets : [
			{
				data : []
			}
		]
	}); 
	const [stackedBarChartData] = useState<stackedBarChartDataTYPE>({
		labels: ["Test1", "Test2"],
		legend: ["L1", "L2", "L3"],
		data: [
		  [60, 60, 60],
		  [30, 30, 60]
		],
		barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
	  });

	const chartConfig = {
		backgroundColor: colors.green,
		backgroundGradientFrom: colors.green,
		backgroundGradientTo: colors.green,
		decimalPlaces: 2,
		color: (opacity = 1) => `rgba(60, 60, 150, ${opacity})`,
		labelColor: (opacity = 1) => `rgba(30, 30, 130, ${opacity})`,
		style: {
			borderRadius: 16,
		},
		propsForDots: {
			r: "6",
			strokeWidth: "1",
			stroke: colors.blue
		}
	}
	
	const { width: screenWidth } = Dimensions.get('window');

	// Getting data from backend by graphql
	const { data } = useQuery<PERFORMANCE_DATA_TYPE>(GET_PERFORMANCE_DATA);

	useEffect( ()=>{
		if (data && data.performanceData) {
			let temp = Object.assign({},barChartData);
			data.performanceData.map( (pd)=>{
				temp.labels.push(pd.label);
				temp.datasets[0].data.push(pd.value);
				console.log(pd.category)
			})
			setBarChartData(temp);
		}
	} , [data] )

	return (
		<SafeAreaView style={styles.safeAreaViewStyle}>
			<ScrollView contentContainerStyle={styles.scrollViewStyle} contentInsetAdjustmentBehavior="automatic">
				{/* <View>
					<Text style={styles.chartHeader}>BAR CHART</Text>
					{barChartData && <BarChart
						style={styles.graphStyle}
						data={barChartData}
						width={Dimensions.get('window').width-20}
						height={300}
						yAxisLabel="%"
						chartConfig={chartConfig}
						verticalLabelRotation={30}
					/>}
				</View> */}
				<View>
				<BarChart
					style={styles.graphStyle}
					showBarTops={false}
					showValuesOnTopOfBars={true}
					withInnerLines={true}
					segments={3}
					data={dataff}
					width={screenWidth - 15}
					height={175}
					yAxisLabel=""
					chartConfig={chartConfig}
					verticalLabelRotation={0}
					withHorizontalLabels={false}
				/>
				</View>
				<View>
					<StackedBarChart
						style={styles.graphStyle}
						data={stackedBarChartData}
						width={Dimensions.get('window').width-20}
						height={220}
						chartConfig={chartConfig}
						withHorizontalLabels={false}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeAreaViewStyle: {
		display: "flex",
		backgroundColor: "#dddddd",
		flexGrow: 1,
		padding: 8
	},
	scrollViewStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: Dimensions.get('window').width
	},
	chartHeader:{
		fontSize: 28,
		fontWeight: '600'
	},
	graphStyle: {
		margin: 8,
		borderRadius: 8
	}
});

export default ChartKits;
