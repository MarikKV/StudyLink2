const isLogged = (state = false, action) => {
    switch(action.type){
        case 'SIGN_IN': 
            return action.payload;
        default:
            return state;
    }
}

export default isLogged;