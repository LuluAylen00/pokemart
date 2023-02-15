import React, { Fragment , useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns } from '@fortawesome/free-solid-svg-icons';
import blitzcrank from '../../modules/blitzcrank';

export default function CategoriesSmall() {

    const [ totalCategories, setTotalCategories ] = useState(0)

    useEffect(() => {
        blitzcrank("subcategories").then((d) => {
            setTotalCategories(d.meta.count);
        })
        .catch((e) => { console.log(e);})        
    },[])

    useEffect(() => {
        blitzcrank("subcategories").then((d) => {
            setTotalCategories(d.meta.count);
        })
        .catch((e) => { console.log(e);})        
    },[totalCategories])

    return (
        <Fragment>
            <section className="small-section" id="categories-small">
                <FontAwesomeIcon icon={faColumns} />
                <section id="categories-small-data">
                    <p>Categorías</p>
                    <p>{totalCategories}</p>
                </section>
            </section>
        </Fragment>
    )
}
