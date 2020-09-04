const status = (state = 'Guest', action) => {
    switch(action.type){
        case 'SET_USER_STATUS':
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default status;