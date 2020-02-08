import React, { useState } from 'react';
import Header from './layout/Header';
import Products from './screens/Products';
import MyCar from './screens/MyCar';

import AddEditProductModal from './components/products/AddEditProductModal';
import { Route, BrowserRouter, Switch } from "react-router-dom";


import './App.css';
export default function App() {
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionModal, setActionModal] = useState(null);
  const [product, setProduct] = useState(null);
  const [updateListCar, setUpdateListCar] = useState(false);

  const [searchProduct, setSearchProduct] = useState('');

  const [router, setRouter] = useState('/');

  return (

    <div>
      <BrowserRouter>
        <Header setUpdateListCar={setUpdateListCar} setRouter={setRouter} router={router} setSearchProduct={setSearchProduct} setSubcategoriaSeleccionada={setSubcategoriaSeleccionada} />

        <div className='container'>
          <Switch>
            <Route exact path="/" >

              <Products subcategoriaSeleccionada={subcategoriaSeleccionada}
                setShowModal={setShowModal}
                setActionModal={setActionModal}
                setProduct={setProduct}
                setSearchProduct={setSearchProduct}
                searchProduct={searchProduct}
                />
            </Route>

            <Route exact path="/carrito">
              <MyCar setActionModal={setActionModal} 
              router={router} setUpdateListCar={setUpdateListCar} 
              updateListCar={updateListCar} setProduct={setProduct} setShowModal={setShowModal} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
      <AddEditProductModal showModal={showModal}
        setShowModal={setShowModal}
        actionModal={actionModal}
        product={product}
        setUpdateListCar={setUpdateListCar} />

    </div>

  );
}