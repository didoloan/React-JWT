import { INIT_HOBBY, ADD_HOBBY, DELETE_HOBBY } from '../actions/hobbyActions'

const hobbyReducer = (initial=[], action) => {
    switch(action.type) {
        case INIT_HOBBY:
            return action.datalist;
        case ADD_HOBBY:
            return [...initial, ...action.dataList]
        case DELETE_HOBBY:
            return initial.filter((state, index) => index!==action.data)
        default:
            return initial
    }
}

export default hobbyReducer;