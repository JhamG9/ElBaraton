import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function FilterByModal(props) {
    const { setOrderFilter } = props;
    const { showModalFilterBy, setShowModalFilterBy } = props;
    const [available, setAvailable] = useState(null);
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);

    const ordenarProductos = (value, colum) => {
        let order = { price: null, available: null, quantity: null };


        if (colum === 'quantity') {
            order.quantity = value;
        } else if (colum === 'price') {
            order.price = value;
        } else if (colum === 'available') {
            order.available = value;
        }
        setOrderFilter(order);
        setShowModalFilterBy(false);
    }

    return (
        <Modal show={showModalFilterBy} onHide={() => setShowModalFilterBy(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Filtrar por: </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div class="form-group">
                        <label>Disponibilidad</label>
                        <select class="form-control" id="diponibilidad" onChange={(e) => { ordenarProductos(e.target.value, 'available') }} >
                            <option value="null">[SELECCIONA]</option>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Rango de precios</label>
                        <select class="form-control" id="precio" onChange={(e) => { ordenarProductos(e.target.value, 'price') }}>
                            <option value="null">[SELECCIONA]</option>
                            <option value="0-5000">$0 a $5,000</option>
                            <option value="5001-10000">$5,001 a $10,000</option>
                            <option value="10001-20000">$10,001 a $20,000</option>
                            <option value="20000-">$20,001 a mas</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Cantidad en stock</label>
                        <select class="form-control" id="cantidad" onChange={(e) => ordenarProductos(e.target.value, 'quantity') }>
                            <option value="null">[SELECCIONA]</option>
                            <option value="0-200">0 a 200</option>
                            <option value="201-400">201 a 400</option>
                            <option value="401-600">401 a 600</option>
                            <option value="601-800">601 a 800</option>
                            <option value="801-1000">801 a 1000</option>
                            <option value="1000-">Mas de 1001</option>
                        </select>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModalFilterBy(false)}>Cancelar</Button>
            </Modal.Footer>
        </Modal>

    )
}