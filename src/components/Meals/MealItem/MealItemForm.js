import {useRef, useState} from 'react'

import Input from '../../UI/Input'
import styles from './MealItemForm.module.css'

const MealItemForm = (props) => {
   const [inputIsValid,setInputIsValid] = useState(true);
   const inputRef = useRef();
   
   const submitHandler = (event) => { 
      event.preventDefault();
      const inputAmount = inputRef.current.value;
      const inputAmountNumber = +inputAmount;
      
      if (inputAmount.trim().length === 0 || inputAmountNumber<1 || inputAmountNumber>5) { 
         setInputIsValid(false);
         return;
      }
      props.onAddToCart(inputAmountNumber);
   }
   
   return <form className={styles.form} onSubmit={submitHandler}>
      <Input ref={inputRef} label='Amount' input={{
         id: 'amount',
         type: 'number',
         min: '1',
         max: '5',
         step: '1',
         defaultValue:'1'
      }
      }/>
      <button className={styles.button}>+ Add</button>
      {!inputIsValid && <p>input is not valid !</p>}
   </form>
 };
export default MealItemForm;