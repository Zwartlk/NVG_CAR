import { PRODUCT_KEYACTION } from "../types/product.type";

export function handleProduct(state = {
    isFetching: false,
    product: {},
    error: {}
}, action: any) {
    switch (action.type) {
        case PRODUCT_KEYACTION.GET:
            {
                return {
                    ...state,
                    product: action.product
                };
            }

        default:
            return state;
    }
}