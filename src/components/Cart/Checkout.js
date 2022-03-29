import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [validity, setValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const formIsValid =
    validity.name && validity.street && validity.postal && validity.city;

  const confirmHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const postal = postalInputRef.current.value;
    const city = cityInputRef.current.value;

    const nameIsValid = name.trim().length !== 0;
    const streetIsValid = street.trim().length !== 0;
    const postalIsValid = postal.trim().length >= 5;
    const cityIsValid = city.trim().length !== 0;

    setValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name,
      street,
      postal,
      city
    });
  };
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const nameStyles = `${classes.control} ${
    validity.name ? "" : classes.invalid
  }`;
  const streetStyles = `${classes.control} ${
    validity.street ? "" : classes.invalid
  }`;
  const postalStyles = `${classes.control} ${
    validity.postal ? "" : classes.invalid
  }`;
  const cityStyles = `${classes.control} ${
    validity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameStyles}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!validity.name && <p>Enter a valid name !</p>}
      </div>
      <div className={streetStyles}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!validity.street && <p>Enter a valid street !</p>}
      </div>
      <div className={postalStyles}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!validity.postal && <p>Enter a valid postal !</p>}
      </div>
      <div className={cityStyles}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!validity.city && <p>Enter a valid city !</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
