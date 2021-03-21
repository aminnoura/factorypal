import React, { FC } from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import { performanceDataType } from '../../graphql/types';
import { colors } from '../../helpers/colors';
import TableRow from './TableRow';

type performanceDataPropTypes = {
	performanceData: performanceDataType[]
	activeCategory: string
}

const TableComponent:FC<performanceDataPropTypes> = ({performanceData, activeCategory}) => {
	return (
		<View style={styles.tableTopView}>
			<View style={styles.headers}>
				<Text style={styles.headerCells}>Category</Text>
				<Text style={styles.headerCells}>label</Text>
				<Text style={styles.headerCells}>type</Text>
				<Text style={styles.headerCells}>value</Text>
				<Text style={styles.headerCells}>Description</Text>
			</View>
			{performanceData.map( (pd:performanceDataType, index) => <TableRow activeCategory={activeCategory} key={index} rowData={pd} /> )}
		</View>
	);
};

const styles = StyleSheet.create({
	tableTopView: {
		display: 'flex',
		flexDirection: 'column',
		width: Dimensions.get('window').width,
		marginBottom: 40,
		marginTop: 10,
		backgroundColor: colors.green3,
		padding: 8,
	},
	headers: {
		display: 'flex',
		flexDirection: 'row',
	}, 
	headerCells: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: 'blue',
		borderWidth: 1,
		padding: 8,
		width: Dimensions.get('window').width/5.2,
		textAlign: 'center',
		fontSize: 9
	}
})

export default TableComponent;
