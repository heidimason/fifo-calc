export const ADD_PURCHASE = 'ADD_PURCHASE',
		  CLEAR_PURCHASES = 'CLEAR_PURCHASES',
		   SORT_PURCHASES = 'SORT_PURCHASES'

export const addPurchase = type => {
	    return {
	        type: ADD_PURCHASE,
	        payload: type
	    }
	},

	clearPurchases = type => {
	    return {
	        type: CLEAR_PURCHASES,
	        payload: type
	    }
	},

	sortPurchases = type => {
	    return {
	        type: SORT_PURCHASES,
	        payload: type
	    }
	}
