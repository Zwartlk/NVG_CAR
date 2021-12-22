import { PRODUCT_KEYACTION } from '../types/product.type';
import firebaseInstance from "../../services/firebase";

function receiveProductTypes(product: any) {
    return {
        type: PRODUCT_KEYACTION.GET,
        product: product,
        receivedAt: Date.now()
    };
}


export function getProduct(id: string) {
    return (dispatch: any) => {
        return firebaseInstance.getProduct(id).then(response => {
            dispatch(receiveProductTypes(response));
        });
    };
}