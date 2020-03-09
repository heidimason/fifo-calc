export const ADD_SALE = 'ADD_SALE',
		  CLEAR_SALES = 'CLEAR_SALES',
		   SORT_SALES = 'SORT_SALES'

export const addSale = type => {
	    return {
	        type: ADD_SALE,
	        payload: type
	    }
	},

	clearSales = type => {
	    return {
	        type: CLEAR_SALES,
	        payload: type
	    }
	},

	sortSales = type => {
	    return {
	        type: SORT_SALES,
	        payload: type
	    }
	}
