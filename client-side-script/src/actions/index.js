export const signIn = (userId) =>{ // recieving user id as an agrument from dispatch action
    return {
        type: 'SIGN_IN',
        payload: userId // sending to reducer as payload property
    }
}

export const signOut = ()=>{
    return {
        type: 'SIGN_OUT'
    }
}