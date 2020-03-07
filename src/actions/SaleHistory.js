export const ADD_SALE = 'ADD_SALE',
		   SORT_SALES = 'SORT_SALES'

export const addSale = type => {
	    return {
	        type: ADD_SALE,
	        payload: type
	    }
	},

	sortSales = type => {
	    return {
	        type: SORT_SALES,
	        payload: type
	    }
	}
