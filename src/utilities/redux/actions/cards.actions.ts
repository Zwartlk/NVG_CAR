
import firebaseInstance from "../../services/firebase";
import { CARDS_KEYACTION } from "../types/nvgInit.type";

function receiveCardsTypes(items: any) {
    return {
        type: CARDS_KEYACTION.GET,
        cards: items,
        sorted: items,
        receivedAt: Date.now()
    };
}

function receiveFilterTypes(items: any) {
    return {
        type: CARDS_KEYACTION.FILTER,
        sorted: items,
        receivedAt: Date.now()
    };
}


export function fetchCards() {
    return (dispatch: any) => {
        return firebaseInstance.getCards().then(response => {
            dispatch(receiveCardsTypes(response));
        });
    };
}

export function fetchFilter(items: any) {
    return (dispatch: any) => {
        dispatch(receiveFilterTypes(items));
    };
}