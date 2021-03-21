import React, { ReactElement, useEffect ,useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions, View, Text } from 'react-native';
import ChartKits from './components/chartkits/ChartKits';
import { useQuery } from '@apollo/client';
import { PERFORMANCE_DATA_TYPE, StackedBarChartDataType, performanceDataType, progressChartDataType, efficiencyChartDataType  } from './graphql/types';
import { GET_PERFORMANCE_DATA } from './graphql/queries';
import ProgressChartComponent from './components/progressChart/ProgressChart';
import BarChartComponent from './components/barChart/BarChart';
import { colors, stackBarColors } from './helpers/colors';
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
					<Text style={styles.headerText}>Sample Progress Bar</Text>
					{progressChartData && <ProgressChartComponent progressData={progressChartData} />}
					<Text style={styles.headerText}>Sample Bar Chart</Text>
					{efficiencyChartData && <BarChartComponent efficiencyChartData={efficiencyChartData} />}
					<Text style={styles.headerText}>Sample Stacked Chart</Text>
					<Text style={styles.descriptionText}>This section display few charts based on different category and type, By clicking on any of the charts, the same category on the table will get highlighted. </Text>
					{stackedBarChartData && stackedBarChartData.length>0 && <ChartKits setActiveCategory={setActiveCategory} stackedBarChartData={stackedBarChartData} /> }
					<Text style={styles.headerText}>Sample Table</Text>
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
	},
	headerText: {
		fontSize: 24,
		color: colors.white,
		textAlign: 'center',
		marginTop: 20,
		marginBottom: 4,
	},
	descriptionText: {
		fontSize: 18,
		color: colors.gray,
		marginBottom: 12,
		paddingLeft: 12
	}
});

export default App;
