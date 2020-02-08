import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function AddEditProductModal(props) {
    const { showModal, setShowModal, actionModal, product, setUpdateListCar } = props;
    const [quantityProduct, setQuanityProduct] = useState(1);
    const MySwal = withReactContent(Swal);

    useEffect(() => {

        if (actionModal === 'update') {
            setQuanityProduct(product.quantityBuy);
        } else {
            setQuanityProduct(1);
        }
    }, [actionModal]);

    //Tomamos los datos necesarios para agregarlo al carrito
    const addProduct = async () => {
        if(parseInt(quantityProduct) <= 0 || quantityProduct === ''){
            return;
        }
        var data = { product: product, quantity: parseInt(quantityProduct) };
        //Formato para agregar un producto al array
        // [{product: {producto}, quantity: 12}]
        if (quantityProduct > product.quantity) {
            MySwal.fire({
                title: '¡Alerta!',
                icon: 'warning',
                text: 'Lo sentimos no tenemos dicha cantidad de productos, tenemos ' + product.quantity + ' disponibles',
                confirmButtonText: 'Aceptar'
            });
        } else {
            let message = 'Producto agregado satisfactoriamente';
            let storageProducts = localStorage.getItem('products');
            if (storageProducts) {
                let productsArray = JSON.parse(storageProducts);
                let positionProduct = await issetProductInArray(productsArray, product);
                if (Number.isInteger(positionProduct)) {
                    if (actionModal === 'update') {
                        message = 'Producto actualizado satisfactoriamente'
                        productsArray[positionProduct].quantity = parseInt(quantityProduct);
                    } else {
                        productsArray[positionProduct].quantity = (parseInt(productsArray[positionProduct].quantity) + parseInt(quantityProduct));

                    }
                } else {
                    productsArray.push(data);
                }
                localStorage.setItem('products', JSON.stringify(productsArray));
                setUpdateListCar(true);

                MySwal.fire({
                    title: 'Producto',
                    icon: 'success',
                    text: message,
                    confirmButtonText: 'Aceptar'
                });
                setShowModal(false);

            } else {
                localStorage.setItem('products', JSON.stringify([data]));
                MySwal.fire({
                    title: 'Producto',
                    icon: 'success',
                    text: 'Producto agregado satisfactoriamente',
                    confirmButtonText: 'Aceptar'
                });
                setShowModal(false);

            }
            setQuanityProduct(1);
        }
    }

    const issetProductInArray = (array, product) => {
        let productFound = false;
        let pos = 0;
        array.forEach((p, indice) => {
            if (p.product.id === product.id) {
                productFound = true;
                pos = indice;
            }
        });
        return productFound ? pos : false;


    }
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                {actionModal === 'create' ? <Modal.Title>Agrega a tu Carrito</Modal.Title> : ''}
                {actionModal === 'update' ? <Modal.Title>Actuailza tu producto</Modal.Title> : ''}
            </Modal.Header>
            <Modal.Body>

                {product ?
                    <div className="row">
                        <div class="col-sm" style={{ margin: 10 }}>
                            <img src="https://asabperu.com/wp-content/uploads/2018/09/no-disponible.png" style={{ width: '100%' }} />
                        </div>

                        <div class="col-sm m-1" >
                            <p><b>Producto:</b> {product.name} </p>
                            <p><b>Precio:</b> {product.price} </p>
                            <p><b>Disponible:</b> {product.available ? "si" : "no"} </p>
                            {product.available ?
                                <p><b>Cantidad:</b> {product.quantity}</p>
                                : ""}
                            <div className="row">
                                {product.available ?
                                    <div>
                                        <div className="col-12 mb-2">
                                            <input type="number" className="form-control"
                                                defaultValue={actionModal === 'update' ? product.quantityBuy : quantityProduct}
                                                placeholder="¿Cuantos deseas comprar?"
                                                onKeyUp={(e) => setQuanityProduct(e.target.value)} />
                                        </div>

                                        <div className="col-12">
                                            {actionModal === 'create' ? <button style={{backgroundColor: '#75c737', fontWeight: 600, color: '#ffffff'}} type="button" onClick={addProduct} className="btn btn-block">Agregar</button> : ""}
                                            {actionModal === 'update' ? <button type="button" onClick={addProduct} className="btn btn-block">Actualizar</button> : ""}
                                        </div>
                                    </div>
                                    : ""}

                            </div>
                        </div>
                    </div>
                    : ""}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancelar
          </Button>

            </Modal.Footer>
        </Modal>
    )
}