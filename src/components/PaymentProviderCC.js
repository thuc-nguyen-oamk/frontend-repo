import React from 'react'
import styles from './../css/PaymentView/PaymentProviderCC.module.css'

const PaymentProviderCC = (props) => {
  return (
    <div className={styles.ExpandedView}>
      <div>
        {props.name}
      </div>
      <div>
        Insert card number here
      </div>
      <form>
        <input type="text" defaultValue="XXXXXXXXXXXXX" />
      </form>
      <div className={styles.SmallInfo}>
        <div className={styles.CVV}>
          <div>
            CVV
          </div>
          <form>
            <input type="text" />
          </form>
        </div>
        <div className={styles.ExpirationDate}>
          <div>
            Expiration date (MM/YY)
          </div>
          <form>
            <input type="text" />
          </form>
        </div>
      </div>
      <div>
        {/* <Link to="/customers/orders" > */}
          <button className={styles.ConfirmButton} onClick={() => props.AddOrder()} >
            <span className={styles.ConfirmLink}>Confirm payment</span>
          </button>
        {/* </Link> */}
      </div>
    </div>
  )
}

export default PaymentProviderCC
