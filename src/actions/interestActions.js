export const INIT_INTEREST = 'INIT_INTEREST'

export const ADD_INTEREST = 'ADD_INTEREST'

export const REMOVE_INTEREST = 'REMOVE_INTEREST'

export const initialiseInterests = interests => ({
    type:INIT_INTEREST,
    dataList:interests
})

export const addInterests = interests => ({
    type:ADD_INTEREST,
    dataList:interests
})

export const delInterest = index => ({
    type:REMOVE_INTEREST,
    data:index
})