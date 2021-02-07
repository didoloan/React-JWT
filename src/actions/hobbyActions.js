export const INIT_HOBBY = 'INIT_HOBBY'

export const ADD_HOBBY = 'ADD_HOBBY'

export const DELETE_HOBBY = 'REMOVE_HOBBY'

export const initialiseHobbies = hobbies => ({
    type:INIT_HOBBY,
    dataList:hobbies
})

export const addHobby = hobbies => ({
    type:ADD_HOBBY,
    dataList:hobbies
})

export const delHobby = index => ({
    type:DELETE_HOBBY,
    data:index
})