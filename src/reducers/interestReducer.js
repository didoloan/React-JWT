import { INIT_INTEREST, ADD_INTEREST, REMOVE_INTEREST } from '../actions/interestActions'

const interestReducer = (initial=[], action) => {
    switch(action.type) {
        case INIT_INTEREST:
            return action.dataList
        case ADD_INTEREST:
            return [...initial, ...action.dataList]
        case REMOVE_INTEREST:
            // let lsst = []
            // console.log(action.index)
            // for(let key in initial){
            //     if(key!==action.index){
            //         lsst.push(initial[key])
            //     }
            // }
            // return lsst
            return initial.filter((state, index) => index!==action.data)
        default:
            return initial
    }
}

export default interestReducer;