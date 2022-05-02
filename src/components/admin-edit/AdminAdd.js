import React from 'react';
import AddStudent from './AddStudent';
import AddGroup from './AddGroup';
import AddSchool from './AddSchool';
import AddJournal from './AddJournal';

export default function AdminAdd(props) {
    
    const myStyle2 = {
        width: '70%',
        marginLeft: '15%'
    }
    const inActiveGroups = props.groups.filter(g => g.inActive == true).map(g => g.name);
    const inActiveStudents = props.students.filter(s => inActiveGroups.includes(s.group));
    if( props.schools !== [] && props.groups !== [] && props.students !== [] ){

    return (
        <div>
            <h1 align="center">Додати школу <i className="fas fa-school"></i></h1>
            
            <AddSchool schools={props.schools} refresh={props.refresh}/>

            <h1 align="center">Додати групу <i className="fas fa-users"></i></h1>
            <div style={myStyle2}>
                <AddGroup schools={props.schools} groups={props.groups} refresh={props.refresh}/>
            </div>

            <h1 align="center">Додати журнал <i className="fas fa-table"></i></h1>
            <div style={myStyle2}>
                <AddJournal schools={props.schools} groups={props.groups} refresh={props.refresh}/>
            </div>

            <h1 align="center">Додати учня <i className="fas fa-user-graduate"></i></h1>
            <h4 align="center">Всього - {props.students.length}</h4>
            <div style={myStyle2}>
                <AddStudent groups={props.groups} students={props.students} refresh={props.refresh}/>
            </div>
        </div>
    )
    }
}
