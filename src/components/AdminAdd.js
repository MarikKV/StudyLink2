import React from 'react';
import AddStudent from './AddStudent';
import AddGroup from './AddGroup';
import AddSchool from './AddSchool';

export default function AdminAdd(props) {
    
    const myStyle2 = {
        width: '70%',
        marginLeft: '15%'
    }
    if( props.schools !== [] && props.groups !== [] && props.students !== [] ){

    return (
        <div>
            <h1 align="center">Додати школу <i class="fas fa-school"></i></h1>
            
            <AddSchool schools={props.schools} refresh={props.refresh}/>

            <h1 align="center">Додати групу <i class="fas fa-users"></i></h1>
            <div style={myStyle2}>
                <AddGroup schools={props.schools} groups={props.groups} refresh={props.refresh}/>
            </div>

            <h1 align="center">Додати учня <i class="fas fa-user-graduate"></i></h1>
            <div style={myStyle2}>
                <AddStudent groups={props.groups} refresh={props.refresh}/>
            </div>
        </div>
    )
    }
}
