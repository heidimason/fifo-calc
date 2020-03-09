export const ADD_PURCHASE = 'ADD_PURCHASE',
		  CLEAR_PURCHASES = 'CLEAR_PURCHASES',
		REVERSE_PURCHASES = 'REVERSE_PURCHASES'

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

	reversePurchases = type => {
	    return {
	        type: REVERSE_PURCHASES,
	        payload: type
	    }
	}
