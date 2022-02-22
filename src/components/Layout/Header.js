import React, { Fragment } from 'react'

import HeaderButton from './HeaderCartButton'
import MealsPic from "../../assets/meals.jpg"
import Styles from "./Header.module.css"

const Header = props => { 
   return <Fragment>
      <header className={Styles.header}>
         <h1>ReactMeals</h1>
         <HeaderButton onClick={props.onShowCart}/>
      </header>
      <div className={Styles['main-image']}>
         <img src={MealsPic} alt ='a table full of delicious food'/>
      </div>
   </Fragment>
}

export default Header;