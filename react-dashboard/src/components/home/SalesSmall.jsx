import React, { Fragment , useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox } from '@fortawesome/free-solid-svg-icons';
import blitzcrank from '../../modules/blitzcrank';

export default function SalesSmall() {

    const [ totalSales, setTotalSales ] = useState(0)

    useEffect(() => {
        blitzcrank("orders").then((d) => {
            setTotalSales(d.meta.trades);
        })
        .catch((e) => { console.log(e);})        
    },[])

    useEffect(() => {
        blitzcrank("orders").then((d) => {
            setTotalSales(d.meta.trades);
        })
        .catch((e) => { console.log(e);})        
    },[totalSales])

    return (
        <Fragment>
            <section className="small-section" id="sales-small">
                <FontAwesomeIcon icon={faBox} />
                <section id="sales-small-data">
                    <p>Compras</p>
                    <p>{totalSales}</p>
                </section>
            </section>
        </Fragment>
  )
}
