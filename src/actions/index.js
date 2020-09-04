export const login = (props) => {
    return {
        type: "SIGN_IN",
        payload: props
    }
}

export const saveUserInStore = (props) => {
    return {
        type: "SAVE_USER_IN_STORE",
        payload: props
    }
}

export const saveStudentInfoInStore = (props) => {
    return {
        type: "SAVE_STUDENT_INFO_IN_STORE",
        payload: props
    }
}

export const userStatus = (props) => {
    return {
        type: "SET_USER_STATUS",
        payload: props
    }
}

export const adminLogin = (props) => {
    return {
        type: "ADMIN_SIGN_IN",
        payload: props
    }
}