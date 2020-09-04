
import { combineReducers } from 'redux';

import isLogged from './isLogged';
import saveUserInStore from './saveUserInStore';
import admin from './admin';
import saveStudentInfo from './saveStudentInfo';
import status from './status'


const allReducers = combineReducers({
    isLogged,
    saveUserInStore,
    admin,
    saveStudentInfo,
    status
})

export default allReducers;