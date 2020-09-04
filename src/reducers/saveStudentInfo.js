const saveStudentInfo = (state = [], action) => {
    switch(action.type){
        case 'SAVE_STUDENT_INFO_IN_STORE': 
            state =  action.payload
            return state
        default:
            return state;
    }
}

export default saveStudentInfo;