import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export default function MyCar(props) {
    const { setActionModal, setProduct, setShowModal, updateListCar, setUpdateListCar, router } = props;
    const [listProductsCar, setListProductsCar] = useState([]);
    const MySwal = withReactContent(Swal);


    useEffect(() => {
        if (router !== '/carrito') {
            window.location.replace('/');
        }

        if (localStorage.getItem('products') === null) {
            setListProductsCar([]);
        } else {

                console.log(localStorage.getItem('products'));
            let productArray = JSON.parse(localStorage.getItem('products'));
            console.log("Storage",productArray);
            setListProductsCar(productArray);
        }


        console.log("Actulizando carro");
    }, [updateListCar]);

    const updateProduct = (product) => {
        setActionModal('update');
        product.product.quantityBuy = product.quantity;
        setProduct(product.product);
        setShowModal(true);
    }

    const deleteProduct = (indice, product) => {

        MySwal.fire({
            title: '¿Estás seguro(a) de eliminar el producto ' + product.product.name + "?",
            icon: 'question',
            text: 'Una vez eliminado el producto, esta acción no se puede deshacer',
            confirmButtonText: 'Eliminar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                listProductsCar.splice(indice, 1);
                localStorage.setItem('products', JSON.stringify(listProductsCar));
                setUpdateListCar(true);
                MySwal.fire({
                    title: 'Producto eliminado satisfactoriamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

            }
        });
    }

    return (
        <div className="row">
            {listProductsCar.map((p, indice) =>
                <div key={p.id + "prodCar"} className="col-2 col-sm-4 col-md-4 col-md-4 col-lg-4 col-xl-4" style={{ margin: 10 }}>
                    <div className="card">
                        <img className="card-img-top" src="https://asabperu.com/wp-content/uploads/2018/09/no-disponible.png" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{p.product.name}</h5>
                            <p className="card-text"><b>Precio: </b>{p.product.price}</p>
                            <p className="card-text"><b>Cantidad: </b>{p.quantity}</p>

                            <div className="row">
                                <div className="col-sm">
                                    <button type="button" onClick={() => updateProduct(p)} className="btn btn-outline-primary btn-block mb-3">Actualizar</button>
                                </div>
                                <div className="col-sm">
                                    <button type="button" onClick={() => deleteProduct(indice, p)} className="btn btn-outline-danger btn-block mb-3">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}

        </div>
    )
}