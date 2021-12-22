import { CARDS_KEYACTION } from "../types/nvgInit.type";

export function handleCards(state = {
    isFetching: false,
    cards: {},
    sorted: {},
    error: {}
}, action: any) {
    switch (action.type) {
        case CARDS_KEYACTION.GET:
            {
                return {
                    ...state,
                    cards: action.cards,
                    sorted: action.sorted
                };
            }

        case CARDS_KEYACTION.FILTER:
            {
                return {
                    ...state,
                    sorted: action.sorted
                };
            }

        default:
            return state;
    }
}