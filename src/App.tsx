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

/* ----------------------------------------------------------------- 

This is a test mobile application for FactoryPal job application
1. React Native
2. Only android version is build as I have no mac
3. TypeScript
4. Hooks
5. graphQL -> Apollo
6. Splash screen for android added 
7. Icon added
8. react-native-chart-kit used to display charts
9. As this application was small, did not use redux or any other state management
10. it was possible to provide more charts and display other data as well, but as this is a test I just did few of them
11. The design is not responsive
12. No test included in this application 

----------------------------------------------------------------- */

const App: () => ReactElement = () => {
	// This hook is getting data from the simple backend that I provide for the test purpose
	const { data } = useQuery<PERFORMANCE_DATA_TYPE>(GET_PERFORMANCE_DATA);

	// states of the application
	const [stackedBarChartData, setStackedBarChartData] = useState<StackedBarChartDataType[]>([]);
	const [progressChartData, setProgressChartData] = useState<progressChartDataType>();
	const [efficiencyChartData, setEfficiencyChartData] = useState<efficiencyChartDataType>();
	const [activeCategory, setActiveCategory] = useState<string>("");

	// after receiving data from backend, the data should be devided based on the chart input displayed
	useEffect( ()=>{
		if (data && data.performanceData) {
			let {performanceData} = data;
			let tempStacked:StackedBarChartDataType[] =[];
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
			performanceData.map( (pd:performanceDataType)=>{
				// creating a progress bar data
				if (pd.type==='percentage') {
					tempProgress.labels.push(pd.label);
					tempProgress.data.push(pd.value);
				} else if (pd.type==='number') {
					tempEfficiency.labels.push(pd.label);
					tempEfficiency.datasets[0].data.push(pd.value)
				}


				// There is an easy and one line solution to copy data into new object and add a category
				// but I need a completely new object based on the chart format
				// in normal work, I ask backend people to provide the data the way it should display
				// because I trust the frontend should be as dumb as possible and avoid measurements as much as possible
				// also anything that should change, must come from backend even the colors of the charts and chart configuration
				// so this is not what I really like to do 
				// even if I force to do this, I will handle it inside redux and will not do it here
				// but in this case as it is a small app, I did not add redux at all. 
				
				let i = tempStacked.findIndex(x=> x.category===pd.category && x.type===pd.type );

				if (i !== -1) {
					tempStacked[i].legend.push(pd.label);
					tempStacked[i].barColors.push( stackBarColors(tempStacked[i].barColors.length) );
					tempStacked[i].data[0].push(pd.value>0?pd.value:-pd.value);
				} else {
					tempStacked.push({
						category: pd.category,
						type: pd.type,
						labels: [pd.category+" ("+pd.type+")"],
						legend: [pd.label],
						data:[[pd.value>0?pd.value:-pd.value]],
						barColors: [ stackBarColors(0) ]
					})
				}
			})

			setStackedBarChartData(tempStacked);
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
		alignItems: 'center'
	},
	scrollViewStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: Dimensions.get('window').width-20,
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
		marginTop: 30,
		marginBottom: 12,
	},
	descriptionText: {
		fontSize: 18,
		color: colors.gray,
		marginBottom: 12,
		paddingLeft: 12
	}
});

export default App;
