import React, { ReactElement, useEffect ,useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions, View } from 'react-native';
import ChartKits from './components/chartkits/ChartKits';
import { useQuery } from '@apollo/client';
import { PERFORMANCE_DATA_TYPE, StackedBarChartDataType, performanceDataType, progressChartData } from './graphql/types';
import { GET_PERFORMANCE_DATA } from './graphql/queries';
import ProgressChartComponent from './components/progressChart/ProgressChart';

const App: () => ReactElement = () => {
	const { data } = useQuery<PERFORMANCE_DATA_TYPE>(GET_PERFORMANCE_DATA);
	const [stackedBarChartData, setStackedBarChartData] = useState<StackedBarChartDataType[]>([]);
	const [progressChartData, setProgressChartData] = useState<progressChartData>();

	useEffect( ()=>{
		if (data && data.performanceData) {
			let {performanceData} = data;
			let temp =[];
			let tempProgress: progressChartData ={
				labels: [],
				data: []
			};
			performanceData.map( (pd:performanceDataType)=>{
				let i = temp.findIndex(x=> x.category===pd.category && x.type===pd.type );

				if (pd.type==='percentage') {
					tempProgress.labels.push(pd.label);
					tempProgress.data.push(pd.value);
				}

				if (i !== -1) {
					// temp[i].labels.push(pd.category);
					temp[i].legend.push(pd.label);
					temp[i].barColors.push("#dae4ea");
					temp[i].data[0].push(pd.value>0?pd.value:-pd.value);
				} else {
					temp.push({
						category: pd.category,
						type: pd.type,
						labels: [pd.category+" ("+pd.type+")"],
						legend: [pd.label],
						data:[[pd.value>0?pd.value:-pd.value]],
						barColors: ["#dfe4ea"]
					})
				}
			})

			setStackedBarChartData(temp);
			setProgressChartData(tempProgress);
		}
	},[data])
	return (
		<SafeAreaView style={styles.safeAreaViewStyle}>
			<ScrollView contentContainerStyle={styles.scrollViewStyle} contentInsetAdjustmentBehavior="automatic">
				<View style={styles.topChartStyle}>
					{progressChartData && <ProgressChartComponent progressData={progressChartData} />}
					{stackedBarChartData && stackedBarChartData.length>0 && <ChartKits stackedBarChartData={stackedBarChartData} />}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeAreaViewStyle: {
		display: "flex",
		backgroundColor: "#222",
		flexGrow: 1,
	},
	scrollViewStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: Dimensions.get('window').width,
		height: '100%'
	},
	topChartStyle: {
		display: 'flex',
		flexDirection:'column',
		flex:1,
		flexGrow: 1,
		padding: 20
	}
});

export default App;
