// capitalise syntax means do not try to 
// modify this object under any circumstances  

const INTIAL_STATE = {
    isSignedIn: null,
    // must add user id default state to intial state
    userId: null
};

export default ( state = INTIAL_STATE, action ) => {
    switch( action.type ){
        case 'SIGN_IN':
            // update user id and that property will recieved from 
            // action.payload
            return { ...state, isSignedIn: true, userId: action.payload }
        
        case "SIGN_OUT":
            // we dont want to keep user id when use logout
            // we return it to null
            return { ...state, isSignedIn: false, userId: null }

        default:
            return state;
    }
}