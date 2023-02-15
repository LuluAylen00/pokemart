import React, { Fragment , useState, useEffect } from 'react';
import '../styles/header.css';
import logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import productsLogo from '../assets/productsLogo.webp';
import usersLogo from '../assets/usersLogo.webp';
import categoriesLogo from '../assets/categoriesLogo.webp';
import ordersLogo from '../assets/ordersLogo.webp';

let list = [
    {
        id: 1,
        menu: "Productos",
        link: "/products",
        logo: productsLogo
    },{
        id: 2,
        menu: "Categorías",
        link: "/categories",
        logo: categoriesLogo
    },{
        id: 3,
        menu: "Órdenes",
        link: "/sales",
        logo: ordersLogo
    },{
        id: 4,
        menu: "Usuarios",
        link: "/users",
        logo: usersLogo
    },
]

function Header() {

    const [ selected, setSelected ] = useState(0)
    const [ links, setLinks ] = useState([])
    

    useEffect(() => {
        function setter(id){
            setSelected(id)
        }
        let acc = []
        list.forEach((link, i) => {
            acc.push(<Link to={link.link} key={"link"+i} onClick={() => setter(link.id)} className={window.location.pathname === link.link ? "header-link selected-link" : "header-link"} exact="true">
            <img src={ link.logo } alt="Item" className="nav-icon" />
            <p className="nav-title">{link.menu}</p>
        </Link>)
        setLinks(acc);
        })
      }, []);

    useEffect(() => {
        function setter(id){
            setSelected(id)
        }
        let acc = []
        list.forEach((link, i) => {
            acc.push(<Link to={link.link} key={"link"+i} onClick={() => setter(link.id)} className={window.location.pathname === link.link || selected === link.id ? "header-link selected-link" : "header-link"} exact="true">
            <img src={ link.logo } alt="Item" className="nav-icon" />
            <p className="nav-title">{link.menu}</p>
        </Link>)
        setLinks(acc);
        })
      }, [selected]);

    
      

    

    return (
        <Fragment>
            {/* <audio src="/sound/a-button.mp3" autoPlay="true"></audio> */}
            <header>
                <section id="header-top">
                    <Link to="/" id="main-logo" exact="true" onClick={() => setSelected(0)}>
                            <img src={logo} alt="Logo" />
                    </Link>
                    <a href="http://localhost:3151/" id="login-button">
                        <i id="user-icon" className="fa-solid fa-right-from-bracket"></i>
                        <article id="login-laptop">
                            <i id="user-icon-laptop" className="fa-solid fa-right-from-bracket"></i>
                            {/* <i id="user-icon" className="fa-solid fa-right-from-bracket"></i> */}
                            <p>Volver al sitio</p>
                        </article>
                    </a>
                </section>
                <nav id="header-bot">
                    { links }
                </nav>
            </header>
        </Fragment>
    );
}

export default Header;
