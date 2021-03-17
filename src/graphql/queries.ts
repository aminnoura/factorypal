import { gql } from '@apollo/client';

export const GET_PERFORMANCE_DATA = gql`
	query performanceData {
		performanceData {
			label
			value
			type
			category
			description
		}
	}
`;