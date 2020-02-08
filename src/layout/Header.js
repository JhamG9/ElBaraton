import React, { useEffect } from 'react';
import categories from '../data/categories.json';
import SubLevelCategory from '../components/products/SubLevelCategory';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Header.css';
export default function Header(props) {
    const { router, setRouter } = props;
    const { setSubcategoriaSeleccionada, setSearchProduct, setUpdateListCar } = props;
    const MySwal = withReactContent(Swal);
    const buyProducts = () => {
        var products = localStorage.getItem('products');
        if (products) {
            let productsArray = JSON.parse(localStorage.getItem('products'));
            console.log(productsArray.length);
            if (productsArray.length === 0) {
                MySwal.fire({
                    title: "No hay productos ",
                    icon: 'error',
                    text: 'Actualmente no tienes productos en tu carrito, te invitamos a que mires uno de los muchos que tenemos para ti',
                    confirmButtonText: 'Aceptar',
                })
            } else {
                MySwal.fire({
                    title: '¿Estás seguro(a) de comprar el/los productos de tu carrito',
                    icon: 'question',
                    text: 'Una vez comprados esta acción no se puede',
                    confirmButtonText: 'Comprar',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        localStorage.removeItem('products');
                        MySwal.fire({
                            title: 'Producto(s) comprados satisfactoriamente',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        });

                        setUpdateListCar(true);


                    }
                });
            }
        } else {
            MySwal.fire({
                title: "No hay productos ",
                icon: 'error',
                text: 'Actualmente no tienes productos en tu carrito, te invitamos a que mires uno de los muchos que tenemos para ti',
                confirmButtonText: 'Aceptar',
            });
        }
        // console.log(localStorage.getItem('products'));
    }
    return (
        <nav className="navbar navbar-expand-md navbar-light" style={{backgroundColor:'#F77200'}}>
            <Link className="navbar-brand pb-2 tituloHeader" to="/" onClick={() => { setRouter('/') }}>El baratón</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">

                    {router === '/' ?
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categorias</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                {categories.categories.map((c) =>
                                    <li className="dropdown-submenu" key={c.id}><a className="dropdown-item dropdown-toggle">{c.name}</a>

                                        <ul className="dropdown-menu">
                                            {c.sublevels.map((s) =>
                                                <li className="dropdown-submenu" key={s.id}><a className="dropdown-item dropdown-toggle">{s.name}</a>
                                                    <SubLevelCategory setSubcategoriaSeleccionada={setSubcategoriaSeleccionada} sublevels={s.sublevels ? s.sublevels : []} />
                                                </li>
                                            )}
                                        </ul>
                                    </li>
                                )}
                            </ul>
                        </li>
                        : ""}


                    <li className="nav-item">
                        <Link className="nav-link" to="/carrito" onClick={() => { setRouter('/carrito') }}>Mi carrito</Link>
                    </li>
                    {router === "/carrito" ?
                        <li className="nav-item">
                            <button type="button" className="btn btn-success" onClick={buyProducts}>Comprar productos</button>
                        </li>
                        : ""}
                </ul>
            </div>

            {router === "/" ?
                <input className="form-control col-12 .col-sm-12 col-md-3 col-lg-3 col-xl-3" type="search"
                    placeholder="Busca un producto..." aria-label="Buscar"
                    onKeyUp={(e) => setSearchProduct(e.target.value)}
                />
                : ""}


        </nav>
    )
}

