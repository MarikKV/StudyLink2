const saveUserInStore = (state = [], action) => {
    switch(action.type){
        case 'SAVE_USER_IN_STORE': 
            state =  action.payload
            return state
        default:
            return state;
    }
}

export default saveUserInStore;