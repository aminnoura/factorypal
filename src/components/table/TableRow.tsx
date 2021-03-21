import React, { FC } from 'react';
import { Dimensions, Text, StyleSheet, View } from 'react-native';
import { performanceDataType } from '../../graphql/types';
import { colors } from '../../helpers/colors';

type rowPropTypes = {
	rowData: performanceDataType
	activeCategory: string
}

const TableRow:FC<rowPropTypes> = ({rowData, activeCategory}) => {
	return (
		<View style={[ styles.rowTopView, activeCategory===rowData.category?styles.active:null ]}>
			<Text style={styles.headerCells}>{rowData.category}</Text>
			<Text style={styles.headerCells}>{rowData.label}</Text>
			<Text style={styles.headerCells}>{rowData.type}</Text>
			<Text style={styles.headerCells}>{rowData.value}</Text>
			<Text style={styles.headerCells}>{rowData.description}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	rowTopView: {
		display: 'flex',
		flexDirection: 'row'
	},
	headerCells: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: colors.tableBorder,
		borderWidth: 1,
		padding: 8,
		width: Dimensions.get('window').width/5.2,
		textAlign: 'center',
		fontSize: 9,
		color: colors.tableCellColor
	},
	active: {
		backgroundColor: colors.tableHighlightetBackground
	}
})

export default TableRow;
