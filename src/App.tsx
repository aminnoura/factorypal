import React, { ReactElement } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import ChartKits from './components/chartkits/ChartKits';


const App: () => ReactElement = () => {
	return (
		<SafeAreaView style={styles.safeAreaViewStyle}>
			<ScrollView contentContainerStyle={styles.scrollViewStyle} contentInsetAdjustmentBehavior="automatic">
				<ChartKits/>
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
});

export default App;
