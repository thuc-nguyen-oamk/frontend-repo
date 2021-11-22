import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import styles from '../css/ModalClickBuy.module.css';
import cx from 'classnames';
import axios from 'axios';

export default function ModalClickBuy(props) {
  const [quantity, setQuantity] = useState(1)
  function onDown() {
    let newQuantity =  quantity >=1 ? quantity - 1 : quantity
    setQuantity(newQuantity)
  }
  function onUp() {
    let newQuantity =  quantity + 1
    setQuantity(newQuantity)
  }
  return (
    <div>
      <div>
        <button onClick={() => {props.handleModalOpen(false)}} className={ cx(styles.button, styles.close)}>X</button>
      </div>
      <div className={ styles.item }>
        <div className={ styles.col1 }>
          {/*  */}
          <img alt="true" src={`/images/${props.item.product_image}`} />
        </div>
        <div className={ styles.col2 }>
          <div className={ styles.name }><b>{ props.item.product_name }</b></div>
        </div>
        <div className={ styles.col3 }>
          <div className={ styles.gray }>Price</div>
          <div className={ styles.red }><span>{ '$ ' + props.item.product_cost }</span></div>
        </div>
        <div className={ styles.col4 }>
          <div className={ styles.gray }>Quantity</div>
          <div className={ styles.minusplus }>
            {/* <FaMinus className={ styles.fas } onClick={ onDown }/> */}
            {/* <FaMinus className={ [styles.fas, styles.faMinus] } onClick={ onDown }/> */}
            <FaMinus className={ cx(styles.fas, styles.faMinus) } onClick={ onDown }/>
            <span>{ quantity }</span>
            {/* <FaPlus className={ styles.fas } onClick={ onUp }/> */}
            <FaPlus className={ cx(styles.fas, styles.faPlus) } onClick={ onUp }/>
          </div>
        </div>
        <div className={ styles.col5 }>
          <div className={ styles.gray }>Subtotal</div>
          <div><span>€</span><span>{ quantity*props.item.product_cost }</span></div>
        </div>
      </div>
      <form onSubmit={() => console.log('form')}>
        <div style={{ display: 'none' }}>
        {/* <div> */}
          <input type="text" name="idproduct" value={ props.item.idproducts } />
          <input type="text" name="product_amount" value={ quantity } />
        </div>
        <button onClick={() => console.log('clicked') } className={styles.button}>Add to cart</button>
      </form>
    </div>
  )
}