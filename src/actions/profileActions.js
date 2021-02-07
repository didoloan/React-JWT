export const INIT_PROFILE = 'INIT_PROFILE'

export const SET_NAME = 'SET_NAME'

export const SET_EMAIL = 'SET_EMAIL'

export const initialiseProfile = user => ({
    type:INIT_PROFILE,
    data:user
})

export const setNames = names => ({
    type:SET_NAME,
    data:names
})

export const setEmail = newEmail => ({
    type:SET_EMAIL,
    data:newEmail
})

