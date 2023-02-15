import React, { Fragment , useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import blitzcrank from '../../modules/blitzcrank';

export default function ProductsSmall() {

    const [ totalProducts, setTotalProducts ] = useState(0)

    useEffect(() => {
        blitzcrank("products").then((d) => {
            setTotalProducts(d.meta.count);
        })
        .catch((e) => { console.log(e);})        
    },[])

    useEffect(() => {
        blitzcrank("products").then((d) => {
            setTotalProducts(d.meta.count);
        })
        .catch((e) => { console.log(e);})        
    },[totalProducts])

    return (
        <Fragment>
            <section className="small-section" id="product-small">
                <FontAwesomeIcon icon={faBarcode} />
                <section id="product-small-data">
                    <p>Productos</p>
                    <p>{totalProducts}</p>
                </section>
            </section>
        </Fragment>
    )
}
