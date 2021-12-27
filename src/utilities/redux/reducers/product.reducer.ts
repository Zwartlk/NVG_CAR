import { PRODUCT_KEYACTION } from "../types/product.type";

export function handleProduct(state = {
    isFetching: false,
    product: {},
    error: null
}, action: any) {
    switch (action.type) {
        case PRODUCT_KEYACTION.GET:
            {
                return {
                    ...state,
                    product: action.product,
                    error: action.error
                };
            }

        default:
            return state;
    }
}