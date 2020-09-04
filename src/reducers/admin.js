const admin = (state = false, action) => {
    switch(action.type){
        case 'ADMIN_SIGN_IN': 
            return action.payload;
        default:
            return state;
    }
}

export default admin;