import React, { useEffect, useState } from 'react';
import products from '../data/products.json';
import '../css/screens/Products.css';
import FilterByModal from '../components/products/FilterByModal';
import OrderByModal from '../components/products/OrderByModal';

export default function Products(props) {
    const { subcategoriaSeleccionada, setShowModal, setActionModal, setProduct, setSearchProduct, searchProduct } = props;
    const [productosList, setProductosList] = useState([]);
    const [showModalFilterBy, setShowModalFilterBy] = useState(false);
    const [showModalOrderBy, setShowModalOrderBy] = useState(false);

    const [orderFilter, setOrderFilter] = useState({ price: null, available: null, quantity: null });
    const [orderBy, setOrderBy] = useState({ price: null, available: null, quantity: null });

    const _ = require('underscore');

    // Se coloca una variable la cual estara pendiente para cuando cambie
    //esta recargue y retorne los productos dependiendo de las condiciones
    useEffect(() => {
        let productosArray = [];
        if (subcategoriaSeleccionada) {
            products.products.forEach((p) => {
                if (p.sublevel_id === subcategoriaSeleccionada.id) {
                    productosArray.push(p);
                }
            });
            setProductosList(productosArray);
        }
    }, [subcategoriaSeleccionada]);



    //Se ingresan las peluquerias al listado de peluquerias inicial
    useEffect(() => {
        setProductosList(products.products);
    }, []);


    //Buscar por peluquerias 
    useEffect(() =>{
        // console.log(searchProduct);

        var results = getResult('name', searchProduct);
        setProductosList(results);
    },[searchProduct]);


    const getResult = (keyToFilter, valueStartsWith) => {
        return _.filter(products.products, function(d){ return d[keyToFilter].startsWith(valueStartsWith); })
    }

    //Se ejecuta al cambiar el filtro Filtrar por:
    useEffect(() => {
        let productsArray = [];
        if (orderFilter.available !== null || orderFilter.price !== null || orderFilter.quantity !== null) {
            products.products.forEach((p) => {
                if (orderFilter.price !== null) {
                    p.price = p.price.replace('$', '');
                    p.price = p.price.replace(',', '');
                    //Validamos el rango de precios
                    if (orderFilter.price !== null) {
                        var arrayRangePrice = orderFilter.price.split("-");
                        if (parseInt(arrayRangePrice[1])) {
                            if (parseInt(p.price) <= parseInt(arrayRangePrice[1]) && parseInt(p.price) >= parseInt(arrayRangePrice[0])) {
                                productsArray.push(p);
                            }
                        } else {
                            if (parseInt(p.price) >= parseInt(arrayRangePrice[0])) {
                                productsArray.push(p);
                            }
                        }
                    }
                }
                if (orderFilter.available !== null) {
                    if (orderFilter.available === 'true') {
                        if (p.available === true) {
                            productsArray.push(p);
                        }
                    } else {
                        if (p.available === false) {
                            productsArray.push(p);
                        }
                    }
                }
                if (orderFilter.quantity !== null) {
                    var arrayRangeQuantity = orderFilter.quantity.split("-");
                    if (parseInt(arrayRangeQuantity[1])) {
                        if (parseInt(p.quantity) <= parseInt(arrayRangeQuantity[1]) && parseInt(p.quantity) >= parseInt(arrayRangeQuantity[0])) {
                            productsArray.push(p);
                        }
                    } else {
                        if (parseInt(p.price) >= parseInt(arrayRangeQuantity[0])) {
                            productsArray.push(p);
                        }
                    }

                }
            });
            setProductosList(productsArray);
        }
    }, [orderFilter]);

    //Se actualiza al cambiar los parametros para listar productos 
    //Asc menor a mayor
    useEffect(() => {
        products.products.forEach((p) => {
            var priceInt = p.price.replace('$', '');
            priceInt = priceInt.replace(',', '');
            p.priceInt = priceInt;
        });

        if (orderBy.price !== null) {
            var productsSorted = _.sortBy(products.products, (i) => { return parseInt(i.priceInt) });
            if (orderBy.price === 'desc') {
                productsSorted = productsSorted.reverse();
            }
            setProductosList(productsSorted);
        }

        if (orderBy.available !== null) {
            var producstOrderAvailable = [];
            if (orderBy.available === 'true') {
                producstOrderAvailable = _.where(products.products, { available: true });
            } else if (orderBy.available === 'false') {
                producstOrderAvailable = _.where(products.products, { available: false });
            } else {
                producstOrderAvailable = products.products;
            }
            setProductosList(producstOrderAvailable);
        }

        if(orderBy.quantity !== null){
            var productsOrderQuantity = _.sortBy(products.products, (i) => { return parseInt(i.quantity) });
            if (orderBy.quantity === 'desc') {
                productsSorted = productsOrderQuantity.reverse();
            }
            setProductosList(productsOrderQuantity)
        }
    }, [orderBy]);


    const selectProduct = async (product, action) => {
        setActionModal(action);
        setShowModal(true);
        setProduct(product);
    }


    return (
        <div>
            <button type="button" style={{backgroundColor: '#FFB575'}} class="btn  m-2" onClick={() => setShowModalFilterBy(true)}>Filtrar por: </button>
            <button type="button" style={{backgroundColor: '#FFB575'}} class="btn  m-2" onClick={() => setShowModalOrderBy(true)}>Ordenar por: </button>
            {subcategoriaSeleccionada ?
                <p>{subcategoriaSeleccionada.id} / {subcategoriaSeleccionada.name}</p>
                : ""}
            <div className="row">
                {productosList.map((p) =>
                    <div key={p.id} className="col-12 col-sm-6 col-md-4 col-md-4 col-lg-3 col-xl-3" style={{ marginTop: 15 }} onClick={() => selectProduct(p, 'create')}>
                        <div className="card">
                            <img className="card-img-top" src="https://asabperu.com/wp-content/uploads/2018/09/no-disponible.png" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.price}</p>
                                <p className="card-text"><b>Cantidad: </b>{p.quantity}</p>
                                <p className="card-text"><b>Disponible: </b>{p.available ? "Si" : "No"}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <FilterByModal setOrderFilter={setOrderFilter} showModalFilterBy={showModalFilterBy} setShowModalFilterBy={setShowModalFilterBy} />
            <OrderByModal showModalOrderBy={showModalOrderBy} setShowModalOrderBy={setShowModalOrderBy} setOrderBy={setOrderBy} />
        </div>
    )
}