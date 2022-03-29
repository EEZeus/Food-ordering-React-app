import React,{ useContext, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit,setDidSubmit] = useState(false)
  const [isCheckout, setIsCheckout] = useState(false);
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const orderHandler = (event) => { 
    setIsCheckout(true);
  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartActions = !isCheckout &&
    <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
    </div>
  const submitOrderHandler = async (userData) => { 
    setIsSubmitting(true)
    await fetch("https://react-app-b6b2b-default-rtdb.firebaseio.com/order.json", {
      method: 'POST',
      body: JSON.stringify({
        userData,
        orderItems:cartCtx.items
      })
    });
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clear();
  }
  const modalContent = <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {cartActions}
    </React.Fragment>
      
  const isCheckoutSubmitting = <p>Cart is Submiting ...</p>;
  const didCheckoutSubmit = <p>Successfully sent the order .</p>
  
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && !didSubmit && isCheckoutSubmitting}
      {!isSubmitting && didSubmit && didCheckoutSubmit}
      {!isSubmitting && didSubmit && 
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      }
    </Modal>
  );
};

export default Cart;
