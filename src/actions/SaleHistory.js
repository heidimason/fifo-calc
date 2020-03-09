export const ADD_SALE = 'ADD_SALE',
		  CLEAR_SALES = 'CLEAR_SALES',
		REVERSE_SALES = 'REVERSE_SALES'

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

	reverseSales = type => {
	    return {
	        type: REVERSE_SALES,
	        payload: type
	    }
	}
