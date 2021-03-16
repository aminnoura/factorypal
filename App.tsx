import React from 'react';
import type { Node } from 'react';
import { SafeAreaView, ScrollView, Dimensions, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { DATA_TYPE } from './src/graphql/types';
import { GET_LIST } from './src/graphql/queries';

const App: () => Node = () => {

	// Getting data from backend by graphql
	const { data } = useQuery<DATA_TYPE>(GET_LIST);

	return (
		<SafeAreaView style={styles.safeAreaViewStyle}>
			<ScrollView contentContainerStyle={styles.scrollViewStyle} contentInsetAdjustmentBehavior="automatic">
				<View>
					{/* displaying list of data from backend */}
					{data?.list?.map( (item, index) => {
						return <Text key={index}> {item.name + "\n"}</Text>
					})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeAreaViewStyle: {
		display: "flex",
	},
	scrollViewStyle: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "green",
		width: Dimensions.get('window').width
	}
});

export default App;
