import { PRODUCT_KEYACTION } from '../types/product.type';
import firebaseInstance from "../../services/firebase";

function receiveProductTypes(product: any, error?: any) {
    return {
        type: PRODUCT_KEYACTION.GET,
        product: product,
        error: error,
        receivedAt: Date.now()
    };
}


export function getProduct(id: string) {
    return (dispatch: any) => {
        return firebaseInstance.getProduct(id).then(response => {
            dispatch(receiveProductTypes(response, null));
        }).catch(err => {
            dispatch(receiveProductTypes({}, err));
        });
    };
}