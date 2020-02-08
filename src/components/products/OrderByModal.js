import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function OrderByModal(props) {
    const { showModalOrderBy, setShowModalOrderBy, setOrderBy } = props;

    const ordenarProductos = (value, column) => {
        let order = { price: null, available: null, quantity: null };

        if (column === 'quantity') {
            order.quantity = value;
        } else if (column === 'price') {
            order.price = value;
        } else if (column === 'available') {
            order.available = value;
        }
        // console.log(order);
        setOrderBy(order);
        setShowModalOrderBy(false);


     }
    return (
        <Modal show={showModalOrderBy} onHide={() => setShowModalOrderBy(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Ordenar por: </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div class="form-group">
                        <label>Precio</label>
                        <select class="form-control" id="diponibilidad" onChange={(e) => { ordenarProductos(e.target.value, 'price') }} >
                            <option value="null">[SELECCIONA]</option>
                            <option value="asc">Asccendente</option>
                            <option value="desc">Descendente</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Disponibilidad</label>
                        <select class="form-control" id="precio" onChange={(e) => { ordenarProductos(e.target.value, 'available') }}>
                            <option value="null">[SELECCIONA]</option>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Cantidad en stock</label>
                        <select class="form-control" id="cantidad" onChange={(e) => ordenarProductos(e.target.value, 'quantity')}>
                            <option value="null">[SELECCIONA]</option>
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>
                        </select>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModalOrderBy(false)}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    )
}