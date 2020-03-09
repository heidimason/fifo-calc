export const ADD_PURCHASE = 'ADD_PURCHASE',
		   SORT_PURCHASES = 'SORT_PURCHASES'

export const addPurchase = type => {
	    return {
	        type: ADD_PURCHASE,
	        payload: type
	    }
	},

	sortPurchases = type => {
	    return {
	        type: SORT_PURCHASES,
	        payload: type
	    }
	}
