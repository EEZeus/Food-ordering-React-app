import { useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
const Cart = (props) => {
    const cartCtx = useContext(CartContext);

  const cartAddHanlder = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  let cartHasItem = cartCtx.items.length !== 0;
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartAddHanlder.bind(null,item)}
          onRemove={cartRemoveHandler.bind(null,item.id)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClick={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {cartHasItem && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
