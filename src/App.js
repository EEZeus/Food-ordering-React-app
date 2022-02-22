import React, { useState } from 'react'

import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'

function App() {
  const [CartIsShown, setCartIsShown] = useState(false);
  
  const showCartHandler = () => { 
    setCartIsShown(true);
  }
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  
  return (
    <CartProvider>
      {CartIsShown && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
