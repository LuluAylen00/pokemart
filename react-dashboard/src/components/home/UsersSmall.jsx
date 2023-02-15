import React, { Fragment , useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import blitzcrank from '../../modules/blitzcrank';

export default function UsersSmall() {

    const [ totalUsers, setTotalUsers ] = useState(0)

    useEffect(() => {
        blitzcrank("users").then((d) => {
            setTotalUsers(d.meta.count);
        })
        .catch((e) => { console.log(e);})        
    },[])

    useEffect(() => {
        blitzcrank("users").then((d) => {
            setTotalUsers(d.meta.count);
        })
        .catch((e) => { console.log(e);})        
    },[totalUsers])

    return (
        <Fragment>
            <section className="small-section" id="users-small">
                <FontAwesomeIcon icon={faUser} />
                <section id="users-small-data">
                    <p>Usuarios</p>
                    <p>{totalUsers}</p>
                </section>
            </section>
        </Fragment>
    )
}