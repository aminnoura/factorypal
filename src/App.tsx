import React, { ReactElement, useEffect ,useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions, View } from 'react-native';
import ChartKits from './components/chartkits/ChartKits';
import { useQuery } from '@apollo/client';
import { PERFORMANCE_DATA_TYPE, StackedBarChartDataType, performanceDataType, progressChartDataType, efficiencyChartDataType  } from './graphql/types';
import { GET_PERFORMANCE_DATA } from './graphql/queries';
import ProgressChartComponent from './components/progressChart/ProgressChart';
import BarChartComponent from './components/barChart/BarChart';
import { stackBarColors } from './helpers/colors';
import TableComponent from './components/table/Table';

const App: () => ReactElement = () => {
	const { data } = useQuery<PERFORMANCE_DATA_TYPE>(GET_PERFORMANCE_DATA);
	const [stackedBarChartData, setStackedBarChartData] = useState<StackedBarChartDataType[]>([]);
	const [progressChartData, setProgressChartData] = useState<progressChartDataType>();
	const [efficiencyChartData, setEfficiencyChartData] = useState<efficiencyChartDataType>();
	const [activeCategory, setActiveCategory] = useState<string>("");

	useEffect( ()=>{
		if (data && data.performanceData) {
			let {performanceData} = data;
			let temp:StackedBarChartDataType[] =[];
			let tempProgress: progressChartDataType = {
				labels: [],
				data: []
			};
			let tempEfficiency: efficiencyChartDataType = {
				labels: [],
				datasets: [
					{
						data: []
					}
				]
			};
			performanceData.map( (pd:performanceDataType, index)=>{
				let i = temp.findIndex(x=> x.category===pd.category && x.type===pd.type );

				// creating a progress bar data
				if (pd.type==='percentage') {
					tempProgress.labels.push(pd.label);
					tempProgress.data.push(pd.value);
				} else if (pd.type==='number') {
					tempEfficiency.labels.push(pd.label);
					tempEfficiency.datasets[0].data.push(pd.value)
				}

				if (i !== -1) {
					temp[i].legend.push(pd.label);
					temp[i].barColors.push( stackBarColors(temp[i].barColors.length+2) );
					temp[i].data[0].push(pd.value>0?pd.value:-pd.value);
				} else {
					temp.push({
						category: pd.category,
						type: pd.type,
						labels: [pd.category+" ("+pd.type+")"],
						legend: [pd.label],
						data:[[pd.value>0?pd.value:-pd.value]],
						barColors: [ stackBarColors(0) ]
					})
				}
			})

			setStackedBarChartData(temp);
			setProgressChartData(tempProgress);
			setEfficiencyChartData(tempEfficiency);
		}
	},[data])
	return (
		<SafeAreaView style={styles.safeAreaViewStyle}>
			<ScrollView nestedScrollEnabled = {true} contentContainerStyle={styles.scrollViewStyle} contentInsetAdjustmentBehavior="automatic">
				<View style={styles.topChartStyle}>
					{progressChartData && <ProgressChartComponent progressData={progressChartData} />}
					{efficiencyChartData && <BarChartComponent efficiencyChartData={efficiencyChartData} />}
					{stackedBarChartData && stackedBarChartData.length>0 && <ChartKits setActiveCategory={setActiveCategory} stackedBarChartData={stackedBarChartData} /> }
					{data && data.performanceData && <TableComponent activeCategory={activeCategory} performanceData={data.performanceData} />}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeAreaViewStyle: {
		display: "flex",
		backgroundColor: "#222",
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	scrollViewStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	topChartStyle: {
		display: 'flex',
		flexDirection:'column',
		flex: 1
	}
});

export default App;
